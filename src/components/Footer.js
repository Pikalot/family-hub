import Link from "next/link";
import styles from "@/components/Components.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = ({member, github, facebook, twitter, linkedin}) => {
    const socialLinks = [
    { platform: linkedin?.name || '', url: linkedin?.url || null, color: "#0a66c2", icon: faLinkedin },
    { platform: github?.name || '', url: github?.url || null, color: "#171515", icon: faGithub },
    { platform: twitter?.name || '', url: twitter?.url || null, color: "#1DA1F2", icon: faTwitter },
    { platform: facebook?.name || '', url: facebook?.url || null, color: "#1877F2", icon: faFacebook }
  ];
  
    return (
        <footer className={styles.footer}>
            <div className={styles["footer-container"]}>
                <nav className={styles["footer-link"]}>
                    <Link href="/">
                        Home
                    </Link>
                    <Link href="#content">
                        About Us
                    </Link>
                    <Link href={member?.email ? `mailto:${member.email}?subject=Contact Inquiry&body=Hi Tuan-Anh, `: ""}>
                        Contact Us
                    </Link>
                </nav>

                <div className={styles["social-icon"]}>
                    {socialLinks.map((social) =>
                        social.url && ( // Only render if URL exists
                        <a href={social.url} key={social.platform} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={social.icon} style={{ color: social.color }} />
                        </a>
                        )
                    )}
                </div>
            </div>

            <aside className={styles["footer-copyright"]}>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by Tuan-Anh Ho</p>
            </aside>
        </footer>
    );
}

export default Footer;