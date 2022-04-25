import HTMLTemplatesParts from './parts';

const parts: HTMLTemplatesParts = new HTMLTemplatesParts();

class HTMLTemplatesInitial {
  pageControls: () => string = parts.pageControls;

  header: () => string = parts.header;

  grass: () => string = parts.grass;

  popup: () => string = parts.popup;

  template = (): string => {
    return `${this.pageControls()}${this.header()}${this.grass()}${this.popup()}`;
  };
}

export default HTMLTemplatesInitial;
