import { app } from '../..';

export interface range {
  [key: string]: number;
}
export interface ranges {
  [key: string]: range;
}
export type arrayOfStrings = Array<string>;
export interface strings {
  [key: string]: arrayOfStrings;
}
export interface filters {
  name: string;
  ranges: ranges;
  strings: strings;
  favorite: boolean;
}
export interface ls {
  toys: Array<string>;
  filters: filters;
  sort: string;
}
export const lsDefault: ls = {
  toys: [],
  filters: {
    name: '',
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
  },
  sort: 'sort-name-max',
};
class LS {
  load(): ls | null {
    const item = localStorage.getItem('ls');
    return item === 'undefined' || item === null ? null : JSON.parse(item);
  }
  ls: ls = this.load() ?? lsDefault;
  save = (): void => {
    app.lsi.ls.filters.name = '';
    localStorage.setItem('ls', JSON.stringify(this.ls));
  };
  reset = (): void => {
    this.ls = {
      toys: [],
      filters: {
        name: '',
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
      },
      sort: 'sort-name-max',
    };
    this.save();
  };
}

export default LS;
