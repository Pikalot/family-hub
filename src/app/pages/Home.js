import Hero from "@/components/Hero";
import Content from "@/components/Content";
import Projects from "@/components/Projects";
import { findMemberById } from "@/database/queries/Navbar/findMemberById";
import { getSkills } from "@/database/queries/user/getSkills";
import { getExp } from "@/database/queries/user/getExp";
import { getProjects } from "@/database/queries/user/getProjects";

export default async function Home() {
  const userId = 1;
  const member = await findMemberById(userId);
  const skills = await getSkills(userId);
  const exp = await getExp(userId);
  const projects = await getProjects(userId);

    return (
      <div>
        <Hero member={member}/>
        <Content member={member} skills={skills} exp={exp}/>
        <Projects projects={projects}/>
        {/* <h1>HOME</h1> */}
      </div>
    );
  }