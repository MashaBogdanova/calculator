import { createElement } from '../utils/create-element';

export class Calculator {
  constructor() {
    this.render();
  }

  private render() {
    const main = createElement({
      tag: 'main',
      styles: ['main'],
      parent: document.body,
    });

    createElement({
      tag: 'section',
      styles: ['calculator'],
      parent: main,
    });
  }
}
