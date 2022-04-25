import Mainpage from '../view/pages/mainpage/mainpage';
import loadImages from '../loader/image-loader';
import LS from '../loader/localstorage-loader';
import '../../css/nouislider.css';
import '../../css/style.css';
import { selfAssessment } from '../utils/utils';

class App {
  lsi: LS = new LS();
  mainpage: Mainpage = new Mainpage();
  start(): void {
    loadImages;
    this.mainpage.draw();
    this.mainpage.postRender();
    globalThis.addEventListener('beforeunload', this.lsi.save);
    selfAssessment();
  }
}

export default App;
