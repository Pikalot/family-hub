import { executeQuery } from "@/database/MySQLDriver";

export const getProjects = async ({
  memberId,
  limit = null,
  searchQuery = "",
}) => {
  const search = searchQuery.trim();
  const params = [memberId];

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
      REGEXP_LIKE(P.name, ?, 'i') OR 
      REGEXP_LIKE(US.skills, ?, 'i')
    )`;

    params.push(fuzzyLike, fuzzyLike);
  }

  query += `ORDER BY O.owned_date DESC`;

  if (limit) {
    query += ` LIMIT ${limit}`;
  }
  query += `;`;

  try {
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

export const getProjectsByNameAndSkills = async ({ query }) => {
  if (!query) return [];

  const search = query.trim();
  const escapeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const fuzzyLike =
    "%" + escapeSearch.replace(/\s+/g, "").split("").join("%") + "%";
  const prefix = escapeSearch + "%";
  const contains = "%" + escapeSearch + "%";

  let sql = `
    SELECT 
      P.id,
      P.name,
      ANY_VALUE(M.username) AS username,
      ANY_VALUE(S.skill) AS skill
    FROM Projects P
    LEFT JOIN owns_project O 
    ON P.id = O.pid
    LEFT JOIN Members M
    ON O.mid = M.mid
    LEFT JOIN uses_skills U
    ON U.project_id = P.id
    LEFT JOIN Skills S
    ON U.skill_id = S.sid
    WHERE 
      P.name LIKE ? OR
      S.skill LIKE ?
    GROUP BY P.id
    ORDER BY
      CASE
        WHEN P.name = ? THEN 1
        WHEN P.name LIKE ? THEN 2
        WHEN P.name LIKE ? THEN 3
        ELSE 4
      END,
      CHAR_LENGTH(P.name),
      P.name,
      skill
    LIMIT 5;
  `;

  const params = [fuzzyLike, fuzzyLike, escapeSearch, prefix, contains];

  try {
    const result = await executeQuery(sql, params);
    if (!result.length) {
      return [];
    }
    return result;
  } catch (error) {
    console.error("Error in getProjectsByNameAndSkills:", error.message, error);
    throw error;
  }
};

export const getProjectById = async ({ projectId }) => {
  if (!projectId) return;
  const id = projectId.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const params = [id];

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
      WHERE P.id = ?;
  `;

  try {
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
