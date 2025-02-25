export const dynamic = "force-dynamic"; // Ensure dynamic behavior on Vercel

import Home from "@/app/pages/Home";
import "./globals.css"

export default function App() {
  return (
    <div>
      <Home username="admin1"/>
    </div>
  ); 
}
