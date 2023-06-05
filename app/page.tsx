import Chat from "./Chat";

const HomePage = async () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center p-8 tracking-widest">
      <h1 className="animate-pulse text-3xl font-bold">
        AI Semantic Search 🔍
      </h1>
      <Chat />
    </main>
  );
};

export default HomePage;
