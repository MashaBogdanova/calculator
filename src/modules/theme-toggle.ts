import { createElement } from '../utils/create-element';

export class ThemeToggle {
  constructor() {
    this.render();
  }

  render() {
    const header = createElement({
      tag: 'header',
      styles: ['header'],
      parent: document.body,
    });

    const toggle = createElement({
      tag: 'div',
      styles: ['toggle'],
      parent: header,
    });

    createElement({
      tag: 'div',
      styles: ['toggle__icon', 'toggle__icon_light'],
      parent: toggle,
    });

    createElement({
      tag: 'div',
      styles: ['toggle__icon', 'toggle__icon_dark'],
      parent: toggle,
    });

    toggle.addEventListener('click', () => {
      document.body.classList.toggle('body_dark');
    });
  }
}
