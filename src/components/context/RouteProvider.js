'use client';
import { RouteContext } from "./RoutesContext";

export default function RouteProvider({ value, children }) {
    return (
        <RouteContext.Provider value={value}>
            {children}
        </RouteContext.Provider>
    )
}