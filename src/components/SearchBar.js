// import createRoutes from "@/app/pages/Routing";
// import { adminSignedInRoutes, signedOutRoutes } from "@/app/pages/Routing";
import { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";
import NavButton from "@/ui/components/buttons/NavButton";

export default function SearchBar({ inRoutes, adminRoutes, outRoutes }) {
    const inputRef = useRef(null);
    const [keyword, setKeyword] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedItem, setSelectedItem] = useState(0);
    // const inRoutes = adminSignedInRoutes();
    // const outRoutes = await signedOutRoutes();
    // const routes = [...inRoutes, ...outRoutes, ...adminRoutes];
    const routes = [...inRoutes, ...adminRoutes];
    console.log(inRoutes);
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    /**
   * An effect that instantly shows all hardcoded routes.
   * @dependencies keyword, routes, open
   */
    useEffect(() => {
        // if (!open) return;

        // Instantly display for the hardcoded page recommendations
        if (keyword === "") {
            setSuggestions([]);
        }
        else {
            const routeMatches = routes.filter((r) =>
                r.page?.toLowerCase().includes(keyword.toLowerCase())
            );
            setSuggestions(routeMatches);
        }
    }, [keyword]);
    // console.log(suggestions, routes, keyword);

    function handleChanges(e) {
        setKeyword(e.target.value);
        setSelectedItem(0);
    }

    function handleSearch() {
        alert(keyword);
    }

    useEffect(() => {
        const listener = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
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
                value={keyword}
                placeholder="Search here.."
                onChange={handleChanges}
            />
            {
                suggestions.length > 0 && (
                    <ul className={styles["dropdown-content"]}>
                        {suggestions.map((r, id) => (
                            <li key={id}>
                                <NavButton
                                    // className={styles["nav-button"]}
                                    page={r.page}
                                    route={r.path}
                                    onClick={() => {
                                        window.location.href = r.path;
                                    }} >
                                    {/* {r.page} */}
                                </NavButton>
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    )
}