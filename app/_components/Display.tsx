type DisplayProps = {
  value: string;
  expression?: string;
};

// Antes: Input.tsx com <input disabled> + uma div sr-only para o leitor de tela.
// Agora: <output>, a tag HTML feita para "resultado de um cálculo".
// Com aria-live ela já avisa o leitor de tela quando o valor muda.
export default function Display({ value, expression = "" }: DisplayProps) {
  return (
    <div className="flex h-28 flex-col items-end justify-end bg-calc-display px-6 py-4 font-display text-calc-display-text">
      <span aria-hidden="true" className="h-5 text-sm opacity-60">
        {expression}
      </span>
      <output aria-live="polite" aria-atomic="true" className="w-full truncate text-right text-4xl">
        {value}
      </output>
    </div>
  );
}
