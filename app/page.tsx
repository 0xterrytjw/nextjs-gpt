import Chat from "./Chat";
import Image from "next/image";

const HomePage = async () => {
  return (
    <main className="h-screen">
      <div className="mt-72 flex flex-col items-center justify-center p-8 tracking-widest">
        <h1 className="animate-pulse text-center text-2xl font-bold md:text-3xl">
          Ask any Next.js questions{" "}
          <div className="relative top-1.5 inline-block rounded-full bg-white">
            <Image
              src="/svgs/nextjs-icon.svg"
              alt="next.js logo"
              width={30}
              height={30}
            />
          </div>
        </h1>
        <span className="mt-1 text-center text-base">
          (knowledge updated as of Apr 2023, including Next.js 13 updates)
        </span>
        <Chat />
      </div>
    </main>
  );
};

export default HomePage;
