"use client";

import React , { useState } from "react";
import NavButton from "@/ui/components/NavButton";
import styles from "@/components/Navbar.module.css";

export default function Selecter({members, onSelectMember}) {
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
            > Member
            </button>
            
            <ul
                tabIndex={0}
                className={`${styles["dropdown-content"]} ${isOpen ? "block" : "hidden"}`}
            >
                {members && members.map((member, index) => (
                    <li key={index}>
                        <NavButton 
                            page={member.first_name} // Dynamically display member's first name
                            className={styles["nav-button"]}
                            route={`/${member.username}`} 
                            onClick={() => onSelectMember(member)} // Pass selected member to Navbar 
                        />
                        <hr className="opacity-25 my-2 border-base-content" />
                    </li>
                ))}
            </ul>
        </div>
    );
}
