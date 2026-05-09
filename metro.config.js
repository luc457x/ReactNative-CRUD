const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Permite a resolução de arquivos .wasm como assets, 
// o que é necessário para o expo-sqlite funcionar na Web.
config.resolver.assetExts.push('wasm');

module.exports = config;
