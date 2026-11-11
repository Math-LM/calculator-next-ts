import type { ReactNode } from "react";

type RowProps = {
  children: ReactNode;
};

// Com "jsx": "react-jsx" no tsconfig não é preciso importar React
export default function Row({ children }: RowProps) {
  return <div className="flex w-full gap-px">{children}</div>;
}
