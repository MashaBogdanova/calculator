import { BUTTON_SIGNS_ACCENT } from '../data/buttons-signs';
import { createElement } from '../utils/create-element';

export class Button {
  private sign: string;
  private parent: string | HTMLElement;

  constructor(sign: string, parent: string | HTMLElement) {
    this.sign = sign;
    this.parent = parent;
    this.render();
  }

  private render() {
    createElement({
      tag: 'button',
      styles: [
        'button',
        `${this.sign === '0' && 'button_long'}`,
        `${BUTTON_SIGNS_ACCENT.includes(this.sign) && 'button_accent'}`,
      ],
      parent: this.parent,
      innerText: this.sign,
    });
  }
}
