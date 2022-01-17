const config = {
  screens: {
    Splash: {
      path: 'acessodireto',
    },
    // eslint-disable-next-line no-dupe-keys
    Splash: {
      path: 'redirecionar/:token/:path',
    },
    // eslint-disable-next-line no-dupe-keys
    Splash: {
      path: 'redefinicao-senha/:token_user',
    },
  },
};

const linking = {
  prefixes: [
    'conexa://',
    'https://*.conexasaude.com.br',
    'https://*.docpass.com.br',
  ],
  config,
};

export default linking;
