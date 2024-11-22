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
    // Allow adding only one . in a number
    if (usersInput === '.' && this.term.includes('.')) {
      return;
    }

    if (this.term === '0' && usersInput !== '.') {
      this.term = usersInput;
    } else {
      this.term = this.term + usersInput;
    }
    this.outputElement.innerText = this.term;
  }

  clear() {
    this.term = '0';
    this.outputElement.innerText = this.term;
  }
}
