import { createElement } from '../utils/create-element';

export class Output {
  private parent: HTMLElement;
  private term: string;
  private outputElement: HTMLElement;

  constructor(parent: HTMLElement) {
    this.parent = parent;
    this.term = '0';
    this.outputElement = this.render();
  }

  private render() {
    return createElement({
      tag: 'div',
      styles: ['output'],
      parent: this.parent,
      innerText: this.term,
    });
  }

  update(usersInput: string) {
    if (this.term === '0') {
      this.term = usersInput;
    } else {
      this.term = this.term + usersInput;
    }
    this.outputElement.innerText = this.term;
  }
}
