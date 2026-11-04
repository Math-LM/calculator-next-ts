type InputProps = {
  value: string;
  className?: string;
};

const Input = ({
  value,
  className = "w-full p-2 bg-white border rounded text-end",
}: InputProps) => {
  return (
    <div>
      {/* O input apenas exibe o valor visualmente */}
      <input type="text" disabled value={value} className={className} />

      {/* Esta div invisível avisa o leitor de tela quando o valor mudar */}
      <div aria-live="polite" className="sr-only">
        Valor atual: {value}
      </div>
    </div>
  );
};

export default Input;
