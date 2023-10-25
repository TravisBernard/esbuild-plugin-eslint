import type { PluginOptions } from "./types/plugin-options.js";
import type { Plugin } from "esbuild";
declare const _default: ({ filter, throwOnWarning, throwOnError, ...eslintOptions }?: PluginOptions) => Plugin;
export default _default;
