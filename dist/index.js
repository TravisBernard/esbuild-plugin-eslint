"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eslint_1 = require("eslint");
exports.default = ({ filter = /\.(?:jsx?|tsx?|vue|svelte)$/, throwOnWarning = false, throwOnError = false, ...eslintOptions } = {}) => ({
    name: "eslint",
    setup: ({ onLoad, onEnd }) => {
        const eslint = new eslint_1.ESLint(eslintOptions);
        const filesToLint = [];
        onLoad({ filter }, ({ path }) => {
            if (!path.includes("node_modules")) {
                filesToLint.push(path);
            }
            return null;
        });
        onEnd(async () => {
            const results = await eslint.lintFiles(filesToLint);
            const formatter = await eslint.loadFormatter("stylish");
            const output = await formatter.format(results);
            const warnings = results.reduce((count, result) => count + result.warningCount, 0);
            const errors = results.reduce((count, result) => count + result.errorCount, 0);
            if (eslintOptions.fix) {
                await eslint_1.ESLint.outputFixes(results);
            }
            if (output.length > 0) {
                console.log(output);
            }
            return {
                ...throwOnWarning && warnings > 0 && {
                    errors: [{ text: `${warnings} warnings were found by eslint!` }]
                },
                ...throwOnError && errors > 0 && {
                    errors: [{ text: `${errors} errors were found by eslint!` }]
                }
            };
        });
    }
});
