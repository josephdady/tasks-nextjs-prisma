import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../src/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const task = await prisma.task.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        assigneeId: req.body.assigneeId,
        relatedTo: {
          connect: req.body.relatedTo?.map((relatedId) => ({ id: relatedId })),
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
