import { app } from '../../../..';
import $, { eventCallback, EventCallbackBuilder, eventHandler } from '../../../utils/utils';
import game from '../../pages/game/game';
import mainpage from '../../pages/mainpage/mainpage';
import { updateFavCounter } from './header-controller';

class Header {
  draw(): void {
    $('.header').append(<HTMLElement>($('#__header') as HTMLTemplateElement).content.cloneNode(true));
    updateFavCounter();
  }
  postRender(): void {
    const hardReset: eventCallback = (event: Event): void => {
      event;
      if (confirm('Будут сброшены все Ваши настройки. Продолжить?')) {
        app.lsi.reset();
        updateFavCounter();
        if ($('.content').id === 'mainpage') {
          mainpage.redraw();
          mainpage.controls.redraw();
        }
        if ($('.content').id === 'game') {
          game.reDraw();
        }
      }
      $('.page').click();
    };
    const resetCallback: eventHandler = EventCallbackBuilder(hardReset);
    const resetContainer: HTMLElement = $('.header__reset');

    resetContainer.addEventListener('click', resetCallback);
  }
}

const header = new Header();

export default header;
