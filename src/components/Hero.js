"use client";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Components.module.css';
import Image from 'next/image';
import fadeInVariant from '@/utilities/fadeInVariant';
import { useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faFacebookSquare,
//   faLinkedin,
//   faGithub,
//   faTwitter,
// } from "@fortawesome/free-brands-svg-icons";


export default function Hero({member}) {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  // const socialLinks = [
  //   { platform: "linkedin", url: "https://linkedin.com/in/Pikalot", color: "#0a66c2", icon: faLinkedin },
  //   { platform: "github", url: "https://github.com/Pikalot", color: "#171515", icon: faGithub },
  //   { platform: "twitter", url: null, color: "#1DA1F2", icon: faTwitter }, // Not available
  // ];
  
  

  return (
    <div className={styles.hero}>
      <div className = {styles["hero-content"]}>
        <div className={styles["dialogue-box"]}>
          <h2>Hi! You’ve found</h2>
        </div>
        <div className={styles["social-icon"]}>

          <h1>{member[0].first_name} {member[0].last_name}
            {/* {socialLinks.map(
              (social) =>
                social.url && ( // Only render if URL exists
                  <a href={social.url} key={social.platform} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={social.icon} style={{ color: social.color }} />
                  </a>
                )
            )} */}
          </h1>
        </div>

        <p>{member[0].ocupation}</p>
        <p>{member[0].description}</p>
        <div className={styles.buttons}>
          <a href="mailto:thepikalot@yahoo.com?subject=Hiring Inquiry&body=Hi, I think you might be interested in this role:">Hire Me</a>
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
