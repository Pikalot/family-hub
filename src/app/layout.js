import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import { SessionProvider } from "next-auth/react";
// import Head from "next/head";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/auth/authOptions";
import { WrappedSessionProvider } from "@/auth/WrappedSessionProvider"
import TestProvider from "@/auth/TestSessionProvider";

export const metadata = {
  title: "Family Hub",
  description: "A personal portfolio showcasing my ability to create dynamic, engaging, and family-oriented web platforms.",
  icon: '/favicon.ico?v=1',
};

export default  function RootLayout({ children }) {
  
  return (
    <html lang="en">
      {/* <Head>
        <title>Family Hub</title>
        <meta name="description" content="A personal portfolio showcasing my ability to create dynamic, engaging, and family-oriented web platforms." />
        <link rel="icon" href="/favicon.ico?v=1" />
      </Head> */}
      <body>
        {/* <WrappedSessionProvider> */}
        {/* <TestProvider> */}
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
          {/* </TestProvider > */}
        {/* </WrappedSessionProvider> */}
      </body>
    </html>
  );
}
