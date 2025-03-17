import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";

import { defaultGameConfig } from "@workshop/interfaces/game";

import { generateBoard } from "~/app/lib/game-generator";

const configSchema = z.object({
  size: z.number().min(2).max(10).step(2),
  delay: z.number().min(0).max(10).optional(),
});

export function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    },
  );
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const sizeQueryParam = searchParams.get("size");
  const delayQueryParam = searchParams.get("delay");

  const config = configSchema.safeParse({
    size: sizeQueryParam
      ? parseInt(sizeQueryParam, 10)
      : defaultGameConfig.boardSize,
    delay: delayQueryParam ? parseInt(delayQueryParam, 10) : 0,
  });

  if (!config.success) {
    return NextResponse.json({ error: config.error }, { status: 400 });
  }

  const { size, delay } = config.data;

  if (delay) {
    await new Promise((resolve) => setTimeout(resolve, delay * 1000));
  }

  const board = generateBoard(size);

  return NextResponse.json({ board });
}
