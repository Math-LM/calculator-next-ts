"use client";

// Antes: Section.tsx. Este é o único Client Component do projeto:
// layout.tsx e page.tsx continuam sendo Server Components.

import { useEffect, type ReactNode } from "react";
import Button, { type ButtonVariant } from "./Button";
import Display from "./Display";
import Row from "./Row";
import BackspaceIcon from "./icons/BackspaceIcon";
import { useCalculator } from "../_hooks/use-calculator";
import { isOperator, OPERATOR_SYMBOLS, type Operator } from "../_lib/calculator";

type Key = {
  id: string;
  label: ReactNode;
  ariaLabel?: string;
  variant: ButtonVariant;
  onPress: () => void;
};

export default function Calculator() {
  const {
    display,
    expression,
    inputDigit,
    inputDecimal,
    chooseOperator,
    equals,
    clearEntry,
    clear,
    backspace,
    toggleSign,
  } = useCalculator();

  // Pequenas "fábricas" para não repetir a mesma estrutura em cada tecla
  const digit = (d: string): Key => ({
    id: d,
    label: d,
    variant: "number",
    onPress: () => inputDigit(d),
  });

  const operator = (op: Operator, ariaLabel: string): Key => ({
    id: op,
    label: OPERATOR_SYMBOLS[op],
    ariaLabel,
    variant: "operator",
    onPress: () => chooseOperator(op),
  });

  // O layout do teclado vira DADOS; o JSX abaixo só percorre o array
  const rows: Key[][] = [
    [
      { id: "ce", label: "CE", ariaLabel: "Limpar entrada", variant: "function", onPress: clearEntry },
      { id: "c", label: "C", ariaLabel: "Limpar tudo", variant: "function", onPress: clear },
      { id: "backspace", label: <BackspaceIcon />, ariaLabel: "Apagar último dígito", variant: "function", onPress: backspace },
      operator("/", "Dividir"),
    ],
    [digit("7"), digit("8"), digit("9"), operator("*", "Multiplicar")],
    [digit("4"), digit("5"), digit("6"), operator("-", "Subtrair")],
    [digit("1"), digit("2"), digit("3"), operator("+", "Somar")],
    [
      { id: "sign", label: "+/-", ariaLabel: "Inverter sinal", variant: "number", onPress: toggleSign },
      digit("0"),
      { id: "decimal", label: ".", ariaLabel: "Ponto decimal", variant: "number", onPress: inputDecimal },
      { id: "equals", label: "=", ariaLabel: "Igual", variant: "equals", onPress: equals },
    ],
  ];

  // Suporte ao teclado físico
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const { key } = event;

      if (/^\d$/.test(key)) inputDigit(key);
      else if (key === "." || key === ",") inputDecimal();
      else if (isOperator(key)) chooseOperator(key);
      else if (key === "Enter" || key === "=") equals();
      else if (key === "Backspace") backspace();
      else if (key === "Delete") clearEntry();
      else if (key === "Escape") clear();
      else return; // tecla que não nos interessa: deixa o navegador agir

      // Evita, por exemplo, que Enter também "clique" no botão que está com foco
      event.preventDefault();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputDigit, inputDecimal, chooseOperator, equals, backspace, clearEntry, clear]);

  return (
    <section
      aria-label="Calculadora"
      className="w-full max-w-sm overflow-hidden rounded-2xl bg-calc-frame shadow-xl"
    >
      <Display value={display} expression={expression} />

      <div className="flex flex-col gap-px">
        {rows.map((row, index) => (
          <Row key={index}>
            {row.map((key) => (
              <Button
                key={key.id}
                label={key.label}
                ariaLabel={key.ariaLabel}
                variant={key.variant}
                onClick={key.onPress}
              />
            ))}
          </Row>
        ))}
      </div>
    </section>
  );
}
