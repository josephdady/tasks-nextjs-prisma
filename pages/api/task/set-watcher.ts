import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../src/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const viewerId = req.body.watcherId as string;
    const taskId = req.body.taskId as string;
    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        viewers: {
          connect: { id: viewerId },
        },
      },
      select: {
        viewers: true,
      },
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
