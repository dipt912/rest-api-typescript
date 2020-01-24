import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../utils/httpErrors";

export const checkSearchParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    console.log(`qyery: ${req.query.q}`);
  if (!req.query.q ) {
    res.status(400);
    res.json( {error: "Missing q parameter"})
  } else {
    next();
  }
};