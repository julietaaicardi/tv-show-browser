/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/multi-word-component-names': 'warn',
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'vue/no-unused-components': 'warn',
    'vue/no-unused-vars': 'warn',
    'vue/valid-template-root': 'error',
    'vue/valid-v-for': 'error',
    'vue/require-v-for-key': 'error',
    'vue/no-unused-properties': ['warn', {
      groups: ['props', 'data', 'computed', 'methods']
    }]
  }
} 