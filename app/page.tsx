import Image from "next/image";
import type { Metadata } from "next"
import Section from "./components/Section";


export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
}

export default function Home() {

  return (
    <main className="w-full h-screen bg-[#CACACA] flex items-center justify-center">
      <Section />
    </main>
  );
}
