import { executeQuery } from "@/database/MySQLDriver";

export const getProjects = async ({
  memberId,
  limit = null,
  searchQuery = "",
}) => {
  const search = searchQuery.trim();
  const params = [memberId];
  console.log("params is", params);
  let query = `
    SELECT 
        P.*,
        PH.source,
        O.owned_date AS createdAt,
        US.skills
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
  `;

  if (search) {
    const escapeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const fuzzyLike = escapeSearch.replace(/\s+/g, "").split("").join(".*");

    query += `AND (
        REGEXP_LIKE(P.name, ?, 'i') OR EXISTS (
          SELECT 1
          FROM uses_skills U
          LEFT JOIN Skills S
          ON U.skill_id = S.sid
          WHERE U.project_id = P.id
          AND REGEXP_LIKE(S.skill, ?, 'i')
        )
      )
    `;
    params.push(fuzzyLike, fuzzyLike);
  }

  query += `ORDER BY O.owned_date DESC`;

  if (limit) {
    query += ` LIMIT ${limit}`;
  }
  query += `;`;

  try {
    console.log("params in try is", params);

    const result = await executeQuery(query, params);
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
