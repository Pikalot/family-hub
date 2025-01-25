import { executeQuery } from "@/database/MySQLDriver";

export const getExp = async(memberId) => {
    const query = `
        SELECT 
            E.*,
            W.from_date,
            W.to_date,
            W.title
        FROM works_at W
        LEFT JOIN Employers E
        ON E.eid = W.eid
        WHERE W.mid = ?;
    `;

    try {
        const result = await executeQuery(query, [memberId]);
        if (!result.length) {
            return [];
        }
        return result;
    }
    catch (error) {
        console.error("Error in getExp:", error.message, error);
        throw error;
    }
}