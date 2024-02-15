import express from 'express';
import * as userService from '../services/userService';
import DatabaseService from '../services/databaseService';
import { User } from '../types';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const router = express.Router();
const dbService = new DatabaseService();

router.get('/', async (_req, res) => {
  try {
    const users = await userService.getUsers(dbService);
    res.json(users);
  } catch (error) {
    console.error('Error al recuperar usuarios:', error);
    res.status(500).json({ error: 'Error al recuperar usuarios' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { name, lastname, username, password, role, startDate, status } = req.body;
    const hashedPassword = await bcrypt.hashSync(password, 12);

    const newUser: User = {
      idUser: 0,
      name,
      lastname,
      username,
      password: hashedPassword,
      role,
      startDate,
      status,
    };

    const userId = await userService.createUser(dbService, newUser);

    res.json({ userId });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userService.getUserByUsername(dbService, username);

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ userId: user.idUser }, 'your-secret-key', { expiresIn: '1h' });

    return res.json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.idUser
      },
      token: token,
    });
  } catch (error) {
    console.error('Error al realizar el inicio de sesión:', error);
    return res.status(500).json({ error: 'Error al realizar el inicio de sesión' });
  }
});


export default router;
