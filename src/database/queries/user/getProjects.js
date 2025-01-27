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
        WHERE O.mid = ?
        ORDER BY O.owned_date
        LIMIT 4;
    `;
    try {
        const result = await executeQuery(query, [memberId]); 
        if (!result.length) {
            return [];
        }
        return result; 
    } catch (error) {
        console.error("Error in getProjects:", error.message, error);
        throw error;
    }
}

export const getResumes = async(memberId) => {
    const query = `
        SELECT R.* 
        FROM Resumes R
        WHERE R.mid = ?
        ORDER BY R.date_created DESC;
    `;

    try {
        const result = await executeQuery(query, [memberId]);
        if (!result.length) {
            return null;
        }
        return result;
    }
    catch (error) {
        console.error("Error in getResumes:", error.message, error);
        throw error;
    }
}