import $ from '../../../utils/utils';

class Footer {
  draw(): void {
    $('.footer').append(<HTMLElement>($('#__footer') as HTMLTemplateElement).content.cloneNode(true));
  }
}

const footer = new Footer();

export default footer;
