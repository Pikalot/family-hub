import { executeQuery } from "@/database/MySQLDriver";

export const getProjects = async (memberId, { limit = null } = {}) => {
  let query = `
        SELECT 
            P.*,
            PH.source,
            O.owned_date AS createdAt,
            skills
        FROM owns_project O
        LEFT JOIN Projects P
        ON O.pid = P.id
        LEFT JOIN Photos PH
        ON P.pid = PH.pid
        LEFT JOIN (
          SELECT
            U.project_id,
            GROUP_CONCAT(
              DISTINCT S.skill 
              ORDER BY S.skill
              SEPARATOR ', ') AS skills
            FROM uses_skills U
            LEFT JOIN Skills S
            ON U.skill_id = S.sid
            GROUP BY U.project_id
          ) AS US
          ON P.id = US.project_id
          WHERE O.mid = ?
          ORDER BY O.owned_date
    `;
  if (limit) {
    query += ` LIMIT ${limit}`;
  }
  query += `;`;

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
};

export const getResumes = async (memberId) => {
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
  } catch (error) {
    console.error("Error in getResumes:", error.message, error);
    throw error;
  }
};
