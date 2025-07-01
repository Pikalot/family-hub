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
    const { session } = useContext(AuthContext);
    const router = useRouter();

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

    useEffect(() => {
        const listener = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                if (!isFocused) inputRef.current.focus();
                else inputRef.current.blur();
            }
            if (e.key === 'Escape') {
                e.preventDefault();
                inputRef.current.blur();
            }
            if (e.key === 'Enter') {
                e.preventDefault();
                if (isFocused) handleSearch();
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

    return (
        <div className={styles["dropdown"]}>
            <input
                type="text"
                ref={inputRef}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={keyword}
                placeholder="Search here.."
                onChange={handleChanges}
            />
            {
                suggestions.length > 0 && (
                    <ul className={styles["dropdown-content"]}>
                        {suggestions.map((r, id) => (
                            <Link href={r.path} key={id}>
                                <li
                                    className={`${styles["search-item"]} ${id === selectedItem ? styles["active-btn"] : ""}`}
                                    onMouseEnter={() => setSelectedItem(id)}
                                    onClick={() => {
                                        if (r.type === "user" && onSelectMember) {
                                            const user = members.find((m) => `/${m.username}` === r.path);
                                            if (user) onSelectMember(user);
                                        }
                                        setKeyword("");
                                        setSuggestions([]);
                                        inputRef.current.blur();
                                    }}
                                >
                                    <span style={{ marginRight: "0.5rem" }}>
                                        {r.type === "user" ? "🧑‍🦰" : "📄"}
                                    </span>
                                    {r.page}
                                    <div className={styles['hidden-tab']}>
                                        {selectedItem === id && r.path}
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                )
            }
        </div >
    )
}