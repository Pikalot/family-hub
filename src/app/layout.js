import "./globals.css";
import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import WrappedSessionProvider from "@/auth/WrappedSessionProvider"
import { findCachedMembers } from "./utilities/cachedUsers";
import WrappedAuthentication from "@/auth/WrappedAuthentication";
// import createRoutes from "./pages/Routing";

export const metadata = {
  title: "Family Hub",
  description: "A personal portfolio showcasing my ability to create dynamic, engaging, and family-oriented web platforms.",
  icon: '/favicon.ico?v=1',
};

export default async function RootLayout({ children }) {
  const userList = await findCachedMembers();

  return (
    <html lang="en" data-lt-installed data-theme="dark">
      <body>
        <WrappedSessionProvider>
          <WrappedAuthentication>
            <header>
              <Navbar userList={userList} />
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
