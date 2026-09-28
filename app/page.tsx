import Greeting from "@/modules/greeting";
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-screen bg-background font-sans">
            <main>
                <Greeting />
            </main>
    </div>
  );
}
