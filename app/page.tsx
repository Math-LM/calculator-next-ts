import type { Metadata } from "next";
import Calculator from "./_components/Calculator";

// Funciona porque o layout define metadataBase (sem ele, canonical relativo quebra o build)
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

// Server Component: não precisa de "use client"
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-300 p-4">
      {/* Toda página deveria ter um h1. sr-only = invisível na tela, visível para Google e leitores de tela */}
      <h1 className="sr-only">Calculadora</h1>
      <Calculator />
    </main>
  );
}
