import executeQuery from "@/database/MySQLDriver";

// Check if a user exists based on email (for Google sign-in)
export const findMemberByEmail = async (email) => {
    const query = `SELECT * FROM Members WHERE email = ?;`;
    const data = [email];
    return executeQuery(query, data);
};
