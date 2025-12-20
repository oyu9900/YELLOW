import { Controller, Post, Body } from "@nestjs/common";
import OpenAI from "openai";
import { PrismaClient } from "@prisma/client";
import { cosine } from "./cosine";
import { redis } from "../redis";

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

@Controller("api/ai/yellow-books")
export class AiController {
  @Post("search")
  async search(@Body("query") query: string) {
    const cacheKey = `ai:yb:${query}`;
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const emb = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: query,
    });

    const qVec = emb.data[0].embedding;

    const rows = await prisma.yellowBookEntry.findMany({
      where: { embedding: { not: null } },
    });

    const scored = rows
      .map(r => ({
        score: cosine(qVec, JSON.parse(r.embedding!)),
        item: r,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(s => s.item);

    await redis.setex(cacheKey, 3600, JSON.stringify(scored));
    return scored;
  }
}
