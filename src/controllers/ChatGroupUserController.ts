import { Request, Response } from "express";
import prisma from "../config/db.config";

interface GroupUserType {
  name: string;
  group_id: string;
}

class ChatGroupUserController {
  static async index(req: Request, res: Response): Promise<void> {
    try {
      const { group_id } = req.query;
      const users = await prisma.groupUsers.findMany({
        where: {
          group_id: group_id as string,
        },
      });

      res.json({ message: "Date fetched successfully!", data: users });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again!" });
    }
  }

  static async store(req: Request, res: Response): Promise<void> {
    try {
      const body: GroupUserType = req.body;
      const user = await prisma.groupUsers.create({
        data: body,
      });
      res.json({ message: "User created successfully!", data: user });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }
}

export default ChatGroupUserController;
