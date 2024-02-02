import express from 'express';
import * as userService from '../services/userService';
import DatabaseService from '../services/databaseService'; // Asegúrate de importar el tipo correcto para DatabaseService

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

export default router;
