import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const SECRET_KEY = 'fbf3efde675baf89d76b8f0a7bbbc18a27e259f30b7991586f9f96f897fee26a'; // Reemplaza con tu clave secreta

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      res.status(401).json({ error: 'Token no proporcionado' });
      return;
    }
  
    jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
      if (err) {
        res.status(403).json({ error: 'Token inválido' });
        return;
      }
  
      req.user = user;
      next();
    });
  };
  
  
