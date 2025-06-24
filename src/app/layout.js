import "./globals.css";
import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import WrappedSessionProvider from "@/auth/WrappedSessionProvider"
import { findAllMembers } from "@/database/queries/Navbar/findAllMembers";

export const metadata = {
  title: "Family Hub",
  description: "A personal portfolio showcasing my ability to create dynamic, engaging, and family-oriented web platforms.",
  icon: '/favicon.ico?v=1',
};

export default async function RootLayout({ children }) {
  const userList = await findAllMembers();

  return (
    <html lang="en" data-lt-installed data-theme="dark">
      <body>
        <WrappedSessionProvider>
          <header>
            <Navbar userList={userList}/>
          </header>
          <main>
            {children}
          </main>
          {/* <Footer /> */}
        </WrappedSessionProvider>
      </body>
    </html>
  );
}
