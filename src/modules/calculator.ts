import { BUTTON_SIGNS } from '../data/buttonsSigns';
import { createElement } from '../utils/create-element';
import { Button } from './button';

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

    const calculator = createElement({
      tag: 'section',
      styles: ['calculator'],
      parent: main,
    });

    const buttonsWrapper = createElement({
      tag: 'div',
      styles: ['buttons'],
      parent: calculator,
    });

    BUTTON_SIGNS.map((sign) => {
      new Button(sign, buttonsWrapper);
    });
  }
}
