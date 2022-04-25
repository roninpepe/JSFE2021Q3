import './game.css';
import $ from '../../../utils/utils';
import Lights from './lights/lights';
import toys from '../../../data/toys';
import Favorite from './favorite/favorite';
import Controls from './controls/controls';

class Game {
  lights: Lights = new Lights();
  favorite: Favorite = new Favorite();
  controls: Controls = new Controls();
  draw(): void {
    $('.content').innerHTML = '';
    $('.content').append(<HTMLElement>($('#__game') as HTMLTemplateElement).content.cloneNode(true));
    $('.content').id = 'game';
    $('.content').setAttribute('data-page', 'game');
    this.lights.draw();
    this.favorite.draw();
    this.controls.draw();
  }
  postRender(): void {
    this.favorite.postRender(toys);
    this.controls.postRender();
  }
  reDraw(): void {
    this.draw();
    this.postRender();
  }
}

const game = new Game();

export default game;
