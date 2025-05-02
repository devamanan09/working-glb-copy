// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push(
  'glb',
  'gltf',
  'bin'  // Often needed for GLB dependencies
);
// // Disable Bridgeless mode
// config.server = {
//   ...config.server,
//   experimentalImportBundleSupport: false,
// };


module.exports = config;