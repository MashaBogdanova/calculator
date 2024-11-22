import { createElement } from '../utils/create-element';

export class Output {
  private output: string;
  private parent: HTMLElement;

  constructor(output: string, parent: HTMLElement) {
    this.output = output;
    this.parent = parent;
    this.render();
  }

  private render() {
    createElement({
      tag: 'div',
      styles: ['output'],
      parent: this.parent,
      innerText: this.output,
    });
  }
}
