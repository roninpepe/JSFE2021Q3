import './index.css';
import $ from '../../../utils/utils';

class Index {
  draw(): void {
    $('.content').innerHTML = '';
    $('.content').append(<HTMLElement>($('#__index') as HTMLTemplateElement).content.cloneNode(true));
    $('.content').id = 'index';
    $('.content').setAttribute('data-page', 'index');
  }
}

const index = new Index();

export default index;
