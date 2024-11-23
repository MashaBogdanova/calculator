import { Operator, operators } from '../utils/calculate-with-operator';
import { createElement } from '../utils/create-element';

export class Output {
  private currentNumber: string;
  private isNumberPositive: boolean;
  private firstOperand: number;
  private operator: string | null;
  private parentElement: HTMLElement;
  private outputElement: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.currentNumber = '0';
    this.isNumberPositive = true;
    this.firstOperand = 0;
    this.operator = null;
    this.parentElement = parentElement;
    this.outputElement = this.render();
  }

  private render() {
    return createElement({
      tag: 'div',
      styles: ['output'],
      parent: this.parentElement,
      innerText: this.currentNumber,
    });
  }

  updateValue(usersInput: string) {
    if (usersInput === '.' && this.currentNumber.includes('.')) {
      // Allow adding only one . in a number
      return;
    }

    if (
      this.currentNumber === '0' &&
      usersInput !== '.' &&
      usersInput !== '+/-'
    ) {
      // Replace initial value on first digit click
      this.currentNumber = usersInput;
    } else if (usersInput === '+/-') {
      // Switch number to negative / positive
      this.currentNumber = String(Number(this.currentNumber) * -1);
    } else {
      // Add digit to number
      this.currentNumber = this.currentNumber + usersInput;
    }
    this.outputElement.innerText = this.currentNumber;
  }

  chooseOperator(symbol: string) {
    this.firstOperand = Number(this.currentNumber);
    this.currentNumber = '0';
    this.operator = symbol;
  }

  calculate() {
    if (this.operator) {
      const result = operators[this.operator as Operator](
        this.firstOperand,
        Number(this.currentNumber)
      );

      this.outputElement.innerText = String(result);
      this.firstOperand = result;
      this.currentNumber = '0';
    }
  }

  clear() {
    this.currentNumber = '0';
    this.outputElement.innerText = this.currentNumber;
  }
}
