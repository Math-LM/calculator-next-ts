import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

// next/font baixa a fonte no build e serve localmente (sem requisição ao Google no navegador).
// "variable" cria a CSS variable --font-roboto, usada no @theme do globals.css.
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  // Base para URLs relativas (canonical, openGraph etc.). Troque pelo domínio real se publicar.
  metadataBase: new URL("http://localhost:3000"),
  title: "Calculadora",
  description: "Calculadora simples feita com Next.js, React e TypeScript.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={roboto.variable}>
      <body className="m-0 p-0">{children}</body>
    </html>
  );
}
