module.exports = {
  env: {
    es2020: true,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prettier/react',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'react-hooks'],
  rules: {
    'import/extensions': 'off',
    'react/prop-types': 0,
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
      },
    ],
    'import/prefer-default-export': 'off',
    'react/destructuring-assignment': 'off',
    'no-use-before-define': 'off',
    'react/state-in-constructor': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-console': ['error', { allow: ['warn', 'error', 'tron'] }],
    'global-require': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-nested-ternary': 'off',
    'prefer-const': 'off',
    'import/order': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
  },
  globals: {
    _DEV_: true,
  },
};
