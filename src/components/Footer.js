// import { authOptions } from "@/nextauth/NextAuthOptions";
// import { getServerSession } from "next-auth";
import Link from "next/link";
import styles from "@/components/Components.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faLinkedin,
  faGithub,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = async () => {
    // const session = await getServerSession(authOptions);

    return (
        <footer className={styles.footer}>
            <div className={styles["footer-container"]}>
                <nav className={styles["footer-link"]}>
                    <Link href="/">
                        Home
                    </Link>
                    <Link href="">
                        About Us
                    </Link>
                    <Link href="">
                        Contact Us
                    </Link>
                </nav>

                <div className={styles["social-icon"]}>
                    <a href="https://linkedin.com/in/Pikalot">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>

                    <a href="https://github.com/Pikalot">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                </div>
            </div>

            <aside className={styles["footer-copyright"]}>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by Tuan-Anh Ho</p>
            </aside>
            
        </footer>
    );
}

export default Footer;