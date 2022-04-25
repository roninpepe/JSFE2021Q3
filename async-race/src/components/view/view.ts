import './style.css';
import Listeners from './controls/listeners';
import { selfAssessment } from '../utils/utils';

const listeners: Listeners = new Listeners();

class View {
  initPage = (): void => {
    listeners.init();
    selfAssessment();
  };
}

export default View;
