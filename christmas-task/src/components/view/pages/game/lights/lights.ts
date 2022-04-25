import './lights.css';
import { app } from '../../../../..';
import $ from '../../../../utils/utils';

class Lights {
  draw(): void {
    $('.tree__lights-container').append(<HTMLElement>($('#__lights') as HTMLTemplateElement).content.cloneNode(true));
    $('.tree__lights-container').setAttribute('data-color', app.lsi.ls.settings.lights);
  }
}

export default Lights;
