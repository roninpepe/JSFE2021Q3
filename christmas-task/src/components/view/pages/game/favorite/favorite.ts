import './favorite.css';
import { app } from '../../../../..';
import { Toys } from '../../../../data/toys';
import $ from '../../../../utils/utils';

class Favorite {
  draw(): void {
    const fragment = document.createDocumentFragment(),
      template: HTMLTemplateElement = <HTMLTemplateElement>$('#__favcard'),
      container: HTMLElement = $('.favorites__container');
    let ls: string[];
    if (app.lsi.ls.toys.length) {
      ls = app.lsi.ls.toys;
    } else {
      ls = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
      ];
    }
    ls.forEach((item) => {
      const sourceClone: HTMLElement = <HTMLElement>template.content.cloneNode(true);
      (<HTMLImageElement>$('.favorites__card-image', sourceClone)).src = `./assets/toys/${item}.png`;
      fragment.append(sourceClone);
    });
    container.append(fragment);
  }
  postRender(data: Toys) {
    document.querySelectorAll('.favorites__card').forEach((item) => {
      const element: HTMLElement = <HTMLElement>item,
        image: HTMLImageElement = <HTMLImageElement>$('.favorites__card-image', element),
        res = image.src.match(/(\d+)(?=\.png)/);
      if (res) {
        image.dataset.num = element.dataset.num = parseInt(res.toString()).toString();
        element.dataset.count = data[parseInt(res.toString()) - 1].count;
      }
    });

    const map = $('#tree-map'),
      area = $('area', map),
      treeCont = $('.tree__image-container'),
      tree = $('.tree__image'),
      favorite = $('.favorites__container'),
      page = $('.game__page-container'),
      dataNum = (num: string | number): string => `[data-num='${num}']`,
      disablePointerEvents = () => {
        if (!treeCont.classList.contains('tree__image-container_active')) {
          treeCont.classList.add('tree__image-container_active');
        }
      },
      enablePointerEventsHandler = (event: DragEvent) => {
        if (
          treeCont.classList.contains('tree__image-container_active') &&
          !(<HTMLElement>event.target).closest('.tree__image-container')
        ) {
          treeCont.classList.remove('tree__image-container_active');
        }
      },
      enablePointerEvents = () => {
        if (treeCont.classList.contains('tree__image-container_active')) {
          treeCont.classList.remove('tree__image-container_active');
        }
      },
      highlightTree = (event: Event) => {
        tree.style.filter = 'brightness(1.2)';
        event.preventDefault();
      },
      highlightTreeStop = () => {
        tree.style.filter = '';
      },
      copyDragstartHandler = (event: DragEvent) => {
        event.dataTransfer?.setData('text', <string>(<HTMLElement>event.target).dataset.num);
        if (event.dataTransfer) {
          event.dataTransfer.effectAllowed = 'copy';
        }
      },
      moveDragstartHandler = (event: DragEvent) => {
        (<HTMLElement>event.target).id = 'moved';
        event.dataTransfer?.setData('text', <string>(<HTMLElement>event.target).dataset.num);
        if (event.dataTransfer) {
          event.dataTransfer.effectAllowed = 'move';
        }
      },
      idHandler = (event: DragEvent) => {
        (<HTMLElement>event.target).removeAttribute('id');
      },
      dropHandler = (event: DragEvent) => {
        const num = <string>event.dataTransfer?.getData('text'),
          rect = treeCont.getBoundingClientRect(),
          x = event.clientX,
          y = event.clientY,
          sumX = (x - rect.x - 30).toString() + 'px',
          sumY = (y - rect.y).toString() + 'px';
        if (event.dataTransfer?.effectAllowed === 'copy') {
          const toy: HTMLElement = <HTMLElement>$('img' + dataNum(num), favorite).cloneNode(true);
          treeCont.appendChild(toy);
          const appendedToy = <HTMLElement>treeCont.lastChild;
          appendedToy.style.left = sumX;
          appendedToy.style.top = sumY;
          const favoriteCard = $('.favorites__card' + dataNum(num), favorite).dataset;
          favoriteCard.count = (parseInt(<string>favoriteCard.count) - 1).toString();
        }
        if (event.dataTransfer?.effectAllowed === 'move') {
          const toy: HTMLElement = $('#moved');
          toy.style.left = sumX;
          toy.style.top = sumY;
        }
        highlightTreeStop();
        enablePointerEvents();
        event.dataTransfer?.clearData();
      },
      removeZoneHandler = (event: DragEvent) => {
        if (event.dataTransfer?.effectAllowed === 'move') {
          event.preventDefault();
        }
      },
      removeHandler = (event: DragEvent) => {
        event.preventDefault();
        if (event.dataTransfer?.effectAllowed === 'move' && <HTMLElement>event.target != area) {
          enablePointerEvents();
          $('#moved').remove();
          const num = <string>event.dataTransfer?.getData('text'),
            favoriteCard = $('.favorites__card' + dataNum(num), favorite).dataset;
          favoriteCard.count = (parseInt(<string>favoriteCard.count) + 1).toString();
        }
      };

    treeCont.addEventListener('dragover', disablePointerEvents);
    treeCont.addEventListener('dragleave', enablePointerEventsHandler);
    treeCont.addEventListener('dragstart', moveDragstartHandler);
    treeCont.addEventListener('dragend', idHandler);
    page.addEventListener('dragover', removeZoneHandler);
    page.addEventListener('drop', removeHandler);
    favorite.addEventListener('dragstart', copyDragstartHandler);
    map.addEventListener('dragover', highlightTree);
    map.addEventListener('dragleave', highlightTreeStop);
    map.addEventListener('drop', dropHandler);
  }
}

export default Favorite;
