import Hero from "@/components/Hero";
import Content from "@/components/Content";
import Projects from "@/components/Projects";
import { getSkills } from "@/database/queries/user/getSkills";
import { getExp, getSchools } from "@/database/queries/user/GetExperience";
import { getProjects, getResumes } from "@/database/queries/user/getProjects";
import MemberPage from "./MemberPage";
import ClientAccountSettings from "../(site)/account-settings/ClientAccountSettings";

export async function signedOutRoutes({ username, userId, member }) {
    // const member = await findMemberByUsername(username);
    // const userId = member[0].mid;
    const skills = await getSkills(userId);
    const exp = await getExp(userId);
    const education = await getSchools(userId);
    const projects = await getProjects(userId);
    const resumes = await getResumes(userId);
    console.log('id ', member[0].first_name);

    return [
        {
            id: "Hero",
            page: `Home - ${member[0].first_name}`,
            path: `/${username}#Hero`,
            props: { member, resume: resumes?.[0] },
            Component: Hero
        },
        {
            id: "Content",
            page: `About Me - ${member[0].first_name}`,
            path: `/${username}#$Content`,
            props: { member, skills, exp, education },
            Component: Content
        },
        {
            id: "Projects",
            page: `Projects - ${member[0].first_name}`,
            path: `/${username}#Projects`,
            props: { projects },
            Component: Projects
        }
    ]
}

export function adminSignedInRoutes({ username }) {
    return [
        {
            id: "Members View",
            page: "Manage Member",
            path: `/${username}/view`,
            props: { username },
            Component: MemberPage
        },
        {
            id: "Account Settings",
            page: "Account Settings",
            path: "/account-settings",
            props: { username },
            Component: ClientAccountSettings
        }
    ]
}