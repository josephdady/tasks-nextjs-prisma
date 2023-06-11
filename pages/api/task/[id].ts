import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../src/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query as { id: string };
  try {
    const response = await prisma.task.findUnique({
      where: {
        id,
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
    if (!response) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
