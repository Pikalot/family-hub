import Link from "next/link";
import React from "react";
import styles from "./NavButton.module.css";

const NavButton = ({ className, route, page, onClick = () => {} }) => {
  return (
    <Link href={route}>
      <div
        className={`${styles["nav-button"]} ${styles["btn-ghost"]} ${className}`}
        onClick={(e) => {
          // e.preventDefault(); // Prevent default navigation
          onClick(); // Safely call onClick handler
        }}
      >
        {page}
      </div>
    </Link>
  );
};

export default NavButton;
