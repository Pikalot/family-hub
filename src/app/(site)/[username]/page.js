import Home from "@/app/pages/Home";
import "@/app/globals.css"

export default async function MemberPage({ params }) {
    const delayedParams = await params;
    const { username } = delayedParams;

    return (
        <div>
            <Home username={username} />
        </div>
    )
}