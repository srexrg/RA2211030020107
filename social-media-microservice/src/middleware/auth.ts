import { Request, Response, NextFunction } from 'express';


export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authToken = req.headers.authorization;
  
  if (!authToken) {
    res.status(401).json({ error: 'Authentication token is required' });
    return;
  }
  
  res.locals.authToken = authToken;
  next();
};