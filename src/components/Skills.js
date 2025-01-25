import styles from "./Content.module.css";

export default function Skills({skills}) {

  return (
    <div className={styles["skill-container"]}>
      <h2>My Skills</h2>
      {skills.map((skill) => (
        <div className={styles["skill-bar"]} key={skill.skill}>
          <span className={styles["skill-bar-label"]}>{skill.skill}</span>
          <div className={styles["skill-bar-track"]}>
            <div
              className={styles["skill-bar-fill"]}
              style={{ width: `${skill.proficiency}%` }}
            ></div>
          </div>
          <span className={styles["skill-bar-percentage"]}>
            {skill.proficiency}%
          </span>
        </div>
      ))}
    </div>
  );
}
