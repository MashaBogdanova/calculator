import { createElement } from '../utils/create-element';

export class Output {
  private parent: HTMLElement;
  private term: string;
  private isPositive: boolean;
  private outputElement: HTMLElement;

  constructor(parent: HTMLElement) {
    this.parent = parent;
    this.term = '0';
    this.isPositive = true;
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

  updateValue(usersInput: string) {
    if (usersInput === '.' && this.term.includes('.')) {
      // Allow adding only one . in a number
      return;
    }

    if (this.term === '0' && usersInput !== '.' && usersInput !== '+/-') {
      // Replace initial value on first digit click
      this.term = usersInput;
    } else if (usersInput === '+/-') {
      // Switch number to negative / positive
      this.term = String(Number(this.term) * -1);
    } else {
      // Add digit to number
      this.term = this.term + usersInput;
    }
    this.outputElement.innerText = this.term;
  }

  clear() {
    this.term = '0';
    this.outputElement.innerText = this.term;
  }
}
