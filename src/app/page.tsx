import { Accounts } from "@/components/sections/Accounts/Accounts";
import { Board } from "@/components/sections/Board/Board";
import { Faq } from "@/components/sections/Faq/Faq";
import { Footer } from "@/components/sections/Footer/Footer";
import { Header } from "@/components/sections/Header/Header";
import { Hero } from "@/components/sections/Hero/Hero";
import { MacSection } from "@/components/sections/MacSection/MacSection";
import { Manifesto } from "@/components/sections/Manifesto/Manifesto";
import { PhoneStory } from "@/components/sections/PhoneStory/PhoneStory";
import { Privacy } from "@/components/sections/Privacy/Privacy";
import { Waitlist } from "@/components/sections/Waitlist/Waitlist";
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
        <Accounts />
        <Manifesto />
        <Waitlist />
        <Privacy />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
