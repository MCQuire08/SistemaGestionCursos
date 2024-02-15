import express from 'express';
import * as categoryService from '../services/categoryService';
import DatabaseService from '../services/databaseService';
import { Category } from '../types';
import {authenticateToken} from '../services/authMiddleware';

const router = express.Router();
const dbService = new DatabaseService();

router.get('/', authenticateToken, async (_req, res) => {
    try {
      const categories = await categoryService.getCategories(dbService);
      res.json(categories);
    } catch (error) {
      console.error('Error al recuperar categorias:', error);
      res.status(500).json({ error: 'Error al recuperar categorias' });
    }
  });
  
  router.post('/', authenticateToken, async (req, res) => {
    try {
      const { name } = req.body;
  
      const newCategory: Category = {
        idCategory: 0,
        name
      };
  
      const categoryId = await categoryService.createCategory(dbService, newCategory);
  
      return res.json({ categoryId });
    } catch (error) {
      console.error('Error al crear la categoría:', error);
      return res.status(500).json({ error: 'Error al crear la categoría' });
    }
  });
  

export default router;