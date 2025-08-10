import Footer from "@/components/Footer";
import { findMemberByUsername } from "@/database/queries/Navbar/findMember";
import { getSocialMedia } from "@/database/queries/user/getSocialMedia";
import {
  getProjects,
  getProjectById,
} from "@/database/queries/user/getProjects";
import ProjectPage from "@/app/pages/ProjectPage";
import NotFound from "@/app/pages/NotFoundPage";

export default async function Project({ params, searchParams }) {
  const delayedParams = await params;
  const username = delayedParams.username;
  const delayedSearchParams = await searchParams;
  const raw = delayedSearchParams.query;
  const query = (Array.isArray(raw) ? raw[0] : raw ?? "").trim();
  const id = delayedSearchParams.id;
  const projectId = Array.isArray(id) ? id[0] : id;

  const member = await findMemberByUsername(username);
  if (!member || !member.length) {
    return <NotFound />;
  }

  const userId = member[0].mid;
  const github = await getSocialMedia(userId, "GitHub");
  const facebook = await getSocialMedia(userId, "Facebook");
  const twitter = await getSocialMedia(userId, "Twitter");
  const linkedin = await getSocialMedia(userId, "LinkedIn");

  let projects = [];

  if (projectId) {
    projects = await getProjectById({ projectId });
  } else projects = await getProjects({ memberId: userId, searchQuery: query });

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
