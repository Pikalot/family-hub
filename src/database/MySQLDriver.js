import mysql from "mysql2/promise";

let pool;

if (!global._mysqlPool) {
  global._mysqlPool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
  });
}

pool = global._mysqlPool;

export const executeQuery = async (query, data) => {
  try {
    const [result] = await pool.execute(query, data);
    return result;
  } catch (error) {
    console.error("Query Error:", error.message);
    throw error;
  }
};

export const executeTransaction = async (queries) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    for (const { query, data } of queries) {
      await connection.execute(query, data);
    }
    await connection.commit();
    return { success: true };
  } catch (error) {
    await connection.rollback();
    console.error("Transaction Error:", error.message);
    return { success: false, error };
  } finally {
    connection.release();
  }
};
