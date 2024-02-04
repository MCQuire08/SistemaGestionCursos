import { Category } from "../types";
import { Connection, OkPacket, RowDataPacket } from 'mysql2/promise';
import DatabaseService from "./databaseService";

export const getCategorysByCourseId = async (dbService: DatabaseService, idCourse: number): Promise<Category[]> => {
    try {
        const connection: Connection = await dbService.getConnection();

        const query = 'SELECT * FROM TBL_CATEGORY TC JOIN TBL_COURSE_CATEGORY TCC ON TC.IDCategory = TCC.IDCategory WHERE TCC.IDCourse = ?';
        const [rows] = await connection.execute<RowDataPacket[]>(query, [idCourse]);

        const cartegoryList: Category[] = rows.map((row: RowDataPacket) => {
            return {
                idCategory: row.IDCategory,
                name: row.Name
            };
        });

        return cartegoryList;
    } catch (error) {
        console.error('Error al recuperar las categorias del curso:', error);
        throw error;
    }
};

export const createCourseCategory = async (dbService: DatabaseService, idCourse:number, idCategory:number): Promise<string> => {
    try{
        const connection: Connection = await dbService.getConnection();
        
        const query = 'INSERT INTO TBL_COURSE_CATEGORY (IDCourse, IDCategory) VALUES (?, ?)';

        const values = [
            idCourse,
            idCategory,
        ];

        await connection.execute<OkPacket>(query,values);

        return "Categoria asignada correctamente";
    } catch (error) {
        console.error('Error al asignar la evidencia:', error);
        throw error;
    }
};