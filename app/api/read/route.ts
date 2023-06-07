import { NextRequest, NextResponse } from "next/server";
import { PineconeClient } from "@pinecone-database/pinecone";
import { queryPineconeVectorStoreAndQueryLLM } from "@/utils/langchain-helpers";
import { indexName } from "@/config";

export const runtime = "edge"; // 'nodejs' is the default

export async function POST(req: NextRequest) {
  const body = await req.json();
  const client = new PineconeClient(); // Create a new Pinecone client to interact with the API
  await client.init({
    apiKey: process.env.PINECONE_API_KEY || "",
    environment: process.env.PINECONE_ENVIRONMENT || "",
  });

  const stream = await queryPineconeVectorStoreAndQueryLLM(
    client,
    indexName,
    body
  );

  return new NextResponse(stream, {
    headers: {
      // "text/event-stream" is used for Server-Sent Events (SSE),
      // which is a standard allowing a web page to get updates from
      // a server over HTTP connection. This means that the server will
      // keep the connection open and send new data as it becomes available.
      "Content-Type": "text/event-stream",

      // The "no-cache" directive means that the client is allowed to cache
      // the response, but must first submit a validation request to the server
      // before using the cached data for subsequent requests. This is typically
      // used when the server wants the client to always check for newer versions
      // of the data before using the cached copy.
      "Cache-Control": "no-cache",
    },
  });
}
