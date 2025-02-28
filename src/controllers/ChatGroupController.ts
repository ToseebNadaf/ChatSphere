import { Request, Response } from "express";
import prisma from "../config/db.config";

class ChatGroupController {
  static async index(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user;
      const groups = await prisma.chatGroup.findMany({
        where: {
          user_id: user!.id,
        },
        orderBy: {
          created_at: "desc",
        },
      });
      res.json({ data: groups });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again!" });
    }
  }

  static async show(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (id) {
        const group = await prisma.chatGroup.findUnique({
          where: {
            id: id,
          },
        });
        res.json({ data: group });
      }

      res.status(404).json({ message: "No groups found" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again!" });
    }
  }

  static async store(req: Request, res: Response): Promise<void> {
    try {
      const body = req.body;
      const user = req.user;
      await prisma.chatGroup.create({
        data: {
          title: body?.title,
          passcode: body?.passcode,
          user_id: user!.id,
        },
      });

      res.json({ message: "Chat Group created successfully!" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again!" });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const body = req.body;
      if (id) {
        await prisma.chatGroup.update({
          data: body,
          where: {
            id: id,
          },
        });
        res.json({ message: "Group updated successfully!" });
      }

      res.status(404).json({ message: "No groups found" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again!" });
    }
  }

  static async destroy(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await prisma.chatGroup.delete({
        where: {
          id: id,
        },
      });
      res.json({ message: "Chat Deleted successfully!" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again!" });
    }
  }
}

export default ChatGroupController;
