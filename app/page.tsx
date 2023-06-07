import Chat from "./Chat";

const HomePage = async () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center p-8 tracking-widest">
      <h1 className="animate-pulse text-3xl font-bold">
        Ask any Next.js questions 🔍
      </h1>
      <span className="text-base">(knowledge updated as of Apr 2023)</span>
      <Chat />
    </main>
  );
};

export default HomePage;
