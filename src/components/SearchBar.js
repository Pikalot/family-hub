import { useState, useEffect, useRef, useMemo, useContext } from "react";
import styles from "./Navbar.module.css";
import { AuthContext } from "@/auth/WrappedAuthentication";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SearchBar({ members, inRoutes, adminRoutes, onSelectMember }) {
    const inputRef = useRef(null);
    const [keyword, setKeyword] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedItem, setSelectedItem] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const { session } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 480) {
                setIsOpen(false);
            }
            else {
                setIsOpen(true);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    },[])

    const routes = useMemo(() => {
        if (session?.user.role === 'admin')
            return [...inRoutes, ...adminRoutes];
        return [...inRoutes]
    }, [session?.user.role, inRoutes, adminRoutes]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    /**
     * An effect that instantly shows all hardcoded routes.
     * @dependencies keyword, routes, open
     */
    useEffect(() => {
        if (!isFocused) return;

        // Instantly display for the hardcoded page recommendations
        if (keyword === "") {
            setSuggestions([]);
        }
        else {
            const searchKey = keyword.toLowerCase();
            const routeMatches = routes.filter((r) =>
                r.page?.toLowerCase().includes(searchKey)
            );
            const userMatches = members.filter((m) =>
                m.first_name?.toLowerCase().includes(searchKey) ||
                m.last_name?.toLowerCase().includes(searchKey) ||
                m.username?.toLowerCase().includes(searchKey)
            ).map((m) => ({
                page: `${m.first_name} ${m.last_name}`,
                path: `/${m.username}`,
                type: 'user'
            }));
            setSuggestions([...userMatches, ...routeMatches]);
        }
    }, [keyword, isFocused, routes, members]);

    function handleChanges(e) {
        setKeyword(e.target.value);
        setSelectedItem(0);
    }

    function handleSearch() {
        const target = suggestions[selectedItem];
        if (!target) return;

        if (target?.type === "user" && onSelectMember) {
            const user = members.find((m) => `/${m.username}` === target.path);
            if (user) onSelectMember(user);
        }

        router.push(target.path);
        setKeyword("");             // clear input
        setSuggestions([]);         // hide dropdown
        inputRef.current?.blur();
    }

    /**
     * Function handles key input
     */ 
    useEffect(() => {
        const listener = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                if (!isFocused) inputRef.current.focus();
                else {
                    inputRef.current.blur();
                    resetSearch();
                }
            }
            if (e.key === 'Escape') {
                e.preventDefault();
                inputRef.current.blur();
                resetSearch();
            }
            if (e.key === 'Enter') {
                e.preventDefault();
                if (isFocused) {
                    handleSearch();
                    resetSearch();
                }
            }
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (suggestions.length > 0) {
                    setSelectedItem(prev => Math.min(prev + 1, suggestions.length - 1));
                }
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedItem(prev => Math.max(prev - 1, 0))
            }
        };

        window.addEventListener('keydown', listener);
        return () => window.removeEventListener('keydown', listener);
    })

    /**
     * Function handles mouse click
     */ 
    useEffect(() => {
        function clickOut(e) {
            if (inputRef.current && !inputRef.current?.contains(e.target)) {
                resetSearch();
            }
        };
        window.addEventListener('mousedown', clickOut);
        
        return () => {
            window.removeEventListener('mousedown', clickOut);
        };
    }, [resetSearch]);

    /**
     * Component renders suggestions
     * @returns a component
     */
    function SuggestionsList() {
        if (suggestions.length === 0) return <></>;
        return (
            <ul className={styles["dropdown-content"]}>
                {suggestions.map((r, id) => (
                    <Link href={r.path} key={r.path}>
                        <li
                            className={`${styles["search-item"]} ${id === selectedItem ? styles["active-btn"] : ""}`}
                            onMouseEnter={() => setSelectedItem(id)}
                            onClick={() => {
                                if (r.type === "user" && onSelectMember) {
                                    const user = members.find((m) => `/${m.username}` === r.path);
                                    if (user) onSelectMember(user);
                                }
                                resetSearch();
                                inputRef.current.blur();
                            }}
                        >
                            <span style={{ marginRight: "0.5rem" }}>
                                {r.type === "user" ? "🧑‍🦰" : "📄"}
                            </span>
                            {r.page}
                            <div className={styles['hidden-tab']}>
                                {selectedItem === id && `${window.location.origin}${r.path}`}
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        )
    }

    function resetSearch() {
        setKeyword("");
        setSuggestions([]);
        if (window.innerWidth <= 480) setIsOpen(false);
    }

    return (
        <div className={styles["dropdown"]}>
            {isOpen ? (
                <input
                type="text"
                ref={inputRef}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={keyword}
                placeholder="Search here.."
                onChange={handleChanges}
            />
            ) : (
                <button
                onClick={() => {
                    setIsOpen(true);
                    setTimeout(() => inputRef.current?.focus(), 100);
                }}
                className={styles["search-icon"]}
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="28"
                    height="28"
                    >
                        <circle cx="11" cy="11" r="6" stroke="#ccc" strokeWidth="2" fill="white" />
                        <line x1="15.5" y1="15.5" x2="21" y2="21" stroke="#ccc" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                </button>
            )}
            <SuggestionsList />
        </div >
    )
}