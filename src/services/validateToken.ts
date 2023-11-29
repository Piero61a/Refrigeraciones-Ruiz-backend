import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from "../config";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (header !== undefined && header.startsWith('Bearer')) {

    const token = header.split(' ')[1];
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      res.locals.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({
        msg: 'invalid token'
      })
    }

  } else {
    res.status(401).json({
      msg: 'Unauthorized'
    })
  }


}

export default validateToken;