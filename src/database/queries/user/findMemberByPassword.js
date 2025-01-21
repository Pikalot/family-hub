import executeQuery from "@/database/MySQLDriver";

// Check if a user exists in the Users table
export const findMemberByPassword = async (email, password) => {
  const query = `
    SELECT * FROM Members M 
    WHERE M.email = ? 
    AND M.password = ? 
  `;
  const data = [email, password];
  return executeQuery(query, data);
};