"use client";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Components.module.css';
import Image from 'next/image';
import fadeInVariant from '@/utilities/fadeInVariant';
import { useEffect } from 'react';
import CherryBlossomField from './visual-effect/CherryBlossomField';
import AutumnLeaves from './visual-effect/AutmnLeaves';
import DeepStarfield from './visual-effect/DeepStarfield';
import SummerBreeze from './visual-effect/SummerBreeze';

export default function Hero({member, resume}) {
  const control = useAnimation();
  const [ref, inView] = useInView();
  const season = 7; //new Date().getMonth();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  return (
    <div id="hero" className={styles.hero}>
      {/* Background effect by season */}
      {(season > 1 && season <= 4) && <CherryBlossomField />}
      {(season > 4 && season <= 7) && <SummerBreeze />} 
      {(season > 7 && season <= 10) && <AutumnLeaves />}
      {(season > 10 || season <= 1) && <DeepStarfield />}
      <div className = {styles["hero-content"]}>
        <div className={styles["dialogue-box"]}>
          <h2>Hi! You’ve found</h2>
        </div>
        <h1>{member[0].first_name} {member[0].last_name}</h1>
        <p>{member[0].ocupation}</p>
        <p>{member[0].description}</p>
        <div className={styles.buttons}>
          {resume && (
            <a href={resume.url}>Resume</a>
          )}
          {member[0].email && 
            (<a href={`mailto:${member[0]?.email}?subject=Hiring Inquiry&body=Hi, I think you might be interested in this role:`}>Hire Me</a>)
          }
          <a href="#project">Projects</a>
        </div>
      </div>

      {member[0].photo && (
        <motion.div
          className={styles["imageContainer"]}
          variants={fadeInVariant}
          initial="hidden"
          animate={control}      
          ref={ref}>
          <Image
            src={member[0].photo}
            alt={member[0].last_name}
            width={700}
            height={700}
            className={styles.profileImage}
          />
        </motion.div>
      )}
    </div>
  );
}
