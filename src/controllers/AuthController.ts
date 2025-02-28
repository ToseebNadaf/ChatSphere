import { Request, Response } from "express";
import prisma from "../config/db.config";
import jwt from "jsonwebtoken";

interface LoginPayloadType {
  name: string;
  email: string;
  oauth_id: string;
  provider: string;
  image: string;
}

class AuthController {
  static async login(request: Request, response: Response): Promise<void> {
    try {
      const body: LoginPayloadType = request.body;
      let findUser = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (!findUser) {
        findUser = await prisma.user.create({
          data: body,
        });
      }

      let JWTPayload = {
        name: body.name,
        email: body.email,
        id: findUser.id,
      };

      const token = jwt.sign(JWTPayload, process.env.JWT_SECRET || "123", {
        expiresIn: "365d",
      });

      response.json({
        message: "Login Successful",
        user: {
          ...findUser,
          token: `Bearer ${token}`,
        },
      });
    } catch (error) {
      response.status(500).json({
        message: "Something went wrong",
      });
    }
  }
}

export default AuthController;
