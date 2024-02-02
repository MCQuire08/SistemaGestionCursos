import mysql, { Pool, PoolConnection } from 'mysql2/promise';

class DatabaseService {
  private static instance: DatabaseService;
  private connectionPool: Pool;

  public constructor() {
    const dbConfig = {
      host: 'bpafipuylwkuv1oclvnw-mysql.services.clever-cloud.com',
      user: 'ujq6w3t23dmgrrtf',
      password: 'Iqj4FDxe4tNMbv03DvrZ',
      database: 'bpafipuylwkuv1oclvnw',
    };

    this.connectionPool = mysql.createPool(dbConfig);
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }

    return DatabaseService.instance;
  }

  public async getConnection(): Promise<PoolConnection> {
    const connection = await this.connectionPool.getConnection();
    return connection;
  }

  public releaseConnection(connection: PoolConnection): void {
    connection.release();
  }
}

export default DatabaseService;
