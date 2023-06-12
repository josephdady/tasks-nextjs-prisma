import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../src/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const relatedIds = req.body.relatedIds as { id: string }[];
    const taskId = req.body.taskId as string;
    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        relatedTo: {
          connect: relatedIds.map((relatedId) => ({ id: relatedId.id })),
        },
      },
      include: {
        assignee: true,
        viewers: true,
        relatedTo: {
          include: {
            assignee: true,
          },
        },
      },
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
