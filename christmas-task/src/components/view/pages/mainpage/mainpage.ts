import { app } from '../../../..';
import toys from '../../../data/toys';
import $, { eventCallback, EventCallbackBuilder, eventHandler } from '../../../utils/utils';
import MainpageControls from './controls/mainpage-controls';
import { updateFavCounter } from './mainpage-controller';
import MainpageToys from './toys/toys';

class Mainpage {
  toys: MainpageToys = new MainpageToys();
  controls: MainpageControls = new MainpageControls();
  draw(): void {
    this.toys.draw(toys);
    this.controls.draw();
  }
  postRender(): void {
    this.toys.postRender();
    this.controls.postRender();
    updateFavCounter();

    const hardReset: eventCallback = (event: Event): void => {
      event;
      if (confirm('Будут сброшены все Ваши настройки. Продолжить?')) {
        app.lsi.reset();
        this.redraw();
        this.controls.redraw();
        updateFavCounter();
      }
    };
    const resetCallback: eventHandler = EventCallbackBuilder(hardReset);
    const resetContainer: HTMLElement = $('.header__reset');

    resetContainer.addEventListener('click', resetCallback);
  }
  redraw(): void {
    this.toys.draw(toys);
  }
}

export default Mainpage;
