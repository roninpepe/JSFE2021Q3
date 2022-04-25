import toys from '../../../data/toys';
import $ from '../../../utils/utils';
import MainpageControls from './controls/mainpage-controls';
import MainpageToys from './toys/toys';

class Mainpage {
  toys: MainpageToys = new MainpageToys();
  controls: MainpageControls = new MainpageControls();
  draw(): void {
    $('.content').innerHTML = '';
    $('.content').append(<HTMLElement>($('#__mainpage') as HTMLTemplateElement).content.cloneNode(true));
    $('.content').id = 'mainpage';
    $('.content').setAttribute('data-page', 'mainpage');
    this.toys.draw(toys);
    this.controls.draw();
  }
  postRender(): void {
    this.toys.postRender();
    this.controls.postRender();
  }
  redraw(): void {
    this.toys.draw(toys);
  }
}

const mainpage = new Mainpage();

export default mainpage;
