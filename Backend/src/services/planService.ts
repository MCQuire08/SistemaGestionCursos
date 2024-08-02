import { Plan } from "../types";
import { Connection, OkPacket, RowDataPacket } from 'mysql2/promise';
import DatabaseService from "./databaseService";

export const getPlans = async (dbService: DatabaseService): Promise<Plan[]> => {
    try{
        const connection: Connection = await dbService.getConnection();

        const query = 'SELECT * FROM TBL_PLAN';

        const [rows] = await connection.execute<RowDataPacket[]>(query);

        const plans: Plan[] = rows.map((row: RowDataPacket) => {
            return {
                idPlan:row.IDPlan,
                idCourse:row.IDCourse,
                idUser:row.IDUser,
                progress:row.Progress
            };
        });
        return plans;
    } catch (error){
        console.error('Error al recuperar los plans:', error);
        throw error;
    }
};

export const updateProgress = async (dbService: DatabaseService, planId: number, newProgress: number): Promise<void> => {
    try {
        const connection: Connection = await dbService.getConnection();

        const updateQuery = 'UPDATE TBL_PLAN SET Progress = ? WHERE IDCourse = ?';

        await connection.execute(updateQuery, [newProgress, planId]);

    } catch (error) {
        console.error('Error al actualizar el progreso del plan:', error);
        throw error;
    }
};


export const createPlan = async (dbService: DatabaseService, newPlan: Plan): Promise<number> => {
    try{
        const connection: Connection = await dbService.getConnection();
        
        const query = 'insert into TBL_COURSE (Name, Description, Duration) values (?,?,?)';

        const values = [
            newPlan.idCourse,
            newPlan.idPlan,
            newPlan.idUser,
            newPlan.progress
        ];

        const [result] = await connection.execute<OkPacket>(query,values);
        return result.insertId;
    } catch (error) {
        console.error('Error al crear curso:', error);
        throw error;
    }
};

export const getUserPlans = async (dbService: DatabaseService, userId: string): Promise<any[]> => {
    try {
        const connection: Connection = await dbService.getConnection();

        const query = `
            SELECT
                c.IDCourse,
                c.Name AS CourseName,
                c.Description AS CourseDescription,
                c.Duration AS CourseDuration,
                cat.Name AS CategoryName,
                l.Description AS LinkDescription,
                u.IDUser,
                p.Progress
            FROM
                tbl_course c
            JOIN tbl_course_category cc ON c.IDCourse = cc.IDCourse
            JOIN tbl_category cat ON cc.IDCategory = cat.IDCategory
            JOIN tbl_course_link cl ON c.IDCourse = cl.IDCourse
            JOIN tbl_link l ON cl.IDLink = l.IDLink
            JOIN tbl_plan p ON c.IDCourse = p.IDCourse
            JOIN tbl_user u ON p.IDUser = u.IDUser
            WHERE
                u.IDUser = ?;
        `;

        const [rows] = await connection.execute<RowDataPacket[]>(query, [userId]);

        return rows;
    } catch (error) {
        console.error('Error al recuperar los planes del usuario:', error);
        throw error;
    }
};
