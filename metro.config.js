const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Permite a resolução de arquivos .wasm como assets, 
// o que é necessário para o expo-sqlite funcionar na Web.
config.resolver.assetExts.push('wasm');

// Adiciona cabeçalhos de isolamento de origem cruzada para permitir SharedArrayBuffer na Web.
// Isso é necessário para o funcionamento do expo-sqlite v16+.
config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
      res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
      return middleware(req, res, next);
    };
  },
};

module.exports = config;
