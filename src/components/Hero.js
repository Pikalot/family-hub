"use client";
import styles from './Components.module.css';
import Image from 'next/image';

export default function Hero({member}) {
  console.log('new member', member);
  console.log('Photo name is', member.first_name);

  return (
    <div className={styles.hero}>
      <div className = {styles["hero-content"]}>
        <h1>{member[0].first_name}</h1>
        <p>A Web Designer</p>
        <p>
          Far far away, behind the word mountains, far from the countries
          Vokalia and Consonantia, there live the blind texts.
        </p>
        <div className={styles.buttons}>
          <a href="#hire-me">Hire Me</a>
          <a href="#portfolio">View Portfolio</a>
        </div>
      </div>
      <div className={styles["imageContainer"]}>
        <Image
          src={member[0].photo}
          alt="Keannu Ford"
          width={700}
          height={700}
          className={styles.profileImage}
        />
      </div>
    </div>
  );
}
