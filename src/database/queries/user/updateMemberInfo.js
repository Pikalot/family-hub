import { executeQuery } from "@/database/MySQLDriver";

/**
 * Update user details in the database.
 * @param userId User's ID
 * @param updateData Fields to update
 * @returns Boolean indicating success or failure
 */
export const updateMemberInfo = async (userId, updateData) => {
    try {
        const fields = Object.keys(updateData)
            .map((key) => `${key} = ?`)
            .join(", ");
        const values = Object.values(updateData);
        const query = `UPDATE Members SET ${fields} WHERE mid = ?`;
        // Run the query using executeQuery
        const result = await executeQuery(query, [...values, userId]);

        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error updating member info:", error);
        return false;
    }
};