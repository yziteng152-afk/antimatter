/*
 * Antimatter Dimensions × popo 云存档桥
 *
 * 线上原版（2026-11 第 7 版）里的实现，这里补了两处：
 *  - 游戏 JS 的文件名不再写死，由 build/popo-inject.js 在构建后把真实文件名写进
 *    window.__POPO_SYNC_CONFIG__，避免每次构建换哈希后还要手改。
 *  - dev 构建（localStorage key 是 dimensionTestSave）直接跳过同步，避免把测试档
 *    推到线上账号里。
 *
 * 流程: 页面加载 → 等 PopSDK → 本地/云端存档比较 lastUpdate，用较新的一份 →
 *       放行游戏 → 每 2 分钟 / 关页时推送本地存档 → 游戏原生 offlineProgress 补算离线进度
 */
(() => {
  const cfg = window.__POPO_SYNC_CONFIG__ || {};
  const GAME_SCRIPTS = Array.isArray(cfg.scripts) ? cfg.scripts : [];
  const DEV_BUILD = Boolean(cfg.dev);

  const LS_KEY = "dimensionSave";
  const CLOUD_OBJ = "game_save";
  const RECORD_LIMIT = 900000;
  const PUSH_INTERVAL_MS = 2 * 60 * 1000;

  const state = {
    sdk: null,
    username: "",
    recordId: null,
    lastPushed: null,
    enabled: false,
    findBroken: false,
  };

  let tag = null;

  const say = (text, sticky) => {
    if (!tag) {
      tag = document.createElement("div");
      tag.id = "popo-sync-status";
      tag.style.cssText =
        "position:fixed;top:12px;right:12px;z-index:99999;background:rgba(20,20,40,0.85);" +
        "color:#9adcff;padding:6px 12px;border-radius:4px;font:12px/1.5 monospace;display:none;";
      document.body.appendChild(tag);
    }
    tag.textContent = text;
    tag.style.display = "block";
    if (!sticky) setTimeout(() => { tag.style.display = "none"; }, 5000);
  };

  const loadScript = src =>
    new Promise((resolve, reject) => {
      const el = document.createElement("script");
      el.src = src;
      el.onload = resolve;
      el.onerror = () => reject(new Error(`load fail: ${src}`));
      document.head.appendChild(el);
    });

  // 轮询等 PopSDK(注入顺序未知,最多等 3s)
  const waitSdk = () =>
    new Promise(resolve => {
      let n = 0;
      (function check() {
        if (window.PopSDK) return resolve(window.PopSDK);
        if (++n > 30) return resolve(null);
        setTimeout(check, 100);
      })();
    });

  // 离线补算没结束前(GameIntervals.save 未启动),本地存档还是旧会话的,不推
  const gameAutosaveAlive = () =>
    !window.GameIntervals || window.GameIntervals.save.isStarted;

  // scope=self 保证 find 只返回本人记录;无 filter 优先,失败再试 owner 字面量
  const findMine = async () => {
    const queries = [
      { page: 1, pageSize: 5 },
      state.username
        ? { filter: { jsonPath: `$.owner == "${state.username}"` }, page: 1, pageSize: 5 }
        : null,
    ].filter(Boolean);
    let lastErr = null;
    for (const q of queries) {
      try {
        const recs = await state.sdk.data.find(CLOUD_OBJ, q);
        return Array.isArray(recs) && recs.length > 0
          ? recs.reduce((a, b) => (new Date(b.updatedAt) > new Date(a.updatedAt) ? b : a))
          : null;
      } catch (e) {
        lastErr = e;
      }
    }
    throw lastErr;
  };

  // 读出存档里当前槽位的 player.lastUpdate(毫秒时间戳),用来比较本地和云端哪份更新。
  // 编码与游戏 GameSaveSerializer 一致:前缀+版本号 / 0a,0b,0c 转义 / base64 / zlib deflate / JSON;
  // 游戏脚本此时还没加载,用浏览器自带的 DecompressionStream 解 zlib。解不出来返回 null
  const SAVE_PREFIX = "AntimatterDimensionsSavefileFormat";
  const SAVE_SUFFIX = "EndOfSavefile";
  const saveTime = async text => {
    try {
      if (!text || !text.startsWith(SAVE_PREFIX) || typeof DecompressionStream === "undefined") return null;
      const version = text.slice(SAVE_PREFIX.length, SAVE_PREFIX.length + 3);
      let body = text.slice(SAVE_PREFIX.length + 3);
      if (version >= "AAB") body = body.slice(0, body.length - SAVE_SUFFIX.length);
      body = body.replace(/0b/gu, "+").replace(/0c/gu, "/").replace(/0a/gu, "0");
      const bin = atob(body);
      const bytes = Uint8Array.from(bin, ch => ch.charCodeAt(0));
      const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate"));
      const root = JSON.parse(await new Response(stream).text());
      const p = root.saves ? root.saves[root.current] : root;
      return p && typeof p.lastUpdate === "number" ? p.lastUpdate : null;
    } catch (e) {
      console.warn("[popo-sync] decode save failed", e);
      return null;
    }
  };

  // 本地没有存档 → 用云端;两边都有 → 比较 lastUpdate,用更新的那份;解不出时间就保留本地
  const pull = async () => {
    try {
      const rec = await findMine();
      state.recordId = rec ? rec.id : null;
      const cloudSave = rec && rec.data ? rec.data.save : null;
      if (!cloudSave) return true;
      const localSave = localStorage.getItem(LS_KEY);
      if (localSave === cloudSave) {
        state.lastPushed = cloudSave;
        return true;
      }
      let useCloud = !localSave;
      if (!useCloud) {
        const [localT, cloudT] = await Promise.all([saveTime(localSave), saveTime(cloudSave)]);
        useCloud = localT !== null && cloudT !== null && cloudT > localT;
      }
      if (useCloud) {
        // 被覆盖的本地存档留一份备份,出问题还能手动找回
        if (localSave) localStorage.setItem(`${LS_KEY}-popoLocalBackup`, localSave);
        localStorage.setItem(LS_KEY, cloudSave);
        state.lastPushed = cloudSave;
        say("已从云端恢复较新的存档");
      }
      return true;
    } catch (e) {
      console.warn("[popo-sync] find failed", e);
      // find 不可用时不推送,避免同一账号创建重复记录
      state.findBroken = true;
      say("云存档查询失败,暂不推送(本地存档不受影响)", true);
      return false;
    }
  };

  const push = async () => {
    if (!state.enabled || state.findBroken) return;
    saveLocalNow();
    const raw = localStorage.getItem(LS_KEY);
    if (!raw || raw === state.lastPushed || raw.length > RECORD_LIMIT) return;
    if (!gameAutosaveAlive()) return;
    try {
      if (!state.recordId) {
        const rec = await findMine();
        state.recordId = rec ? rec.id : null;
      }
      const payload = { save: raw };
      if (state.username) payload.owner = state.username;
      if (state.recordId) {
        await state.sdk.data.update(CLOUD_OBJ, state.recordId, payload);
      } else {
        const created = await state.sdk.data.create(CLOUD_OBJ, payload);
        state.recordId = created.id;
      }
      state.lastPushed = raw;
      const t = new Date();
      const hh = String(t.getHours()).padStart(2, "0");
      const mm = String(t.getMinutes()).padStart(2, "0");
      say(`☁ 存档已同步 ${hh}:${mm}`);
    } catch (e) {
      console.warn("[popo-sync] push failed", e);
      say("云存档推送失败,稍后重试(本地存档不受影响)");
    }
  };

  // 关页/切后台时立即落本地存档:游戏自身只有 30s 定时存档,没有关页存档,
  // 不补这一步的话关掉重开会丢最近进度,player.lastUpdate 也不准,离线收益算不对
  const saveLocalNow = () => {
    try {
      if (window.GameStorage && window.GameUI && window.GameUI.initialized) window.GameStorage.save(true);
    } catch (e) {
      console.warn("[popo-sync] local save failed", e);
    }
  };

  const startGame = () => {
    if (GAME_SCRIPTS.length === 0) {
      console.error("[popo-sync] no game scripts in __POPO_SYNC_CONFIG__");
      say("游戏资源清单缺失,请刷新重试", true);
      return;
    }
    GAME_SCRIPTS.reduce(
      (chain, src) => chain.then(() => loadScript(src)),
      Promise.resolve()
    ).then(() => {
      // 游戏在 window.onload 里置 GameUI.initialized 并隐藏加载层;脚本是动态插入的,
      // load 事件往往已经触发过,这里手动补调一次,否则界面不渲染
      if (document.readyState === "complete" && typeof window.onload === "function") window.onload();
      window.addEventListener("pagehide", saveLocalNow);
      window.addEventListener("beforeunload", saveLocalNow);
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") saveLocalNow();
      });
    }).catch(e => {
      console.error("[popo-sync] game scripts failed", e);
      say("游戏资源加载失败,请刷新重试", true);
    });
  };

  const boot = async () => {
    // dev 构建用的是 dimensionTestSave,和这里读写的 key 不一致,直接按纯本地游玩处理
    if (DEV_BUILD) {
      startGame();
      return;
    }
    const sdk = await waitSdk();
    if (!sdk || !sdk.data) {
      // 无平台环境(本地/外网),直接启动,纯本地游玩
      startGame();
      return;
    }
    state.sdk = sdk;
    try {
      await Promise.race([
        sdk.ready ? sdk.ready() : Promise.resolve(),
        new Promise((_, rej) => setTimeout(() => rej(new Error("sdk ready timeout")), 10000)),
      ]);
    } catch (e) {
      console.warn("[popo-sync] sdk ready timeout, continue anyway", e);
    }
    try {
      const me = await sdk.user.info();
      state.username = me.userName || "";
    } catch (e) {
      console.warn("[popo-sync] user info failed", e);
    }
    state.enabled = true;
    await pull();
    startGame();
    setInterval(push, PUSH_INTERVAL_MS);
    window.addEventListener("beforeunload", push);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") push();
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
