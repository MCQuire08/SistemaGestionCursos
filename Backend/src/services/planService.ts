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