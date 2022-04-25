import HTMLTemplatesParts from './parts';

const parts: HTMLTemplatesParts = new HTMLTemplatesParts();

class HTMLTemplatesGenerated {
  road: (id: number, name: string, color: string) => string = parts.road;

  winner: (id: number, name: string, color: string, wins: number, time: number) => string = parts.tr;
}

export default HTMLTemplatesGenerated;
