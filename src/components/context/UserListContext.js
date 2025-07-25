'use client';

import { createContext, useContext } from "react";

export const UserListContext = createContext([]);

export function useList() {
    return useContext(UserListContext);
}
