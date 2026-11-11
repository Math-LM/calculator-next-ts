// Lógica pura da calculadora: nada de React aqui.
// Por ser só funções que recebem valores e devolvem valores,
// este arquivo é fácil de testar e de reaproveitar.

export type Operator = "+" | "-" | "*" | "/";

export const ERROR_MESSAGE = "Erro";

// Símbolo mostrado na tela para cada operador
export const OPERATOR_SYMBOLS: Record<Operator, string> = {
  "+": "+",
  "-": "−",
  "*": "×",
  "/": "÷",
};
//diferença entre ==(compara só o valor) e === (compara o valor e o tipo)
export function isOperator(value: string): value is Operator {
  return value === "+" || value === "-" || value === "*" || value === "/";
}

// Retorna null quando a conta é inválida (ex.: divisão por zero)
export function calculate(a: number, operator: Operator, b: number): number | null {
  let result: number;

  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      if (b === 0) return null;
      result = a / b;
      break;
  }

  return Number.isFinite(result) ? result : null;
}

// Corrige erros de ponto flutuante (ex.: 0.1 + 0.2 = 0.30000000000000004 → "0.3")
export function formatResult(value: number): string {
  return String(Number(value.toPrecision(12)));
}
