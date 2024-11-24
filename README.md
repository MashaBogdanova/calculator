# Calculator

**Author:** Bogdanova Maria  
**GitHub Profile:** [Link to rprofile](https://github.com/MashaBogdanova)  
**Project GitHub Repository:** [Link to repository](https://github.com/MashaBogdanova/calculator)  
**Task documentation:** [Link to task](https://docs.google.com/document/d/1zpXXeSae-BlcxPKgw3DhxZA92cspVailrPYoaXSYrW8/edit?tab=t.0)  
**Deploy:** [Link to deploy](#)

## Features
- Basic arithmetic operations: addition, subtraction, multiplication, division.
- Advanced operations: percentage calculation and sign switching.
- Theme toggle: light and dark modes.

---

## Technologies Used
- **JavaScript**
- **TypeScript**
- **SASS**
- **Webpack**
- **ESLint**
- **Prettier**
- **Husky**

---

## Folder Structure
The code is organized in the `src` folder, with the following structure:

- **`src`**
  - **`index.ts`** and **`index.html`**: Core entry files for the application.
  - **`data/`**: Contains TypeScript files with constants used across the app.
  - **`modules/`**: Stores TypeScript files for application modules, encapsulating specific functionality.
  - **`styles/`**: Contains SCSS files for styling the application.
  - **`utils/`**: Includes TypeScript utility files used throughout the app.
  - **`assets/`**: Includes png icons.

---

## Setup and Installation
To get started with the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone git@github.com:MashaBogdanova/calculator.git
   
2. Install dependencies:
   ```bash
   npm install
   
3. Build the project:
   ```bash 
   npm run build
   
4. Start the development server:
   ```bash
   npm run start

---

# Available Scripts

Below is a list of all scripts defined in the project and their purpose:

- **Build the project**  
Builds the application for production using Webpack. Outputs the optimized code into the `dist` folder.
   ```bash
   npm run build
  
- **Start the development server**  
Runs the application in development mode using Webpack Dev Server. Includes hot module reloading for easier development.
   ```bash
   npm run start
  
- **Lint the code**  
Analyzes all JavaScript and TypeScript files in the src folder for potential issues based on ESLint rules.
   ```bash
   npm run lint
  
- **Lint and fix issues automatically**  
Runs the ESLint linter and attempts to automatically fix issues in JavaScript and TypeScript files.
   ```bash
   npm run lint:fix
  
- **Format code**  
Formats all JavaScript, TypeScript, SCSS, and HTML files in the src folder using Prettier.
   ```bash
   npm run format
- **Prepare Git hooks**  
Sets up Husky to manage Git hooks, such as pre-commit or pre-push hooks, for ensuring code quality.
   ```bash
   npm run prepare
