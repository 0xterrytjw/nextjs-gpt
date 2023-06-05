"use client";

import React, { useState } from "react";

const Chat = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // api call to create index and embeddings
  const createIndexAndEmbeddings = async () => {
    try {
      const result = await fetch("/api/setup", {
        method: "POST",
      });
      const json = await result.json();
      console.log("result -> ", json);
    } catch (err) {
      console.log("err -> ", err);
    }
  };

  // api call to read the index and embeddings
  const sendQuery = async () => {
    if (!query) return;

    setResult("");
    setLoading(true);

    try {
      const result = await fetch("/api/read", {
        method: "POST",
        body: JSON.stringify(query),
      });
      const json = await result.json();

      setResult(json.data);
      setLoading(false);
    } catch (err) {
      console.log("err:", err);
      setLoading(false);
    }
  };
  return (
    <main className="flex w-1/2 flex-col items-center justify-between p-16">
      <input
        className="w-full rounded-2xl border-2 border-black px-4 py-1 text-black"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="ask..."
      />
      <button
        className="mb-2 mt-12 rounded-2xl bg-gray-300 px-7 py-1 text-black"
        onClick={sendQuery}
      >
        Ask AI
      </button>
      {loading && <p>Asking AI ...</p>}
      {result && <p>{result}</p>}
      {/* consider removing this button from the UI once the embeddings are created ... */}
      <button
        className="mt-2 rounded-2xl bg-gray-300 px-7 py-1 text-black"
        onClick={createIndexAndEmbeddings}
      >
        Create index and embeddings
      </button>
    </main>
  );
};

export default Chat;
