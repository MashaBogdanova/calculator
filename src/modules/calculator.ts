import { BUTTON_SIGNS } from '../data/buttons-signs';
import { createElement } from '../utils/create-element';
import { Button } from './button';
import { Output } from './output';

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

    // Circle
    createElement({ tag: 'div', styles: ['circle'], parent: main });

    // Calculator
    const calculator = createElement({
      tag: 'section',
      styles: ['calculator'],
      parent: main,
    });

    // Output
    const outputWrapper = createElement({
      tag: 'div',
      styles: ['output__wrapper'],
      parent: calculator,
    });
    const output = new Output(outputWrapper);

    // Buttons
    const buttonsWrapper = createElement({
      tag: 'div',
      styles: ['buttons'],
      parent: calculator,
    });

    buttonsWrapper.addEventListener('click', (e) => {
      const clickedButton = e.target as HTMLButtonElement;
      const clickedSymbol = clickedButton.innerText;

      if (
        !isNaN(Number(clickedSymbol)) ||
        clickedSymbol === '.' ||
        clickedSymbol === '+/-'
      ) {
        // Update value if user click digit or . or +/-
        output.updateValue(clickedSymbol);
      } else if (clickedSymbol === 'AC') {
        // Clear if user click AC
        output.clear();
      } else if (clickedSymbol === '=') {
        output.calculate();
      } else {
        // Provide calculations if user click operator
        output.chooseOperator(clickedSymbol);
      }
    });

    BUTTON_SIGNS.map((sign) => {
      new Button(sign, buttonsWrapper);
    });
  }
}
