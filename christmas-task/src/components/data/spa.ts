import { SPAOptions } from '../utils/spa';

const SPAOptions: SPAOptions = {
  content: {
    static: {
      path: 'view/components/',
      templates: ['global-controller', 'header', 'footer'],
    },
    pages: {
      index: {},
      mainpage: {},
      game: {},
    },
  },
  router: {
    path: '../view/pages',
    routes: ['index', 'mainpage', 'game'],
  },
};

export default SPAOptions;
