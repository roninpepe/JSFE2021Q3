import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '4d57567d6a2c4e609c86302733b8978c',
        });
    }
}

export default AppLoader;
