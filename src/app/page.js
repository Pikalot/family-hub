import { findMemberByUsername } from "@/database/queries/Navbar/findMember";
import createRoutes from "./pages/Routing";
import PageRenderer from "./pages/PageRenderer";

export const dynamic = "force-dynamic"; // Ensure dynamic behavior on Vercel

// import Home from "@/app/pages/Home";
// import "./globals.css"

// export default function App() {
//   return (
//     <div>
//       <Home username="admin1"/>
//     </div>
//   );
// }

export default async function App({ searchParams }) {
  const username = searchParams?.user || "admin1";
  const member = await findMemberByUsername(username);
  const userId = member[0].mid;

  const routes = await createRoutes({ username, userId, member });

  return (
    <PageRenderer routes={routes} />
  )
}