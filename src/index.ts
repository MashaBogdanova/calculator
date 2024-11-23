import './styles/style.scss';

import { Calculator } from './modules/calculator';
import { ThemeToggle } from './modules/theme-toggle';

document.body.classList.add('body');

new ThemeToggle();
new Calculator();
