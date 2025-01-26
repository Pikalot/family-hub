"use client";

import { useState, useEffect } from 'react';
import styles from "./Navbar.module.css";
import Link from 'next/link';
import Image from 'next/image';
import LogoIcon from '@/public/icons/Logo.png';
import NavButton from "@/ui/components/NavButton";
import HamburgerMenu from "./HamburgerMenu";
// import Portfolio from "./Portfolio";

export default function Navbar({ userList }) {
    const [selectedMember, setSelectedMember] = useState(userList[0]);
    const [isShrink, setIsShrink] = useState(false);
    
    // const handleSelectMember = (member) => {
    //     setSelectedMember(member);
    // }

    useEffect(() => {
        if (typeof window !== undefined) {
            window.addEventListener("scroll", () =>
                setIsShrink(window.scrollY > 100));
        }
    }, [])

    return (
        <header className={`${styles["navbar"]} ${isShrink ? styles["shrink"] : ''}`}>
            <div>
                {/* Top Header Section */}
                <div className={styles["navbar"]}>
                    {/* Logo */}
                    <div>
                        <Link href='/'>
                            <div className={styles["logo"]}>
                                <Image
                                    src={LogoIcon}
                                    alt="Game Trees Logo"
                                    width={500}
                                    height={500}
                                    quality={100}
                                    className="rounded-full object-cover"
                                    priority
                                />
                                <div className={styles["text-container"]}>
                                    <p> {selectedMember.first_name} </p>
                                    <p> {selectedMember.last_name} </p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Search Bar */}
                    {/* <div className="hidden min-[1200px]:flex flex-1 mx-4 max-w-full">
                        <SearchBar actionUrl={""} />
                    </div> */}

                    <div className={styles["btn-panel"]}>
                        {/* Desktop Navigation */}
                        <div className={styles["btn-container"]}>
                            <NavButton page="Home" route="/" className={styles["nav-button"]} />
                            <NavButton page="About" route="#content" className={styles["nav-button"]} />
                            <NavButton page="Projects" route="#project" className={styles["nav-button"]} />
                        </div>

                        {/* Hamburger Menu Button (Client-Side Dropdown) */}
                        <HamburgerMenu />
                    </div>

                </div>

                {/* Search Bar (Visible Only on Mobile) */}
                {/* <div className="block min-[1200px]:hidden w-full px-4 pt-1 pb-8 text-[1em]">
                    <SearchBar actionUrl={""} />
                </div> */}
            </div>
        </header >
    );
}