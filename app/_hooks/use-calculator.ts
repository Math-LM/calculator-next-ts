import { useMemo, useState } from "react";
import {
  calculate,
  ERROR_MESSAGE,
  formatResult,
  OPERATOR_SYMBOLS,
  type Operator,
} from "../_lib/calculator";

// O hook guarda o ESTADO da calculadora e expõe as AÇÕES.
// As contas em si ficam em _lib/calculator.ts.

type CalculatorState = {
  display: string; // o que aparece no visor
  storedValue: number | null; // primeiro número da conta
  operator: Operator | null; // operação escolhida
  waitingForOperand: boolean; // true = o próximo dígito começa um número novo
};

const INITIAL_STATE: CalculatorState = {
  display: "0",
  storedValue: null,
  operator: null,
  waitingForOperand: false,
};

const ERROR_STATE: CalculatorState = { ...INITIAL_STATE, display: ERROR_MESSAGE };

const MAX_DIGITS = 16;

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>(INITIAL_STATE);

  // Todas as ações usam setState(s => ...), então não dependem do estado
  // atual e podem ser criadas uma única vez (useMemo com []).
  const actions = useMemo(() => ({
      inputDigit(digit: string) {
        setState((s) => {
          if (s.display === ERROR_MESSAGE) return { ...INITIAL_STATE, display: digit };

          if (s.waitingForOperand) return { ...s, display: digit, waitingForOperand: false };

          if (s.display.replace(/[-.]/g, "").length >= MAX_DIGITS) return s;

          return { ...s, display: s.display === "0" ? digit : s.display + digit };
        });
      },

      inputDecimal() {
        setState((s) => {
          if (s.display === ERROR_MESSAGE) return { ...INITIAL_STATE, display: "0." };

          if (s.waitingForOperand) return { ...s, display: "0.", waitingForOperand: false };
          
          if (s.display.includes(".")) return s;
          
          return { ...s, display: s.display + "." };
        });
      },

      chooseOperator(operator: Operator) {
        setState((s) => {
          if (s.display === ERROR_MESSAGE) return s;

          // Trocou de operador antes de digitar o segundo número (ex.: "5 + ×")
          if (s.operator && s.waitingForOperand) return { ...s, operator };

          const current = Number(s.display);

          // Primeira operação: só guarda o número
          if (s.storedValue === null || s.operator === null) {
            return { ...s, storedValue: current, operator, waitingForOperand: true };
          }

          // Conta encadeada (ex.: "2 + 3 +"): resolve a anterior primeiro
          const result = calculate(s.storedValue, s.operator, current);
          if (result === null) return ERROR_STATE;

          const display = formatResult(result);
          return { display, storedValue: Number(display), operator, waitingForOperand: true };
        });
      },

      equals() {
        setState((s) => {

          if (s.display === ERROR_MESSAGE || s.storedValue === null || s.operator === null) {
            return s;
          }

          const result = calculate(s.storedValue, s.operator, Number(s.display));

          if (result === null) return ERROR_STATE;

          return { ...INITIAL_STATE, display: formatResult(result), waitingForOperand: true };

        });
      },

      // CE: limpa só o número atual, mantém a conta em andamento
      clearEntry() {
        setState((s) =>
          s.display === ERROR_MESSAGE
            ? INITIAL_STATE
            : { ...s, display: "0", waitingForOperand: false },
        );
      },

      // C: limpa tudo
      clear() {
        setState(INITIAL_STATE);
      },

      backspace() {
        setState((s) => {
          if (s.display === ERROR_MESSAGE) return INITIAL_STATE;
          if (s.waitingForOperand) return s; // não apaga um resultado
          const next = s.display.slice(0, -1);
          return { ...s, display: next === "" || next === "-" ? "0" : next };
        });
      },

      toggleSign() {
        setState((s) => {
          if (s.display === ERROR_MESSAGE || Number(s.display) === 0) return s;
          const display = s.display.startsWith("-") ? s.display.slice(1) : "-" + s.display;
          return { ...s, display };
        });
      },
    }),
    [],
  );

  // Linha pequena acima do visor, ex.: "12 ×"
  const expression =
    state.storedValue !== null && state.operator !== null
      ? `${formatResult(state.storedValue)} ${OPERATOR_SYMBOLS[state.operator]}`
      : "";

  return { display: state.display, expression, ...actions };
}
