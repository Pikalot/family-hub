import { executeQuery } from "@/database/MySQLDriver";

export const getProjects = async (memberId) => {
    const query = `
        SELECT 
            P.*,
            PH.source
        FROM owns_project O
        LEFT JOIN Projects P
        ON O.pid = P.id
        LEFT JOIN Photos PH
        ON P.pid = PH.pid
        WHERE O.mid = ?;
    `;
    try {
        const result = await executeQuery(query, [memberId]); 
        if (!result.length) {
            return [];
        }
        return result; 
    } catch (error) {
        console.error("Error in getSkills:", error.message, error);
        throw error;
    }
}