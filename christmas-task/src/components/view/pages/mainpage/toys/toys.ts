import './toys.css';
import { toy, Toys } from '../../../../data/toys';
import $, { eventCallback, EventCallbackBuilder, eventHandler, toggleArrayItem } from '../../../../utils/utils';
import { app } from '../../../../..';
import { ls } from '../../../../loader/localstorage-loader';
import { updateFavCounter } from '../mainpage-controller';

class MainpageToys {
  draw(data: Toys): void {
    const fragment = document.createDocumentFragment(),
      template = <HTMLTemplateElement>$('#__card'),
      container = $('.cards'),
      ls: ls = app.lsi.ls,
      filters = ls.filters,
      sort = (a: toy, b: toy): number => {
        if (ls.sort === 'sort-name-max') {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        }
        if (ls.sort === 'sort-name-min') {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        }
        if (ls.sort === 'sort-count-max') {
          if (parseInt(a.count) > parseInt(b.count)) {
            return 1;
          }
          if (parseInt(a.count) < parseInt(b.count)) {
            return -1;
          }
          return 0;
        }
        if (ls.sort === 'sort-count-min') {
          if (parseInt(a.count) > parseInt(b.count)) {
            return -1;
          }
          if (parseInt(a.count) < parseInt(b.count)) {
            return 1;
          }
          return 0;
        }
        return 0;
      };

    data = data.sort(sort);
    data.forEach((item: toy): void => {
      if (
        !item.name.match(RegExp(filters.name, 'ig')) ||
        parseInt(item.year) < filters.ranges.year.min ||
        parseInt(item.year) > filters.ranges.year.max ||
        parseInt(item.count) < filters.ranges.count.min ||
        parseInt(item.count) > filters.ranges.count.max ||
        (filters.strings.shape.length > 0 && !filters.strings.shape.includes(item.shape)) ||
        (filters.strings.color.length > 0 && !filters.strings.color.includes(item.color)) ||
        (filters.strings.size.length > 0 && !filters.strings.size.includes(item.size)) ||
        (filters.favorite && !item.favorite)
      ) {
        return;
      }
      const sourceClone: HTMLElement = <HTMLElement>template.content.cloneNode(true);

      $('.card', sourceClone).setAttribute('toy-num', item.num);
      if (app.lsi.ls.toys.indexOf(item.num) !== -1) $('.card', sourceClone).classList.toggle('card_active');
      $('.card__title', sourceClone).textContent = item.name;
      (<HTMLImageElement>$('.card__img', sourceClone)).src = `./assets/toys/${item.num}.png`;
      $('.card__count-val', sourceClone).textContent = item.count;
      $('.card__year-val', sourceClone).textContent = item.year;
      $('.card__shape-val', sourceClone).textContent = item.shape;
      $('.card__color-val', sourceClone).textContent = item.color;
      $('.card__size-val', sourceClone).textContent = item.size;
      $('.card__favorite-val', sourceClone).textContent = item.favorite ? 'да' : 'нет';
      $('.card__ribbon', sourceClone);

      fragment.append(sourceClone);
    });

    let content: string | DocumentFragment;
    if (fragment.childElementCount > 0) {
      content = fragment;
    } else {
      content = 'Извините, совпадений не обнаружено';
    }
    container.innerHTML = '';
    container.append(content);
  }
  postRender(): void {
    const selectCard: eventCallback = (event: Event): void => {
      const ls: ls = app.lsi.ls,
        target: Element = <Element>event.target;
      if (ls.toys.length < 20 || target.classList.contains('card_active')) {
        target.classList.toggle('card_active');
        toggleArrayItem(ls.toys, target.getAttribute('toy-num'));
        updateFavCounter();
      } else {
        alert('Извините, все слоты заполнены');
      }
    };
    const cardsCallback: eventHandler = EventCallbackBuilder(selectCard, 'card');
    const cardsContainer: HTMLElement = $('.cards');

    cardsContainer.addEventListener('click', cardsCallback);
  }
}

export default MainpageToys;
