module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: false,
      },
    ],
    [
      'babel-plugin-rewrite-require',
      {
        aliases: {
          stream: 'readable-stream',
        },
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
        imageScale: ['@2x', '@3x'],
        imageTypes: ['.png', '.jpg'],
        alias: {
          '@root': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@services': './src/services',
          '@store': './src/store',
          '@util': './src/util',
          '@config': './src/config',
          '@assets': './src/assets',
          '@images': './src/assets/images',
          '@icons': './src/assets/icons',
        },
      },
    ],
  ],
};
