const path = require.context('../../assets/', true, /\.jpg|svg|png|mp3$/),
  loadAssets = path.keys().map(path);

export default loadAssets;
