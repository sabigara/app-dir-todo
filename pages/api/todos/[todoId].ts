import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/db";
import { sleep } from "../../../lib/sleep";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!["PATCH", "DELETE"].includes(req.method!)) return res.status(409).end();

  const { todoId } = req.query;

  switch (req.method) {
    case "PATCH":
      const { title, done } = req.body;

      await sleep(1000);

      await prisma.todo.update({
        data: {
          done,
          title,
        },
        where: { id: Number(todoId) },
      });

      res.status(200).end();
      break;
    case "DELETE":
      await sleep(1000);
      await prisma.todo.delete({
        where: {
          id: Number(todoId),
        },
      });
      res.status(200).end();
      break;
  }
}
