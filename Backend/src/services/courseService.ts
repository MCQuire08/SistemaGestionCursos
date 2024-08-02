import { Course } from "../types";
import { Connection, OkPacket, RowDataPacket } from 'mysql2/promise';
import DatabaseService from "./databaseService";

export const getCourses = async (dbService: DatabaseService): Promise<Course[]> => {
    try{
        const connection: Connection = await dbService.getConnection();

        const query = 'SELECT * FROM TBL_COURSE';

        const [rows] = await connection.execute<RowDataPacket[]>(query);

        const courses: Course[] = rows.map((row: RowDataPacket) => {
            return {
                idCourse: row.IDCourse,
                name:row.Name,
                description:row.Description,
                duration:row.Duration
            };
        });
        return courses;
    } catch (error){
        console.error('Error al recuperar los cursos:', error);
        throw error;
    }
};

export const createCourse = async (dbService: DatabaseService, newCourse: Course): Promise<number> => {
    try{
        const connection: Connection = await dbService.getConnection();
        
        const query = 'insert into TBL_COURSE (Name, Description, Duration) values (?,?,?)';

        const values = [
            newCourse.name,
            newCourse.description,
            newCourse.duration
        ];

        const [result] = await connection.execute<OkPacket>(query,values);
        return result.insertId;
    } catch (error) {
        console.error('Error al crear curso:', error);
        throw error;
    }
};