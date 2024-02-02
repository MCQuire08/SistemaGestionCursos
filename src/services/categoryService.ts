import { Category } from "../types";
import { Connection, OkPacket, RowDataPacket} from 'mysql2/promise';
import DatabaseService from "./databaseService";

export const getCategories = async (dbService: DatabaseService): Promise<Category[]> => {
    try{
        const connection: Connection = await dbService.getConnection();

        const query = 'SELECT * FROM TBL_CATEGORY';

        const [rows] = await connection.execute<RowDataPacket[]>(query);

        const categories: Category[] = rows.map((row: RowDataPacket) => {
            return {
                idCategory: row.IDCategory,
                name: row.Name
            };
        });
        return categories;
    }catch(error){
        console.error('Error al recuperar las categorias:', error);
        throw error;
    }
} 

export const createCategory = async (dbService: DatabaseService, newCategory:Category): Promise<number> => {
    try{
        const connection: Connection = await dbService.getConnection();

        const query = 'INSERT INTO TBL_CATEGORY (Name) VALUES (?)';

        const values = [
            newCategory.name
        ];

        const [result] = await connection.execute<OkPacket>(query,values);

        return result.insertId;
    }catch (error){
        console.error('Error al crear una category:', error);
        throw error;
    }
}