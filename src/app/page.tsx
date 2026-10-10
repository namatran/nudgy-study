import { Header } from "@/components/sections/Header/Header";
import { Board } from "@/components/sections/Board/Board";
import { Hero } from "@/components/sections/Hero/Hero";
import { MacSection } from "@/components/sections/MacSection/MacSection";
import { PhoneStory } from "@/components/sections/PhoneStory/PhoneStory";
import { WhatItDoes } from "@/components/sections/WhatItDoes/WhatItDoes";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <main>
        <WhatItDoes />
        <PhoneStory />
        <MacSection />
        <Board />
      </main>
    </>
  );
}
