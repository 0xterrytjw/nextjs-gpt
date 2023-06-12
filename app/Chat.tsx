"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";
import htmlParse from "html-react-parser";
import { formatURLs } from "@/utils";
import Link from "next/link";

const Chat = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const isDisabled = !query || loading;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    sendQuery();
  };

  // api call to read the index and embeddings
  const sendQuery = async () => {
    if (!query) return;

    setResult("");
    setLoading(true);

    try {
      const res = await fetch("/api/read", {
        method: "POST",
        body: JSON.stringify(query),
      });

      setLoading(false);

      const stream = res.body;
      const reader = stream?.getReader();

      try {
        while (true) {
          // @ts-ignore
          const { done, value } = await reader.read();
          if (done) {
            break;
          }

          const decodedValue = new TextDecoder().decode(value);
          setResult((prev) => prev + decodedValue);
        }
      } catch (error) {
        console.error(error);
      }
    } catch (err) {
      console.log("err:", err);
      setLoading(false);
    }
  };
  return (
    <main className="mt-8 flex w-full flex-col items-center justify-between md:w-1/2">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center"
      >
        <input
          className="w-full rounded-2xl border-2 border-black px-4 py-1 text-black transition-all dark:text-white"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask away ~"
        />
        <Button
          className="mb-2 mt-8 rounded-2xl bg-gray-300 px-7 py-1 font-bold text-black hover:text-white"
          onClick={sendQuery}
          disabled={isDisabled}
          type="submit"
        >
          {loading ? <Loading /> : <p>Ask AI</p>}
        </Button>
      </form>

      {result && (
        <div className="mt-8 rounded border border-gray-300 p-4 italic">
          {/* <a className="text-blue-500 underline transition-all hover:text-blue-400">
            hello
          </a> */}
          {result && htmlParse(formatURLs(result))}
        </div>
      )}
    </main>
  );
};

export default Chat;
