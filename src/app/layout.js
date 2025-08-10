import "./globals.css";
import Navbar from "@/components/Navbar";
import WrappedSessionProvider from "@/auth/WrappedSessionProvider";
import { findCachedMembers } from "./utilities/cachedUsers";
import WrappedAuthentication from "@/auth/WrappedAuthentication";
import { signedInRoutes, adminSignedInRoutes } from "./pages/Routing";
import { findMemberByUsername } from "@/database/queries/Navbar/findMember";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/AuthOptions";
import UserProvider from "@/components/context/UserProvider";
import RouteProvider from "@/components/context/RouteProvider";
import UserListProvider from "@/components/context/UserListProvider";
import NotFound from "./pages/NotFoundPage";

export const metadata = {
  title: "Family Hub",
  description:
    "A personal portfolio showcasing my ability to create dynamic, engaging, and family-oriented web platforms.",
  icon: "/favicon.ico?v=1",
};

export default async function RootLayout({ children }) {
  const userList = await findCachedMembers();
  const session = await getServerSession(authOptions);
  let userId = null;
  const user = session?.user || { username: "admin1" };

  let inRoutes = [];
  let adminRoutes = [];

  if (!user) {
    return <NotFound />;
  }

  const username = user.username;
  const member = await findMemberByUsername(username);
  if (!member || !member.length) {
    return <NotFound />;
  }

  userId = member[0].mid;
  inRoutes = signedInRoutes({ username });
  adminRoutes = adminSignedInRoutes({ username });

  // Value passed to context (accessible via useUser())
  const userContextValue = {
    user,
    userId,
  };

  const routeContextValue = {
    inRoutes,
    adminRoutes,
  };

  return (
    <html lang="en" data-lt-installed data-theme="dark">
      <body>
        <WrappedSessionProvider>
          <WrappedAuthentication>
            <UserListProvider value={userList}>
              <UserProvider value={userContextValue}>
                <RouteProvider value={routeContextValue}>
                  <header>
                    <Navbar />
                  </header>
                  <main>{children}</main>
                </RouteProvider>
              </UserProvider>
            </UserListProvider>
          </WrappedAuthentication>
        </WrappedSessionProvider>
      </body>
    </html>
  );
}
