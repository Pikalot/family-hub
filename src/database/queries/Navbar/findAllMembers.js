import { executeQuery } from "@/database/MySQLDriver";

export const findAllMembers = async () => {
    const query = `
        SELECT 
            M.username,
            M.first_name,
            M.last_name,
            P.source AS photo
        FROM Members M
        LEFT JOIN Photos P ON M.pid = P.pid;
    `
    try {
        const result = await executeQuery(query, []);
        if (!result.length) {
            throw new Error(`No member found`);
        }
        return result; // Return the first member
    } catch (error) {
        console.error("Error in findAllMembers:", error.message, error);
        throw error;
    }
}

export const findAllMembersHigherSecurity = async () => {
    const query = `
        SELECT 
            M.mid,
            M.username,
            M.first_name,
            M.last_name,
            M.email,
            M.dob,
            M.role,
            M.occupation,
            P.source AS photo
        FROM Members M
        LEFT JOIN Photos P ON M.pid = P.pid;
    `
    try {
        const result = await executeQuery(query, []);
        if (!result.length) {
            throw new Error(`No member found`);
        }
        return result; // Return the first member
    } catch (error) {
        console.error("Error in findAllMembersHigherSecurity:", error.message, error);
        throw error;
    }
}