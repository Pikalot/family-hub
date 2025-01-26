import { executeQuery } from "@/database/MySQLDriver";

export const getSkills = async (memberId) => {
    const query = `
        SELECT 
            S.skill,
            H.proficiency
        FROM has_skills H
        LEFT JOIN Skills S
        ON H.sid = S.sid
        WHERE H.mid = ?
        ORDER BY proficiency DESC;
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