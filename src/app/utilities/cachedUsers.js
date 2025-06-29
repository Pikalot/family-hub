import { findAllMembers } from "@/database/queries/Navbar/findAllMembers";

let cachedUsers = null;

export async function findCachedMembers() {
    if (cachedUsers) return cachedUsers;
    const users = await findAllMembers();
    cachedUsers = users;
    return users;
}

export function clearCachedMembers() {
    cachedUsers = null;
}