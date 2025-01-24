import { executeQuery } from "@/database/MySQLDriver";

export const findAllMembers = async () => {
    const query = `
        SELECT 
            M.*,
            P.source AS photo
            FROM Members M
            LEFT JOIN Photos P ON M.pid = P.pid;
    `
    try {
        const result = await executeQuery(query, []); 
        if (!result.length) {
            throw new Error(`No member found`);
        }
        return result; // Return the first member
    } catch (error) {
        console.error("Error in findAllMembers:", error.message, error);
        throw error;
    }
}