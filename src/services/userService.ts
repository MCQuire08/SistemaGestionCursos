import { User } from "../types";
import { Connection, OkPacket, RowDataPacket } from 'mysql2/promise';
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

export const createUser = async (dbService: DatabaseService, newUser: User): Promise<number> => {
  try {
    // Obtener la conexión desde DatabaseService
    const connection: Connection = await dbService.getConnection();
    
    // Consulta para insertar un nuevo usuario
    const query = 'INSERT INTO TBL_USER (Name, LastName, Username, Password, Role, StartDate, Status) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    // Los valores a insertar
    const values = [
      newUser.name,
      newUser.lastname,
      newUser.username,
      newUser.password,
      newUser.role,
      newUser.startDate,
      newUser.status
    ];

    // Ejecutar la consulta de inserción
    const [result] = await connection.execute<OkPacket>(query, values);

    // Devolver el ID del nuevo usuario creado
    return result.insertId;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};