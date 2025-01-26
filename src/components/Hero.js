"use client";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Components.module.css';
import Image from 'next/image';
import fadeInVariant from '@/utilities/fadeInVariant';
import { useEffect } from 'react';

export default function Hero({member, resume}) {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  return (
    <div className={styles.hero}>
      <div className = {styles["hero-content"]}>
        <div className={styles["dialogue-box"]}>
          <h2>Hi! You’ve found</h2>
        </div>
        <div className={styles["social-icon"]}>

          <h1>{member[0].first_name} {member[0].last_name}</h1>
        </div>

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
    </div>
  );
}
