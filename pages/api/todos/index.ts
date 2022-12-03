import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/db";
import { sleep } from "../../../lib/sleep";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(409).end();

  const { title } = req.body;
  if (!title) return res.status(400).end();

  await sleep(1000);

  await prisma.todo.create({
    data: {
      done: false,
      title,
    },
  });

  res.status(200).end();
}
