// import createRoutes from "@/app/pages/Routing";
import { useState, useEffect } from "react"

export default function SearchBar(props) {
    const [keyword, setKeyword] = useState("");
    // const routes = await createRoutes();

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
        <input
            type="text"
            value={keyword}
            placeholder="Search here.."
            onChange={handleChanges}
        />
    )
}