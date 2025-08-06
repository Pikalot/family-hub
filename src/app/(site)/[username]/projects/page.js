import Footer from "@/components/Footer";
import { findMemberByUsername } from "@/database/queries/Navbar/findMember";
import { getSocialMedia } from "@/database/queries/user/getSocialMedia";
import { getProjects } from "@/database/queries/user/getProjects";
import ProjectPage from "@/app/pages/ProjectPage";

export default async function Project({ params }) {
  const delayedParams = await params;
  const { username } = delayedParams;
  const member = await findMemberByUsername(username);
  const userId = member[0].mid;
  const github = await getSocialMedia(userId, "GitHub");
  const facebook = await getSocialMedia(userId, "Facebook");
  const twitter = await getSocialMedia(userId, "Twitter");
  const linkedin = await getSocialMedia(userId, "LinkedIn");
  const projects = await getProjects(userId);

  return (
    <div>
      <ProjectPage projects={projects} />
      <Footer
        member={member[0]}
        github={github ? github[0] : ""}
        facebook={facebook ? facebook[0] : ""}
        twitter={twitter ? twitter[0] : ""}
        linkedin={linkedin ? linkedin[0] : ""}
      />
    </div>
  );
}
