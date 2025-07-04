import "./globals.css";
import Navbar from "@/components/Navbar";
import WrappedSessionProvider from "@/auth/WrappedSessionProvider"
import { findCachedMembers } from "./utilities/cachedUsers";
import WrappedAuthentication from "@/auth/WrappedAuthentication";
import { signedInRoutes, adminSignedInRoutes } from "./pages/Routing";
import { findMemberByUsername } from "@/database/queries/Navbar/findMember";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/AuthOptions";

export const metadata = {
  title: "Family Hub",
  description: "A personal portfolio showcasing my ability to create dynamic, engaging, and family-oriented web platforms.",
  icon: '/favicon.ico?v=1',
};

export default async function RootLayout({ children }) {
  const userList = await findCachedMembers();
  const session = await getServerSession(authOptions);

  let inRoutes = [];
  let adminRoutes = [];
  if (session?.user?.username) {
    const username = session.user.username;
    const member = await findMemberByUsername(username);
    const userId = member[0].mid;
    inRoutes = signedInRoutes({ username });
    adminRoutes = adminSignedInRoutes({ username });
  }

  return (
    <html lang="en" data-lt-installed data-theme="dark">
      <body>
        <WrappedSessionProvider>
          <WrappedAuthentication>
            <header>
              <Navbar userList={userList} inRoutes={inRoutes} adminRoutes={adminRoutes} />
            </header>
            <main>
              {children}
            </main>
            {/* <Footer /> */}
          </WrappedAuthentication>
        </WrappedSessionProvider>
      </body>
    </html>
  );
}
