import Link from 'next/link';
import React from 'react'
import styles from './NavButton.module.css';

const NavButton = ({ className, route, page }) => {
    return (
        <Link
            className={`${styles["nav-button"]} ${styles["btn-ghost"]} ${className}`}
            href={route}
        >
            {page}
        </Link>
    );
}

export default NavButton