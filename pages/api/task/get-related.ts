import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../src/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const relatedIds = req.body.id as string[];

    const tasks = await prisma.task.findMany({
      where: {
        id: {
          in: relatedIds,
        },
      },
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
