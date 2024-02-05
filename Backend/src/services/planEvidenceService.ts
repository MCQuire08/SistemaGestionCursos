import { Evidence } from '../types';
import { Connection, OkPacket, RowDataPacket } from 'mysql2/promise';
import DatabaseService from "./databaseService";

export const getEvidenceByPlanId = async (dbService: DatabaseService, idPlan: number): Promise<Evidence[]> => {
    try {
        const connection: Connection = await dbService.getConnection();

        const query = 'SELECT TE.* FROM TBL_EVIDENCE TE JOIN TBL_PLAN_EVIDENCE TPE ON TE.IDEvidence = TPE.IDEvidence WHERE TPE.IDPlan = ?';
        const [rows] = await connection.execute<RowDataPacket[]>(query, [idPlan]);

        const evidenceList: Evidence[] = rows.map((row: RowDataPacket) => {
            return {
                idEvidence: row.IDEvidence,
                link: row.Link
            };
        });

        return evidenceList;
    } catch (error) {
        console.error('Error al recuperar las evidencias por ID de plan:', error);
        throw error;
    }
};

export const createPlanEvidence = async (dbService: DatabaseService, idPlan:number, idEvidence:number): Promise<string> => {
    try{
        const connection: Connection = await dbService.getConnection();
        
        const query = 'INSERT INTO TBL_PLAN_EVIDENCE (IDPlan, IDEvidence) VALUES (?, ?)';

        const values = [
            idPlan,
            idEvidence,
        ];

        await connection.execute<OkPacket>(query,values);

        return "Evidencia guardada correctamente";
    } catch (error) {
        console.error('Error al asignar la evidencia:', error);
        throw error;
    }
};