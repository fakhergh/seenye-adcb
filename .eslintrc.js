module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['prettier', 'simple-import-sort', '@tanstack/query'],
  ignorePatterns: [
    'node_modules/*',
    'android',
    'ios',
    '**/package.json',
    '.history/*',
    '.vscode/*',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react/no-unstable-nested-components': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    '@tanstack/query/exhaustive-deps': 'error',
  },
};
