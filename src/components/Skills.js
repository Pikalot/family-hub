import styles from "./Content.module.css";

export default function Skills() {
  const skills = [
    { name: "Photoshop", percentage: 75 },
    { name: "HTML5", percentage: 85 },
    { name: "WordPress", percentage: 70 },
    { name: "jQuery", percentage: 60 },
    { name: "CSS3", percentage: 90 },
    { name: "SEO", percentage: 80 },
  ];

  return (
    <div>
      <h2>My Skills</h2>
      {skills.map((skill) => (
        <div className={styles["skill-bar"]} key={skill.name}>
          <span className={styles["skill-bar-label"]}>{skill.name}</span>
          <div className={styles["skill-bar-track"]}>
            <div
              className={styles["skill-bar-fill"]}
              style={{ width: `${skill.percentage}%` }}
            ></div>
          </div>
          <span className={styles["skill-bar-percentage"]}>
            {skill.percentage}%
          </span>
        </div>
      ))}
    </div>
  );
}
