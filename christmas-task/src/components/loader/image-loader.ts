const path = require.context('../../assets/', true, /\.jpg|svg|png$/),
  loadImages = path.keys().map(path);

export default loadImages;
