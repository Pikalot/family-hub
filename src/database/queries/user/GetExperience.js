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
            return null;
        }
        return result;
    }
    catch (error) {
        console.error("Error in getExp:", error.message, error);
        throw error;
    }
}

export const getSchools = async (memberId) => {
    const query = `
        SELECT 
            S.*,
            M.name AS major,
            G.degree,
            G.grad_year,
            CAST(G.gpa AS DECIMAL(3, 2)) AS gpa
        FROM graduates_at G
        LEFT JOIN Schools S
        ON G.sid = S.sid
        LEFT JOIN Majors M
        ON G.major_id = M.id
        WHERE G.mid = ?;
    `;

    try {
        const result = await executeQuery(query, [memberId]);
        if (!result.length) {
            return null;
        }
        return result;
    }
    catch (error) {
        console.error("Error in getSchools:", error.message, error);
        throw error;
    }
}