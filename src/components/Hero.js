"use client";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Components.module.css';
import Image from 'next/image';
import fadeInVariant from '@/utilities/fadeInVariant';
import { useEffect, useMemo } from 'react';
import CherryBlossomField from './visual-effect/CherryBlossomField';
import AutumnLeaves from './visual-effect/AutumnLeaves';
import DeepStarfield from './visual-effect/DeepStarfield';
// import SummerBreeze from './visual-effect/SummerBreeze';

export default function Hero({member, resume}) {
  const control = useAnimation();
  const [ref, inView] = useInView();
  const season = new Date().getMonth();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  const showSeason = useMemo(() => {
    if (season > 1 && season <= 4) return <CherryBlossomField />;
    if (season > 7 && season <= 10) return <AutumnLeaves />;
    if (season > 10 || season <= 1) return <DeepStarfield />;
    return <></>;
  }, [season]);

  return (
    <div id="hero" className={styles.hero}>
      {/* Background effect by season */}
      {showSeason}
      <div className = {styles["hero-content"]}>
        <div className={styles["dialogue-box"]}>
          <h2>Hi! You’ve found</h2>
        </div>
        <h1>{member[0].first_name} {member[0].last_name}</h1>
        <p>{member[0].occupation}</p>
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
