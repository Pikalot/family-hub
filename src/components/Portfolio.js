"use client";

import React , { useState } from "react";
import NavButton from "@/ui/components/NavButton";
import styles from "@/components/Navbar.module.css";

export default function Portfolio() {
    const [ isOpen, setIsOpen ] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);

        if (!isOpen) {
            setTimeout(() => {
                    setIsOpen(false);
                }, 3000
            ); 
        };
    };

    return (
        <div className={`${styles["dropdown"]} ${styles["portfolio-button"]} ${styles["btn-ghost"]}}`}>
            <button
                tabIndex={0}
                role="button"
                className="btn btn-ghost mx-5"
                onClick={toggleDropdown}
                aria-expanded={isOpen}
            > Portfolio
            </button>
            
            <ul
                tabIndex={0}
                className={`${styles["dropdown-content"]} ${isOpen ? "block" : "hidden"}`}
            >
                <li>
                    <NavButton page="Member A" route ="" className={styles["nav-button"]} />
                </li>
                <hr className="opacity-25 my-2 border-base-content" />
                <li>
                    <NavButton page="Member B" route ="" className={styles["nav-button"]} />
                </li>
                <hr className="opacity-25 my-2 border-base-content" />
            </ul>
        </div>
    );
}
