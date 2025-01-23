"use client";

import { useState } from "react";
import styles from "./Content.module.css";
import Skills from "./Skills";

export default function Content() {
  const [activeTab, setActiveTab] = useState("About Me");

  const tabContent = {
    "About Me": "This is the About Me section. Share your story here.",
    Skills: <Skills />,
    Experience: "This is the Experience section. Showcase your professional background.",
  };

  return (
    <div id="content" className={styles.content}>
      <div className={styles.tabs}>
        {Object.keys(tabContent).map((tab) => (
          <div
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className={styles["tab-content"]}>{tabContent[activeTab]}</div>
    </div>
  );
}
