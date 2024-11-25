import { Operator, operators } from '../utils/calculate-with-operator';
import { createElement } from '../utils/create-element';

export class Output {
  private currentValue: string;
  private firstOperand: number;
  private secondOperand: number;
  private operator: string | null;
  private isFirstOperation: boolean;
  private isAfterCalculate: boolean;
  private parentElement: HTMLElement;
  private outputElement: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.currentValue = '0';
    this.firstOperand = 0;
    this.secondOperand = 0;
    this.operator = null;
    this.isFirstOperation = true;
    this.isAfterCalculate = false;
    this.parentElement = parentElement;
    this.outputElement = this.render();
  }

  private render() {
    return createElement({
      tag: 'div',
      styles: ['output'],
      parent: this.parentElement,
      innerText: this.currentValue,
    });
  }

  updateCurrentValue(usersInput: string) {
    if (this.isAfterCalculate) {
      // Clear values if user enters a digit after previous result
      this.clear();
    }

    if (usersInput === '.' && this.currentValue.includes('.')) {
      // Allow adding only one . in a number
      return;
    }

    if (this.currentValue === '0' && usersInput !== '.') {
      // Replace initial value on first digit click
      this.currentValue = usersInput;
    } else {
      // Add digit to number
      this.currentValue = this.currentValue + usersInput;
    }

    this.outputElement.innerText = this.currentValue;
  }

  chooseOperator(symbol: string) {
    if (this.operator) {
      this.isFirstOperation = false;
    }

    if (this.isFirstOperation) {
      // Use the entered number as the first operand for the first operation
      // Otherwise, use the previous result
      this.firstOperand = Number(this.currentValue);
    }

    if (this.operator && !this.isAfterCalculate) {
      // Show result If user click operator to continue chain
      // For example 2 + 3 + 5...
      this.calculate();
    }

    this.operator = symbol;

    if (symbol === '%' || symbol === '+/-') {
      this.calculate();
      return;
    }

    this.currentValue = '0';
    this.isAfterCalculate = false;
  }

  calculate() {
    if (!this.operator) {
      return;
    }
    if (this.operator === '÷' && this.currentValue === '0') {
      // Show error if user divide by 0
      this.outputElement.innerText = 'Error';
      return;
    }
    if (!this.isAfterCalculate) {
      // If user clicks "=" multiple times in a row, retain the secondOperator
      // Otherwise, use the currentValue as the secondOperand
      this.secondOperand = Number(this.currentValue);
    }
    if (this.operator === '%') {
      this.secondOperand = 100;
    }
    if (this.operator === '+/-') {
      this.secondOperand = -1;
    }

    const result = operators[this.operator as Operator](
      this.firstOperand,
      this.secondOperand
    );

    this.currentValue = String(result);
    this.outputElement.innerText = this.currentValue.slice(0, 24);
    this.isFirstOperation = false;
    this.isAfterCalculate = true;
    this.firstOperand = result;
  }

  clear() {
    this.currentValue = '0';
    this.outputElement.innerText = this.currentValue;
    this.isFirstOperation = true;
    this.isAfterCalculate = false;
    this.operator = null;
  }
}
