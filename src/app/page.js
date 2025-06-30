// import { findMemberByUsername } from "@/database/queries/Navbar/findMember";
// import { signedOutRoutes } from "./pages/Routing";
// import PageRenderer from "./pages/(removing) PageRenderer";
// import { useContext } from "react";
// import { AuthContext } from "@/auth/WrappedAuthentication";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/AuthOptions";

export const dynamic = "force-dynamic"; // Ensure dynamic behavior on Vercel

import Home from "@/app/pages/Home";
import "./globals.css"

// export default function App() {
//   return (
//     <div>
//       <Home username="admin1"/>
//     </div>
//   );
// }

// export default async function App({ searchParams }) {
//   const session = await getServerSession(authOptions);
//   const username = searchParams?.user || session?.user?.username || "admin1";
//   console.log('page username ', !!session);
//   const member = await findMemberByUsername(username);
//   const userId = member[0].mid;

//   const routes = await signedOutRoutes({ username, userId, member });

//   return (
//     <PageRenderer routes={routes} />
//   )
// }

export default async function App(props) {
  const searchParams = await props.searchParams;
  const session = await getServerSession(authOptions);
  const username = searchParams?.user || session?.user?.username || "admin1";
  // console.log('page username ', session.user?.username);
  // const member = await findMemberByUsername(username);
  // const userId = member[0].mid;

  return (
    <div>
      <Home username={username} />
    </div>
  );
}