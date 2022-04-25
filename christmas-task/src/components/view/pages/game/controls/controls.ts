import { app } from '../../../../..';
import $, { EventCallbackBuilder } from '../../../../utils/utils';
import './controls.css';

class Controls {
  draw(): void {
    const ls = app.lsi.ls.settings,
      audio = () => {
        const container: HTMLElement = $('.control-icons__audio'),
          activeClass = 'control-icons__item_active';
        if (ls.audio) container.classList.toggle(activeClass);
      },
      snow = () => {
        const container: HTMLElement = $('.tree__snow'),
          activeClass = 'tree__snow_active';
        if (ls.snow) {
          container.classList.toggle(activeClass);
          $('.control-icons__snow').classList.toggle('control-icons__item_active');
        }
      },
      tree = () => {
        const container: HTMLImageElement = <HTMLImageElement>$('.tree__image');
        container.src = `./assets/tree/${ls.tree}.png`;
      },
      background = () => {
        const container: HTMLElement = $('.game__tree');
        container.style.backgroundImage = `url('./assets/bg/${ls.background}.jpg')`;
      },
      lights = () => {
        const container: HTMLElement = $('.tree__lights');
        container.dataset.color = ls.lights;
      };
    audio();
    snow();
    background();
    tree();
    lights();
  }
  postRender(): void {
    const controls = $('.g-controls'),
      ls = app.lsi.ls.settings,
      audio = () => {
        const container: HTMLElement = $('.control-icons__audio'),
          activeClass = 'control-icons__item_active',
          isActive: boolean = container.classList.contains(activeClass);
        if (ls.audio === isActive) {
          ls.audio = !ls.audio;
          container.classList.toggle(activeClass);
        }
      },
      snow = () => {
        const container: HTMLElement = $('.tree__snow'),
          activeClass = 'tree__snow_active',
          isActive: boolean = container.classList.contains(activeClass);
        if (ls.snow === isActive) {
          ls.snow = !ls.snow;
          container.classList.toggle(activeClass);
          $('.control-icons__snow').classList.toggle('control-icons__item_active');
        }
      },
      tree = (event: Event) => {
        const container: HTMLImageElement = <HTMLImageElement>$('.tree__image'),
          tree = (<HTMLElement>event.target).dataset.tree;
        if (tree) ls.tree = parseInt(tree);
        container.src = `./assets/tree/${ls.tree}.png`;
      },
      background = (event: Event) => {
        const container: HTMLElement = $('.game__tree'),
          background = (<HTMLElement>event.target).dataset.bg;
        if (background) ls.background = parseInt(background);
        container.style.backgroundImage = `url('./assets/bg/${ls.background}.jpg')`;
      },
      lights = (event: Event) => {
        const container: HTMLElement = $('.tree__lights'),
          color = (<HTMLElement>event.target).dataset.color;
        if (color) ls.lights = color;
        container.dataset.color = color;
      },
      audioCallback = EventCallbackBuilder(audio, 'control-icons__audio'),
      snowCallback = EventCallbackBuilder(snow, 'control-icons__snow'),
      treeCallback = EventCallbackBuilder(tree, 'tree-controls__tree'),
      lightsCallback = EventCallbackBuilder(lights, 'lights-controls__color'),
      backgroundCallback = EventCallbackBuilder(background, 'bg-controls__bg');

    controls.addEventListener('click', audioCallback);
    controls.addEventListener('click', snowCallback);
    controls.addEventListener('click', treeCallback);
    controls.addEventListener('click', backgroundCallback);
    controls.addEventListener('click', lightsCallback);
  }
}

export default Controls;
