import mysql, { Pool, PoolConnection } from 'mysql2/promise';

class DatabaseService {
  private static instance: DatabaseService;
  private connectionPool: Pool;

  public constructor() {
    const dbConfig = {
      host: '192.168.100.9',
      user: 'rquiros',
      password: 'AllMight203!',
      database: 'dbsistemagestioncursos',
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
