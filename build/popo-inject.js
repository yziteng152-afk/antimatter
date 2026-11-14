/*
 * 把 popo 云存档桥接进构建产物。
 *
 * Vue CLI 默认会在 dist/index.html 里直接插入游戏脚本。云存档桥必须在游戏读取存档之前
 * 先完成云端拉取，所以这里做三件事：
 *   1. 把 Vue CLI 插入的游戏 <script src> 从 HTML 里摘掉，按原顺序记进
 *      window.__POPO_SYNC_CONFIG__.scripts；
 *   2. 插入 <script defer src="popo-sync.js?v=<hash>">，由它拉完云存档后再动态加载游戏；
 *   3. dev 构建标记为 dev，桥会跳过同步（dev 用 dimensionTestSave，key 不一致）。
 *
 * 构建命令：npm run build:popo
 */
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const distDir = path.resolve(__dirname, "../dist");
const indexPath = path.join(distDir, "index.html");
const bridgePath = path.join(distDir, "popo-sync.js");

if (!fs.existsSync(indexPath)) {
  throw new Error("dist/index.html not found; run the webpack build first");
}
if (!fs.existsSync(bridgePath)) {
  throw new Error("dist/popo-sync.js not found; public/popo-sync.js should have been copied by the build");
}

let html = fs.readFileSync(indexPath, "utf8");

if (html.includes("popo-sync.js")) {
  console.log("popo-sync: already injected, skipping");
  process.exit(0);
}

// Vue CLI 注入的游戏脚本，保持原顺序（chunk-vendors 在 app 之前）
const scriptTags = [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*>\s*<\/script>/gu)]
  .filter(match => !match[1].startsWith("popo-sync.js"));
const scripts = scriptTags.map(match => match[1]);

if (scripts.length === 0) {
  throw new Error("no game script tags found in dist/index.html; refusing to inject the cloud-save bridge");
}

// 脚本标签本身去掉，连同对应的 preload / prefetch 提示一起清掉
for (const match of scriptTags) {
  html = html.replace(match[0], "");
  const src = match[1].replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
  html = html.replace(
    new RegExp(`<link\\b[^>]*\\brel="(?:preload|prefetch|modulepreload)"[^>]*\\bhref="${src}"[^>]*>`, "gu"),
    ""
  );
}

const config = {
  dev: process.env.VUE_APP_DEV === "true",
  scripts,
};
const configJson = JSON.stringify(config).replace(/</gu, "\\u003c");
const version = crypto.createHash("sha1").update(scripts.join("|")).digest("hex").slice(0, 8);
const injection = [
  `<script>window.__POPO_SYNC_CONFIG__ = ${configJson};</script>`,
  `<script defer src="popo-sync.js?v=${version}"></script>`,
].join("\n  ");

if (!html.includes("</head>")) {
  throw new Error("dist/index.html has no </head>; cannot inject the cloud-save bridge");
}
html = html.replace("</head>", `  ${injection}\n</head>`);

fs.writeFileSync(indexPath, html);
console.log(`popo-sync: injected (${scripts.length} game script(s), dev=${config.dev})`);
