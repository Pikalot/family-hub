"use client";

import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/auth/WrappedAuthentication';
import styles from "./Navbar.module.css";
import Link from 'next/link';
import Image from 'next/image';
import LogoIcon from '@/public/icons/Logo.png';
import NavButton from "@/ui/components/buttons/NavButton";
import HamburgerMenu from "./HamburgerMenu";
import Selecter from './Selecter';
import SearchBar from './SearchBar';
import { usePathname } from 'next/navigation';

export default function Navbar({ userList, inRoutes, adminRoutes }) {
    const { session } = useContext(AuthContext);
    const [selectedMember, setSelectedMember] = useState(userList[0]);
    const [isShrink, setIsShrink] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const hideTimeoutRef = useState(null);
    const pathname = usePathname();
    const username = pathname.split("/")[1];

    useEffect(() => {
        if (session?.user) {
            const match = userList.find(u => u.username === session.user.username);
            if (match) setSelectedMember(match);
        }
    }, [session, userList]);

    const handleSelectMember = (member) => {
        setSelectedMember(member);
    };

    const resetVisibility = () => {
        setIsVisible(true);
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
        };
        if (window.scrollY > 100) {
            hideTimeoutRef.current = setTimeout(() => {
                setIsVisible(false);
            }, 3000);
        };
    };

    useEffect(() => {
        if (typeof window !== undefined) {
            const handleScroll = () => {
                setIsShrink(window.scrollY > 100);
                resetVisibility();
            };

            window.addEventListener("scroll", handleScroll);
            return () => {
                window.removeEventListener("scroll", handleScroll);
                clearTimeout(hideTimeoutRef.current);
            };
        }
    });

    return (
        <header
            className={`${styles["navbar"]} ${isShrink ? styles["shrink"] : ''} ${!isVisible ? styles["hidden"] : ''}`}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => resetVisibility()}
        >
            <div>
                {/* Top Header Section */}
                <div className={styles["navbar"]}>
                    {/* Logo */}
                    <div>
                        <Link href="#hero">
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
                    <div className={styles["search-bar"]}>
                        <SearchBar
                            members={userList}
                            inRoutes={inRoutes}
                            adminRoutes={adminRoutes}
                            onSelectMember={handleSelectMember}
                        />
                    </div>

                    <div className={styles["btn-panel"]}>
                        {/* Desktop Navigation */}
                        <div className={styles["btn-container"]}>
                            <NavButton page="Home" route="/" className={styles["nav-button"]} />
                            <NavButton page="About" route="#content" className={styles["nav-button"]} />
                            <NavButton page="Projects" route="#project" className={styles["nav-button"]} />
                            {session?.user?.role === "admin" && (
                                <NavButton page="Manage Member" route={`/${session?.user?.username}/view`} className={styles["nav-button"]} />
                            )}
                        </div>
                        <Selecter members={userList} onSelectMember={handleSelectMember} />
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