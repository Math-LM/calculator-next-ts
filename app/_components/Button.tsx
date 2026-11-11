import type { ReactNode } from "react";

export type ButtonVariant = "number" | "function" | "operator" | "equals";

type ButtonProps = {
  label: ReactNode;
  ariaLabel?: string;
  variant?: ButtonVariant;
  onClick?: () => void;
  className?: string;
};

// Cada variante usa as cores definidas no @theme do globals.css.
// Trocar de paleta = trocar só o bloco @theme, sem mexer aqui.
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  number: "bg-calc-number text-calc-number-text hover:bg-calc-number-hover",
  function:
    "bg-calc-function text-calc-function-text hover:bg-calc-function-hover",
  operator:
    "bg-calc-operator text-calc-operator-text hover:bg-calc-operator-hover",
  equals: "bg-calc-equals text-calc-equals-text hover:bg-calc-equals-hover",
};

export default function Button({
  label,
  ariaLabel,
  variant = "number",
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      // className vem por ÚLTIMO para que quem usa o botão consiga sobrescrever sem "!"
      className={`flex flex-1 items-center justify-center p-5 text-2xl transition-colors focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {label}
    </button>
  );
}
