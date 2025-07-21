import "./globals.css";
import Navbar from "@/components/Navbar";
import WrappedSessionProvider from "@/auth/WrappedSessionProvider"
import { findCachedMembers } from "./utilities/cachedUsers";
import WrappedAuthentication from "@/auth/WrappedAuthentication";
import { signedInRoutes, adminSignedInRoutes } from "./pages/Routing";
import { findMemberByUsername } from "@/database/queries/Navbar/findMember";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/AuthOptions";
import UserProvider from "@/components/context/UserProvider";

export const metadata = {
  title: "Family Hub",
  description: "A personal portfolio showcasing my ability to create dynamic, engaging, and family-oriented web platforms.",
  icon: '/favicon.ico?v=1',
};

export default async function RootLayout({ children }) {
  const userList = await findCachedMembers();
  const session = await getServerSession(authOptions);
  let userId = null;
  const user = session?.user || { username: "admin1" };

  let inRoutes = [];
  let adminRoutes = [];
  // if (session?.user?.username) {
  if (user?.username) {
    const username = user.username;
    const member = await findMemberByUsername(username);
    userId = member[0].mid;
    inRoutes = signedInRoutes({ username });
    adminRoutes = adminSignedInRoutes({ username });
  }

  // Value passed to context (accessible via useUser())
  const userContextValue = {
    user,
    userId,
    inRoutes,
    adminRoutes,
    userList,
  };

  return (
    <html lang="en" data-lt-installed data-theme="dark">
      <body>
        <WrappedSessionProvider>
          <WrappedAuthentication>
            <UserProvider value={ userContextValue }>
            <header>
              {/* <Navbar userList={userList} inRoutes={inRoutes} adminRoutes={adminRoutes} /> */}
              <Navbar />
            </header>
            <main>
              {children}
            </main>
            {/* <Footer /> */}
            </UserProvider>
          </WrappedAuthentication>
        </WrappedSessionProvider>
      </body>
    </html>
  );
}
