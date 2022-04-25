import $, { eventCallback, EventCallbackBuilder, eventHandler } from './utils';

export type staticContentTemplates = string[];
export type routes = string[];
export type URL = string[];
export interface staticContent {
  path?: string;
  templates?: staticContentTemplates;
}
export interface page {
  excludedContent?: staticContentTemplates;
  subpages?: pages;
}
export interface pages {
  [page: string]: page;
}
export interface content {
  static: staticContent;
  pages: pages;
}
export interface router {
  path?: string;
  routes?: routes;
  startPage?: string;
}
export interface SPAOptions {
  content?: content;
  router?: router;
}
export interface drawable {
  default: {
    draw: () => void;
    postRender?: () => void;
  };
}
interface views {
  [page: string]: Promise<drawable>;
}

class defaultOptions implements content {
  static: staticContent = {};
  pages: pages = {};
}

class SPA {
  body: HTMLElement = $('body');
  content: content;
  pagesPath: string;
  routes: routes;
  startPage: string;
  views: views;
  constructor(options?: SPAOptions) {
    this.content = options?.content ?? new defaultOptions();
    this.pagesPath = options?.router?.path ?? '../view/pages';
    this.routes = options?.router?.routes ?? ['index'];
    this.startPage = options?.router?.startPage ?? 'index';
    this.views = {};
  }
  parseURL(): URL {
    return location.hash.toLowerCase().slice(1).split('/');
  }
  render<T extends drawable>(module: T): void {
    module.default.draw();
    if (module.default.postRender) module.default.postRender();
  }
  routePage(): void {
    if (this.routes.includes(this.parseURL()[0]) || this.parseURL()[0] === '') {
      let fileName: string, page: page;
      if (this.parseURL()[0] === '') {
        fileName = this.startPage;
      } else {
        fileName = this.parseURL()[0];
      }
      if (this.content.pages !== undefined) {
        page = this.content.pages[fileName];
        this.views[fileName].then(this.render);
        this.content.static.templates?.forEach((item: string) => {
          if (document.querySelector('.' + item)) {
            if (page.excludedContent?.includes(item)) {
              $('.' + item).hidden = true;
            } else {
              $('.' + item).hidden = false;
            }
          }
        });
      }
    }
  }
  init(): void {
    this.content.static.templates?.forEach((item): void => {
      import('../view/components/' + item + '/' + item).then(this.render);
    });
    this.routes.forEach((item): void => {
      this.views[item] = import('../view/pages/' + item + '/' + item);
    });
    const changePage: eventCallback = (event: Event): void => {
        event;
        this.routePage();
      },
      navigationCallback: eventHandler = EventCallbackBuilder(changePage);
    globalThis.addEventListener('hashchange', navigationCallback);
    this.routePage();
  }
}

export default SPA;
