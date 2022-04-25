import LS from '../loader/localstorage-loader';
import SPA from '../utils/spa';
import SPAOptions from '../data/spa';

class App {
  lsi: LS = new LS();
  spa: SPA = new SPA(SPAOptions);
  start(): void {
    this.spa.init();
  }
}

export default App;
