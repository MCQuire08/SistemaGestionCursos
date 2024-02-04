import { Evidence } from "../types";
import { Connection, OkPacket, RowDataPacket } from 'mysql2/promise';
import DatabaseService from "./databaseService";

export const getEvidences = async (dbService: DatabaseService): Promise<Evidence[]> => {
    try{
        const connection: Connection = await dbService.getConnection();

        const query = 'SELECT * FROM TBL_EVIDENCE';

        const [rows] = await connection.execute<RowDataPacket[]>(query);

        const evidences: Evidence[] = rows.map((row: RowDataPacket) => {
            return {
                idEvidence:row.IDEvidence,
                link:row.Link
            };
        });
        return evidences;
    } catch (error){
        console.error('Error al recuperar los evidencia:', error);
        throw error;
    }
};

export const createEvidence = async (dbService: DatabaseService, newEvidence: Evidence): Promise<number> => {
    try{
        const connection: Connection = await dbService.getConnection();
        
        const query = 'insert into TBL_EVIDENCE (Link) values (?)';

        const values = [
            newEvidence.link
        ];

        const [result] = await connection.execute<OkPacket>(query,values);
        return result.insertId;
    } catch (error) {
        console.error('Error al crear la evidencia:', error);
        throw error;
    }
};