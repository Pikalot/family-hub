import Hero from "@/components/Hero";
import Content from "@/components/Content";
import Projects from "@/components/Projects";
import { findMemberById } from "@/database/queries/Navbar/findMemberById";
import { getSkills } from "@/database/queries/user/getSkills";
import { getExp, getSchools } from "@/database/queries/user/GetExperience";
import { getProjects, getResumes } from "@/database/queries/user/getProjects";
import Footer from "@/components/Footer";
import { getSocialMedia } from "@/database/queries/user/getSocialMedia";

export default async function Home() {
  const userId = 1;
  const member = await findMemberById(userId);
  const skills = await getSkills(userId);
  const exp = await getExp(userId);
  const education = await getSchools(userId);
  const projects = await getProjects(userId);
  const github = await getSocialMedia(userId, 'GitHub');
  const facebook = await getSocialMedia(userId, 'Facebook');
  const twitter = await getSocialMedia(userId, 'Twitter');
  const linkedin = await getSocialMedia(userId, 'LinkedIn');
  const resumes = await getResumes(userId);

    return (
      <div>
        <Hero member={member} resume={resumes[0]}/>
        <Content member={member} skills={skills} exp={exp} education={education}/>
        <Projects projects={projects} />
        <Footer
          member={member[0]} 
          github={github[0]} 
          facebook={facebook[0]}
          twitter={twitter[0]}
          linkedin={linkedin[0]}
        />
      </div>
    );
  }