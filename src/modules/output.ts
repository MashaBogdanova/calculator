import { Operator, operators } from '../utils/calculate-with-operator';
import { createElement } from '../utils/create-element';

export class Output {
  private currentValue: string;
  private isNumberPositive: boolean;
  private firstOperand: number;
  private secondOperand: number;
  private operator: string | null;
  private isFirstOperation: boolean;
  private isAfterCalculate: boolean;
  private parentElement: HTMLElement;
  private outputElement: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.currentValue = '0';
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

    if (
      this.currentValue === '0' &&
      usersInput !== '.' &&
      usersInput !== '+/-'
    ) {
      // Replace initial value on first digit click
      this.currentValue = usersInput;
    } else if (usersInput === '+/-') {
      // Switch number to negative / positive
      this.currentValue = String(Number(this.currentValue) * -1);
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

    this.currentValue = '0';
    this.operator = symbol;
    this.isAfterCalculate = false;
  }

  calculate() {
    if (this.operator) {
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

      const result = operators[this.operator as Operator](
        this.firstOperand,
        this.secondOperand
      );
      this.currentValue = String(result);
      this.outputElement.innerText = this.currentValue.slice(0, 24);

      this.isFirstOperation = false;
      this.isAfterCalculate = true;
      // Use result as the first operand if user continues counting
      this.firstOperand = result;
    }
  }

  calculatePercent() {
    const result = Number(this.currentValue) / 100;
    this.currentValue = String(result);
    this.outputElement.innerText = this.currentValue.slice(0, 16);
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
