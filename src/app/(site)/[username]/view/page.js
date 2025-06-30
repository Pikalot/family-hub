import { findAllMembersHigherSecurity } from "@/database/queries/Navbar/findAllMembers";
import MemberPage from "@/app/pages/MemberPage";
import Footer from "@/components/Footer";
import { findMemberByUsername } from "@/database/queries/Navbar/findMember";
import { getSocialMedia } from "@/database/queries/user/getSocialMedia";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/AuthOptions";
import { redirect } from 'next/navigation';

export default async function ViewPage({ params }) {
    const session = await getServerSession(authOptions);

    // Access control
    if (!session || session.user.role !== "admin") {
        redirect('/notfound');
    }

    const delayedParams = await params;
    const { username } = delayedParams;
    const member = await findMemberByUsername(username);
    const userId = member[0].mid;
    const github = await getSocialMedia(userId, 'GitHub');
    const facebook = await getSocialMedia(userId, 'Facebook');
    const twitter = await getSocialMedia(userId, 'Twitter');
    const linkedin = await getSocialMedia(userId, 'LinkedIn');
    const members = await findAllMembersHigherSecurity();
    // console.log("in view: ", members);

    return (
        <div>
            <MemberPage members={members} />
            <Footer
                member={member[0]}
                github={github ? github[0] : ''}
                facebook={facebook ? facebook[0] : ''}
                twitter={twitter ? twitter[0] : ''}
                linkedin={linkedin ? linkedin[0] : ''}
            />
        </div>
    )
}