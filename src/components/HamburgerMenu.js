"use client";

import { useSession } from "next-auth/react";
import React , { useState } from "react";
import NavButton from "@/ui/components/NavButton";
import LoginButton from "@/ui/components/auth/LoginButton";
import SignOutButton from "@/ui/components/auth/SignOutButton";
import styles from "@/components/Navbar.module.css";

export default function HamburgerMenu() {
    const { data: session } = useSession();
    const [ isOpen, setIsOpen ] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);

        // auto close the dropdown menu
        if (!isOpen) {
            setTimeout(() => {
                    setIsOpen(false);
                }, 3000
            ); 
        };
    }

    return (
        <div className={styles["dropdown"]}>
            <button
                tabIndex={0}
                role="button"
                className="btn btn-ghost mx-5"
                onClick={toggleDropdown}
                aria-expanded={isOpen}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-8 w-8 stroke-current"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>
            
            <ul
                tabIndex={0}
                className={`${styles["dropdown-content"]} ${isOpen ? "block" : "hidden"}`}
            >
                {/* {session && session.user ? (
                    <>
                        <li>
                            <SignOutButton className="btn btn-ghost w-full text-center text-[1em]" />
                        </li>
                        <hr className="opacity-25 my-2 border-base-content" />
                    </>
                ) : (
                    <>
                        <li>
                            <LoginButton className="btn btn-ghost w-full text-center text-[1em]" />
                        </li>
                        <hr className="opacity-25 my-2 border-base-content" />
                        <li>
                            <SignUpButton className="btn btn-ghost w-full text-center text-[1em]" />
                        </li>
                        <hr className="opacity-25 my-2 border-base-content" />
                    </>
                )} */}
                <li>
                    <NavButton page="Introduction" route="#content" className={styles["nav-button"]} />
                </li>
                <hr className="opacity-25 my-2 border-base-content" />
                <li>
                    <NavButton page="Projects" route="#content" className={styles["nav-button"]} />
                </li>
                <hr className="opacity-25 my-2 border-base-content" />
                {session && (
                    <>
                        <li>
                            <NavButton page="Account Settings" route="/account-settings" className="btn btn-ghost w-full text-center text-[1em]" />
                        </li>
                        <hr className="opacity-25 my-2 border-base-content" />
                    </>
                )}
                {session?.user?.role === "customer" && (
                    <>
                        <li>
                            <NavButton page="WishList" route={`/users/${session.user.username}/wishlist`} className="btn btn-ghost w-full text-center text-[1em]" />
                        </li>
                        <hr className="opacity-25 my-2 border-base-content" />
                    </>
                )}
                {session?.user?.role === "admin" && (
                    <>
                        <li>
                            <NavButton page="Admin User View" route="/admin/user-view" className="btn btn-ghost w-full text-center text-[1em]" />
                        </li>
                        <hr className="opacity-25 my-2 border-base-content" />
                        <li>
                            <NavButton page="Admin: Add New Game" route="/admin/add-game" className="btn btn-ghost w-full text-center text-[1em]" />
                        </li>
                        <hr className="opacity-25 my-2 border-base-content" />
                    </>
                )}
            </ul>
        </div>
    );
}
