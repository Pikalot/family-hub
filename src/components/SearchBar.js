// import createRoutes from "@/app/pages/Routing";
// import { adminSignedInRoutes, signedOutRoutes } from "@/app/pages/Routing";
import { useState, useEffect } from "react"

export default function SearchBar({ routes }) {
    const [keyword, setKeyword] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    // const inRoutes = adminSignedInRoutes();
    // const outRoutes = await signedOutRoutes();
    // const routes = [...inRoutes, ...outRoutes];

    /**
   * An effect that instantly shows all hardcoded routes.
   * @dependencies keyword, routes, open
   */
    useEffect(() => {
        // if (!open) return;

        // Instantly display for the hardcoded page recommendations
        const routeMatches = routes.filter((r) =>
            r.page?.toLowerCase().includes(keyword.toLowerCase())
        );
        setSuggestions(routeMatches);
    }, [keyword, routes]);
    console.log(suggestions, routes, keyword);

    function handleChanges(e) {
        setKeyword(e.target.value);
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
        <div>
            <input
                type="text"
                value={keyword}
                placeholder="Search here.."
                onChange={handleChanges}
            />
            {
                suggestions.length > 0 && (
                    <ul>
                        {suggestions.map((r, id) => (
                            <li
                                key={id}
                                onClick={() => {
                                    window.location.href = r.path;
                                }}>
                                {r.page}
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    )
}