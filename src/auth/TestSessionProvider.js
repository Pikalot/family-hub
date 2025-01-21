"use client";

import { SessionProvider } from "next-auth/react";

export default function TestProvider({ children }) {
  return (
    <SessionProvider>
      <div>
        <h1>SessionProvider Test</h1>
        {children}
      </div>
    </SessionProvider>
  );
}
