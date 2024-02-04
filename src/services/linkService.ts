import { Link } from "../types";
import { Connection, OkPacket, RowDataPacket } from 'mysql2/promise';
import DatabaseService from "./databaseService";

export const getLinks = async (dbService: DatabaseService): Promise<Link[]> => {
    try{
        const connection: Connection = await dbService.getConnection();

        const query = 'SELECT * FROM TBL_LINK';

        const [rows] = await connection.execute<RowDataPacket[]>(query);

        const links: Link[] = rows.map((row: RowDataPacket) => {
            return {
                idLink:row.IDLink,
                description:row.Description
            };
        });
        return links;
    } catch (error){
        console.error('Error al recuperar los links:', error);
        throw error;
    }
};

export const createLink = async (dbService: DatabaseService, newLink: Link): Promise<number> => {
    try{
        const connection: Connection = await dbService.getConnection();
        
        const query = 'insert into TBL_LINK (Description) values (?)';

        const values = [
            newLink.description
        ];

        const [result] = await connection.execute<OkPacket>(query,values);
        return result.insertId;
    } catch (error) {
        console.error('Error al crear link:', error);
        throw error;
    }
};