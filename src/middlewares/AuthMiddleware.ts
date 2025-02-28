import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ status: 401, message: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) {
      res.status(401).json({ status: 401, message: "Unauthorized" });
      return;
    }

    req.user = user as AuthUser;
    next();
  });
};

export default authMiddleware;
