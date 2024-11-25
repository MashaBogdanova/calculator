export type Operator = '+' | '-' | '×' | '÷' | '%' | '+/-';

export const operators: Record<Operator, (a: number, b: number) => number> = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '×': (a, b) => a * b,
  '÷': (a, b) => a / b,
  '%': (a, b) => a / b,
  '+/-': (a, b) => a * b,
};
