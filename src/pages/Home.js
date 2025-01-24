import Hero from "@/components/Hero";
import Content from "@/components/Content";
import Projects from "@/components/Projects";
// import { findMemberById } from "@/database/queries/Navbar/findMemberById";

export default async function Home() {
  const userId = 1;
  // const member = await findMemberById(userId);

    return (
      <div>
        {/* <Hero member={member}/> */}
        <Content />
        <Projects />
        {/* <h1>HOME</h1> */}
      </div>
    );
  }