'use client';
import { createContext, useContext } from "react";

export const RouteContext = createContext();

export function useRoute() {
    return useContext(RouteContext);
}