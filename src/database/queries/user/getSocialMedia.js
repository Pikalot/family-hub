import { executeQuery } from "@/database/MySQLDriver";

export const getSocialMedia = async (memberId, media) => {
    const query = `
        SELECT *
        FROM Personal_URLs
        WHERE mid = ? AND name LIKE CONCAT('%', ?, '%');
    `;
    try {
        const result = await executeQuery(query, [memberId, media]); 
        if (!result.length) {
            return [];
        }
        return result; 
    } catch (error) {
        console.error("Error in getSocialMedia:", error.message, error);
        throw error;
    }
}