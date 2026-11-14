/* eslint-disable max-len */
// 天界台词译文汇总（按天界分文件，避免并行冲突）。
import { zhQuotes1 } from "./i18n-zh-quotes-1";
import { zhQuotes2 } from "./i18n-zh-quotes-2";
import { zhQuotes3 } from "./i18n-zh-quotes-3";
import { zhQuotes4 } from "./i18n-zh-quotes-4";

export const zhQuotes = {
  ...zhQuotes1,
  ...zhQuotes2,
  ...zhQuotes3,
  ...zhQuotes4,
};
