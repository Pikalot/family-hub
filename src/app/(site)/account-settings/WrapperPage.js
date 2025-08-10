"use client";

import React, { useState, useMemo } from "react";
import ClientAccountSettings from "./ClientAccountSettings";
import styles from "./AccountSetting.module.css";
import changeSeason from "@/app/utilities/changeSeason";

export default function WrapperPage() {
  const [isEditing, setIsEditing] = useState(false);
  const season = new Date().getMonth();
  const showSeason = useMemo(() => {
    return changeSeason({ season });
  }, [season]);

  return (
    <div className={styles["content"]}>
      {/* Background seasonal effect */}
      <div className={styles["season-wrapper"]}>{showSeason}</div>

      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          className="px-6 py-3 w-[12em] bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Edit User Account
        </button>
      ) : (
        <div className="flex flex-col rounded-lg w-full items-center">
          <button
            onClick={() => setIsEditing(false)}
            className="w-[12em] px-4 py-3 bg-red-500 text-white rounded-lg mb-4 hover:bg-red-600 transition"
          >
            Close
          </button>
          <div className="w-full h-[3px] bg-gray-300 opacity-25 mb-4"></div>
          <ClientAccountSettings />
        </div>
      )}
    </div>
  );
}
