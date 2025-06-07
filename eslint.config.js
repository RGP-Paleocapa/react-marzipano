import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

// ESLint configuration using the new `typescript-eslint` flat config
export default tseslint.config(
  // Files/folders to ignore
  {
    ignores: ['dist'],
  },

  // Main ESLint configuration block
  {
    // Extend recommended rules from ESLint, TypeScript, and import plugins
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      'plugin:import/errors',
      'plugin:import/warnings',
    ],

    // Target all TypeScript and TSX files
    files: ['**/*.{ts,tsx}'],

    // ECMAScript version and environment globals (browser-based)
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    // ESLint plugins setup
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
    },

    // Global linting rules
    rules: {
      // Enforce correct React Hooks usage
      ...reactHooks.configs.recommended.rules,

      // Warn if components are not exported in a refresh-compatible way
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Warn when dependencies in useEffect/useCallback/etc. are missing
      'react-hooks/exhaustive-deps': ['warn'],

      // You can define additional global rules for imports or formatting here
    },

    // File-specific overrides
    overrides: [
      {
        // Only apply these rules to barrel index files in hooks and stores
        files: ['src/hooks/**/index.ts', 'src/stores/**/index.ts'],

        rules: {
          // Prevent circular dependencies through barrels (depth = 1)
          'import/no-cycle': ['error', { maxDepth: 1 }],

          // Disallow importing deeply from inside barrel-exported modules
          'import/no-internal-modules': [
            'error',
            {
              // Forbid importing sub-paths inside hooks/stores (only allow direct index.ts)
              forbid: ['src/hooks/*/*', 'src/stores/*/*'],
            },
          ],
        },
      },
    ],
  }
);
