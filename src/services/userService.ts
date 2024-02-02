import { User } from "../types";
import { Connection, RowDataPacket } from 'mysql2/promise';
import DatabaseService from "./databaseService";

export const getUsers = async (dbService: DatabaseService): Promise<User[]> => {
  try {
    // Obtener la conexión desde DatabaseService
    const connection: Connection = await dbService.getConnection();
    
    // Consulta para seleccionar todos los usuarios
    const query = 'SELECT * FROM TBL_USER'; // Reemplaza 'users' con el nombre real de tu tabla de usuarios

    // Ejecutar la consulta
    const [rows] = await connection.execute<RowDataPacket[]>(query);

    // Mapear los resultados a objetos User
    const users: User[] = rows.map((row: RowDataPacket) => {
      return {
        idUser: row.IDUser,
        name: row.Name,
        lastname: row.LastName,
        username: row.Username,
        password: row.Password,
        role: row.Role,
        startDate: row.StartDate,
        status: row.Status
      };
    });
    return users;
  } catch (error) {
    console.error('Error al recuperar usuarios:', error);
    throw error;
  }
};
