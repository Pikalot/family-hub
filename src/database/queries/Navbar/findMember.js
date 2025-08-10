import { executeQuery } from "@/database/MySQLDriver";

export const findMemberById = async (mid) => {
  const query = `
        SELECT 
            M.*,
            P.source AS photo
        FROM Members M
        LEFT JOIN Photos P
        ON P.pid = M.pid
        WHERE mid = ?;
    `;
  try {
    const result = await executeQuery(query, [mid]);
    if (!result.length) {
      throw new Error(`No member found with id ${mid}`);
    }

    return result; // Return the first member
  } catch (error) {
    console.error("Error in findMemberById:", error.message, error);
    throw error;
  }
};

export const findMemberByUsername = async (username) => {
  const query = `
        SELECT 
            M.*,
            P.source AS photo
        FROM Members M
        LEFT JOIN Photos P
        ON P.pid = M.pid
        WHERE username = ?;
    `;
  try {
    const result = await executeQuery(query, [username]);

    return result; // Return the first member
  } catch (error) {
    console.error("Error in findMemberByUsername:", error.message, error);
    throw error;
  }
};
