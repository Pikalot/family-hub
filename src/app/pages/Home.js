// import Hero from "@/components/Hero";
// import Content from "@/components/Content";
// import Projects from "@/components/Projects";
import { findMemberByUsername, findMemberById } from "@/database/queries/Navbar/findMember";
// import { getSkills } from "@/database/queries/user/getSkills";
// import { getExp, getSchools } from "@/database/queries/user/GetExperience";
// import { getProjects, getResumes } from "@/database/queries/user/getProjects";
import Footer from "@/components/Footer";
import { getSocialMedia } from "@/database/queries/user/getSocialMedia";
import createRoutes from "./Routing";


export default async function Home({ username }) {
  const member = await findMemberByUsername(username);
  const userId = member[0].mid;
  // console.log(username);
  // const member = await findMemberById(userId);
  // const skills = await getSkills(userId);
  // const exp = await getExp(userId);
  // const education = await getSchools(userId);
  // const projects = await getProjects(userId);
  const github = await getSocialMedia(userId, 'GitHub');
  const facebook = await getSocialMedia(userId, 'Facebook');
  const twitter = await getSocialMedia(userId, 'Twitter');
  const linkedin = await getSocialMedia(userId, 'LinkedIn');
  // const resumes = await getResumes(userId);
  const routes = await createRoutes({ username, userId, member });
  console.log(routes);

  // const routes = [
  //   {
  //     id: "Hero",
  //     page: "Home",
  //     props: { member, resumes: resumes?.[0] },
  //     Component: Hero
  //   },
  //   {
  //     id: "Content",
  //     page: "About Me",
  //     props: { member, skills, exp, education },
  //     Component: Content
  //   },
  //   {
  //     id: "Projects",
  //     page: "Projects",
  //     props: { projects },
  //     Component: Projects
  //   }
  // ]

  return (
    <div>
      {/* <Hero member={member} resume={resumes? resumes[0] : ""}/>
        <Content member={member} skills={skills} exp={exp} education={education}/>
        <Projects projects={projects} /> */}
      {routes.length > 0 && routes.map(
        ({
          id,
          props,
          Component
        }) => (
          <section
            id={id}
            key={id}>
            <Component {...props} />
          </section>
        )
      )}
      <Footer
        member={member[0]}
        github={github ? github[0] : ''}
        facebook={facebook ? facebook[0] : ''}
        twitter={twitter ? twitter[0] : ''}
        linkedin={linkedin ? linkedin[0] : ''}
      />
    </div>
  );
}