import { executeQuery } from "@/database/MySQLDriver";

// General function to check if a field (email or username) exists for another user
export const checkFieldAlreadyExists = async (
    table,
    field,
    value,
) => {
    const existingCheck = await executeQuery(
        `SELECT * FROM ${table} WHERE ${field} = ?`,
        [value]
    );

    return existingCheck.length > 0;
};

