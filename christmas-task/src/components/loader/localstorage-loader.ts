interface range {
  [key: string]: number;
}
export interface ranges {
  [key: string]: range;
}
type arrayOfStrings = Array<string>;
interface strings {
  [key: string]: arrayOfStrings;
}
interface filters {
  name: string;
  ranges: ranges;
  strings: strings;
  favorite: boolean;
}
interface settings {
  audio: boolean;
  snow: boolean;
  lights: string;
  background: number;
  tree: number;
}
export interface ls {
  toys: arrayOfStrings;
  filters: filters;
  sort: string;
  settings: settings;
}

class LSDefault implements ls {
  toys: arrayOfStrings = [];
  filters: filters = {
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
  };
  sort = 'sort-name-max';
  settings: settings = {
    audio: false,
    snow: false,
    lights: 'off',
    background: 1,
    tree: 1,
  };
}

class LS {
  load(): ls | null {
    const item = localStorage.getItem('ls');
    return item === 'undefined' || item === null ? null : JSON.parse(item);
  }
  ls: ls = this.load() ?? new LSDefault();
  save = (): void => {
    this.ls.filters.name = '';
    localStorage.setItem('ls', JSON.stringify(this.ls));
  };
  reset = (): void => {
    this.ls = new LSDefault();
    this.save();
  };
}

export default LS;
