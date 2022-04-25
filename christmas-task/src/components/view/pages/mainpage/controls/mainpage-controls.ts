import './mainpage-controls.css';
import $, { eventCallback, EventCallbackBuilder, eventHandler, toggleArrayItem } from '../../../../utils/utils';
import { Options, target } from 'nouislider';
import wNumb from 'wnumb';
import noUiSlider from '../../../../utils/nouislider';
import { app } from '../../../../..';
import { ls, ranges } from '../../../../loader/localstorage-loader';

class MainpageControls {
  sliderCount: Options = {
    range: {
      min: 1,
      max: 12,
    },
    step: 1,
    start: [1, 12],
    connect: true,
    behaviour: 'tap-drag',
    tooltips: wNumb({ decimals: 0 }),
  };
  sliderYear: Options = {
    range: {
      min: 1940,
      max: 2020,
    },
    step: 10,
    start: [1940, 2020],
    connect: true,
    behaviour: 'tap-drag',
    tooltips: wNumb({ decimals: 0 }),
  };
  draw(): void {
    noUiSlider.create(<target>$('.range__slider_count'), this.sliderCount);
    noUiSlider.create(<target>$('.range__slider_year'), this.sliderYear);
    app.mainpage.controls.redraw();
  }
  postRender(): void {
    const applyFilterBySearch: eventCallback = (event: Event): void => {
        const ls: ls = app.lsi.ls,
          target: HTMLInputElement = <HTMLInputElement>event.target;
        ls.filters.name = target.value;
        app.mainpage.redraw();
      },
      applyFilterByClick: eventCallback = (event: Event): void => {
        const ls: ls = app.lsi.ls,
          target: Element = <Element>event.target,
          filter: string = <string>target.getAttribute('data-filter'),
          filterType: string = <string>(target.parentNode as Element).getAttribute('data-filter-type');
        target.classList.toggle('filter__button_active');
        toggleArrayItem(ls.filters.strings[filterType], filter);
        app.mainpage.redraw();
      },
      applyFilterByCheckbox: eventCallback = (event: Event): void => {
        const ls: ls = app.lsi.ls,
          target: HTMLInputElement = <HTMLInputElement>event.target;
        ls.filters.favorite = !ls.filters.favorite;
        target.checked = ls.filters.favorite;
        app.mainpage.redraw();
      },
      applyFilterByCount = (values: unknown): void => {
        const ls: ranges = app.lsi.ls.filters.ranges;
        ls.count.min = <number>(values as Array<number>)[0];
        ls.count.max = <number>(values as Array<number>)[1];
        app.mainpage.redraw();
      },
      applyFilterByYear = (values: unknown): void => {
        const ls: ranges = app.lsi.ls.filters.ranges;
        ls.year.min = <number>(values as Array<number>)[0];
        ls.year.max = <number>(values as Array<number>)[1];
        app.mainpage.redraw();
      },
      applySort: eventCallback = (event: Event): void => {
        const ls: ls = app.lsi.ls,
          target: HTMLInputElement = <HTMLInputElement>event.target;
        ls.sort = target.value;
        app.mainpage.redraw();
      },
      resetFilters: eventCallback = (event: Event): void => {
        const ls: ls = app.lsi.ls;
        event;
        ls.filters = {
          name: ls.filters.name,
          ranges: {
            count: {
              min: 0,
              max: 12,
            },
            year: {
              min: 1940,
              max: 2020,
            },
          },
          strings: {
            shape: [],
            color: [],
            size: [],
          },
          favorite: false,
        };
        app.mainpage.controls.redraw();
      },
      filterButtonCallback: eventHandler = EventCallbackBuilder(applyFilterByClick, 'filter__button'),
      filterSearchCallback: eventHandler = EventCallbackBuilder(applyFilterBySearch),
      filterCheckboxCallback: eventHandler = EventCallbackBuilder(applyFilterByCheckbox),
      sortCallback: eventHandler = EventCallbackBuilder(applySort),
      resetFiltersCallback: eventHandler = EventCallbackBuilder(resetFilters),
      filterSearch: HTMLElement = $('.controls__search'),
      filterContainer: HTMLElement = $('.filters'),
      filterCheckbox: HTMLElement = $('.filter__checkbox'),
      sortSelect: HTMLElement = $('.sort__select'),
      resetFiltersButton: HTMLElement = $('.controls__reset');

    ($('.range__slider_count') as target).noUiSlider?.on('update', applyFilterByCount);
    ($('.range__slider_year') as target).noUiSlider?.on('update', applyFilterByYear);
    filterSearch.addEventListener('input', filterSearchCallback);
    filterContainer.addEventListener('click', filterButtonCallback);
    filterCheckbox.addEventListener('change', filterCheckboxCallback);
    sortSelect.addEventListener('change', sortCallback);
    resetFiltersButton.addEventListener('click', resetFiltersCallback);
  }
  redraw(): void {
    const ls: ls = app.lsi.ls;
    $('.filters')
      .querySelectorAll('.filter__button')
      .forEach((item: Element): void => {
        const filterType: string = <string>(item.parentNode as Element).getAttribute('data-filter-type'),
          filter: string = <string>item.getAttribute('data-filter'),
          containsFilter: boolean = ls.filters.strings[filterType].includes(filter),
          isActive: boolean = item.classList.contains('filter__button_active');
        if (containsFilter !== isActive) {
          item.classList.toggle('filter__button_active');
        }
      });
    ($('.filter__checkbox') as HTMLInputElement).checked = ls.filters.favorite;
    ($('.range__slider_count') as target).noUiSlider?.updateOptions(
      {
        start: [ls.filters.ranges.count.min, ls.filters.ranges.count.max],
      },
      true
    );
    ($('.range__slider_year') as target).noUiSlider?.updateOptions(
      {
        start: [ls.filters.ranges.year.min, ls.filters.ranges.year.max],
      },
      true
    );
    ($('.sort__select') as HTMLSelectElement).value = ls.sort;
  }
}

export default MainpageControls;
