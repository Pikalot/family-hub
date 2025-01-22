import styles from './Components.module.css';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className = {styles["hero-content"]}>
        <h1>I am Keannu Ford</h1>
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
          src="/images/crop-portrait.png"
          alt="Keannu Ford"
          width={900}
          height={900}
          className={styles.profileImage}
        />
      </div>
    </div>
  );
}
