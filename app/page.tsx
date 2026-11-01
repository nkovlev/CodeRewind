import Greeting from "@/modules/greeting";
import React from "react";
import Description from "@/modules/description";

export default function Home() {
  return (
    <div className="flex flex-col w-screen h-full font-sans">
            <main>
                <Greeting />
            </main>
    </div>
  );
}
