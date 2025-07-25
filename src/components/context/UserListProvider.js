'use client';

import { UserListContext } from "./UserListContext";

export default function UserListProvider({ value, children }) {
    return (
        <UserListContext.Provider value={value}>
            {children}
        </UserListContext.Provider>
    )
}