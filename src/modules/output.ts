import { Operator, operators } from '../utils/calculate-with-operator';
import { createElement } from '../utils/create-element';

export class Output {
  private currentNumber: string;
  private isNumberPositive: boolean;
  private firstOperand: number;
  private secondOperand: number;
  private operator: string | null;
  private isFirstOperation: boolean;
  private isAfterCalculate: boolean;
  private parentElement: HTMLElement;
  private outputElement: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.currentNumber = '0';
    this.isNumberPositive = true;
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
      innerText: this.currentNumber,
    });
  }

  updateValue(usersInput: string) {
    if (this.isAfterCalculate) {
      // Clear values if user enters a digit after previous result
      this.clear();
    }

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
    if (this.isFirstOperation) {
      // Use the entered number as the first operand for the first operation
      // Otherwise, use the previous result
      this.firstOperand = Number(this.currentNumber);
    }
    this.operator = symbol;
    this.currentNumber = '0';
    this.isAfterCalculate = false;
  }

  calculate() {
    if (this.operator) {
      if (this.operator === '÷' && this.currentNumber === '0') {
        // Show error if user divide by 0
        this.outputElement.innerText = 'Error';
        return;
      }

      if (!this.isAfterCalculate) {
        // If user clicks "=" multiple times in a row, retain the secondOperator
        // Otherwise, use the currentNumber as the secondOperand
        this.secondOperand = Number(this.currentNumber);
      }

      const result = operators[this.operator as Operator](
        this.firstOperand,
        this.secondOperand
      );
      this.currentNumber = String(result).slice(0, 24);
      this.outputElement.innerText = this.currentNumber;

      this.isFirstOperation = false;
      this.isAfterCalculate = true;
      // Use result as the first operand if user continues counting
      this.firstOperand = result;
    }
  }

  calculatePercent() {
    const result = Number(this.currentNumber) / 100;
    this.currentNumber = String(result);
    this.outputElement.innerText = this.currentNumber.slice(0, 16);
    this.firstOperand = result;
  }

  clear() {
    this.currentNumber = '0';
    this.outputElement.innerText = this.currentNumber;
    this.isFirstOperation = true;
    this.isAfterCalculate = false;
  }
}
