import Greeting from "@/modules/greeting";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black font-sans ">
      <main className="flex h-full w-full items-center justify-start px-32 sm:items-start">
       <Greeting />
      </main>
    </div>
  );
}
