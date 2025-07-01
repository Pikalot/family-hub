import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/AuthOptions";

export const dynamic = "force-dynamic"; // Ensure dynamic behavior on Vercel

import Home from "@/app/pages/Home";
import "./globals.css"

export default async function App(props) {
  const searchParams = await props.searchParams;
  const session = await getServerSession(authOptions);
  const username = searchParams?.user || session?.user?.username || "admin1";

  return (
    <div>
      <Home username={username} />
    </div>
  );
}