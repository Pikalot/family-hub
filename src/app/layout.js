import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WrappedSessionProvider from "@/auth/WrappedSessionProvider"

export const metadata = {
  title: "Family Hub",
  description: "A personal portfolio showcasing my ability to create dynamic, engaging, and family-oriented web platforms.",
  icon: '/favicon.ico?v=1',
};

export default  function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body>
        <WrappedSessionProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </WrappedSessionProvider>
      </body>
    </html>
  );
}
