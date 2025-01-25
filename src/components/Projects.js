"use client"
import styles from "./Projects.module.css";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import fadeInVariant from "../utilities/fadeInVariant";
import { useEffect, useState } from "react";

export default function Project({projects}) {
  const control = useAnimation();
  const [ref, inView] = useInView();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  return (
    <section id="project" className={styles["project"]}>
      <div>
        <h1>Lastest Projects</h1>
        <motion.div
          className={styles["projects-container"]}
          variants={fadeInVariant}
          initial="hidden"
          animate={control}
          ref={ref}
          >
          {projects.map((project, index) => (
            <div key={index} className={styles["project-block"]}>
              <Image src={project.source} 
              alt={project.name} 
              width={800}
              height={800}/>
              <div className={`${styles["project-content"]} 
              ${expandedIndex === index ? styles.expanded : ""}`}
              onClick= {() => toggleExpand(index)}>
                <h3 className={styles["project-title"]}>
                  <a href={project.repository} target="_blank" rel="noopener noreferrer">{project.name}</a>
                </h3>
                <p className={styles["project-description"]}>
                  {project?.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div> 
      </div>
    </section> 
  );
}
