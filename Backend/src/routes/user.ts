import express from 'express';
import * as userService from '../services/userService';
import DatabaseService from '../services/databaseService';
import { User } from '../types';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import {authenticateToken} from '../services/authMiddleware';

const router = express.Router();
const dbService = new DatabaseService();

router.get('/:id',authenticateToken ,async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      return res.status(400).json({ error: 'ID de usuario no válido' });
    }

    const user = await userService.getUserById(dbService, userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.json(user);
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    return res.status(500).json({ error: 'Error al obtener usuario por ID' });
  }
});

router.get('/', async (_req, res) => {
  try {
    const users = await userService.getUsers(dbService);
    res.json(users);
  } catch (error) {
    console.error('Error al recuperar usuarios:', error);
    res.status(500).json({ error: 'Error al recuperar usuarios' });
  }
});

router.post('/register', authenticateToken, async (req, res) => {
  try {
    const { name, lastname, username, password, role, status, linkImage } = req.body;
    const hashedPassword = await bcrypt.hashSync(password, 12);

    const newUser: User = {
      idUser: 0,
      name,
      lastname,
      username,
      password: hashedPassword,
      role,
      startDate:"",
      status,
      linkImage
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


    const token = jwt.sign({ userId: user.idUser }, 'fbf3efde675baf89d76b8f0a7bbbc18a27e259f30b7991586f9f96f897fee26a', { expiresIn: '1h' });

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
