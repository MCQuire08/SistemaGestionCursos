import { Link } from "../types";
import { Connection, OkPacket, RowDataPacket } from 'mysql2/promise';
import DatabaseService from "./databaseService";

export const getLinksByCourseId = async (dbService: DatabaseService, idCourse: number): Promise<Link[]> => {
    try {
        const connection: Connection = await dbService.getConnection();

        const query = 'SELECT * FROM TBL_LINK TC JOIN TBL_COURSE_LINK TCL ON TC.IDLink = TCL.IDLink WHERE TCL.IDCourse = ?';
        const [rows] = await connection.execute<RowDataPacket[]>(query, [idCourse]);

        const linksList: Link[] = rows.map((row: RowDataPacket) => {
            return {
                idLink: row.IDLink,
                description: row.Description
            };
        });

        return linksList;
    } catch (error) {
        console.error('Error al recuperar los links del curso:', error);
        throw error;
    }
};

export const createCourseLink = async (dbService: DatabaseService, idCourse:number, idLink:number): Promise<string> => {
    try{
        const connection: Connection = await dbService.getConnection();
        
        const query = 'INSERT INTO TBL_COURSE_LINK (IDCourse, IDLink) VALUES (?, ?)';

        const values = [
            idCourse,
            idLink,
        ];

        await connection.execute<OkPacket>(query,values);

        return "Link asignada correctamente";
    } catch (error) {
        console.error('Error al asignar el link:', error);
        throw error;
    }
};