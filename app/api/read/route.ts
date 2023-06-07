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
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    },
  });
}
