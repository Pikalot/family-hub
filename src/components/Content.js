"use client";
import { useState } from "react";
import styles from "./Content.module.css";
import Skills from "./Skills";
import Experience from "./Experience";

export default function Content({member, skills, exp, education}) {
  const [activeTab, setActiveTab] = useState("About Me");
  const tabContent = {
    "About Me": member[0].description,
    Skills: <Skills skills={skills} />,
    Experience: <Experience member={member} exp={exp} education={education}/>,
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
