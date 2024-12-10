module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  // plugins: ['react-refresh', 'project-structure'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    // 'project-structure/file-structure': 'error',
    'react-hooks/exhaustive-deps': 'off',
  },
  settings: {
    'project-structure/config-path': '.projectStructurerc',
  },
};
