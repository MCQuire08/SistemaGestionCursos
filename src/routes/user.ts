import express from 'express';
import * as userService from '../services/userService';
import DatabaseService from '../services/databaseService'; // Asegúrate de importar el tipo correcto para DatabaseService
import { User } from '../types';

const router = express.Router();
const dbService = new DatabaseService(); // Crea una instancia de DatabaseService con los parámetros adecuados

router.get('/', async (_req, res) => {
  try {
    // Llamar al método getUsers del módulo userService con el parámetro dbService
    const users = await userService.getUsers(dbService);

    // Enviar la respuesta como JSON con la lista de usuarios
    res.json(users);
  } catch (error) {
    // Manejar errores
    console.error('Error al recuperar usuarios:', error);
    res.status(500).json({ error: 'Error al recuperar usuarios' });
  }
});

// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    // Obtener los datos del cuerpo de la solicitud (request body)
    const { name, lastname, username, password, role, startDate, status } = req.body;

    // Crear un objeto User con los datos proporcionados
    const newUser: User = {
      idUser : 0,
      name,
      lastname,
      username,
      password,
      role,
      startDate,
      status
    };

    // Llamar al método createUser del módulo userService con los parámetros dbService y newUser
    const userId = await userService.createUser(dbService, newUser);

    // Enviar la respuesta como JSON con el ID del nuevo usuario creado
    res.json({ userId });
  } catch (error) {
    // Manejar errores
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});


export default router;
