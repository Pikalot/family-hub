import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth/AuthOptions";
import { findMemberById } from "@/database/queries/Navbar/findMember";
import Footer from "@/components/Footer";
import styles from "./AccountSetting.module.css";
import WrapperPage from "./WrapperPage";
import { getSocialMedia } from "@/database/queries/user/getSocialMedia";
import DeepStarfield from "@/components/visual-effect/DeepStarfield";
import CherryBlossomField from "@/components/visual-effect/CherryBlossomField";
import SummerBreeze from "@/components/visual-effect/SummerBreeze";
import AutumnLeaves from "@/components/visual-effect/AutmnLeaves";
// import Avatar from "@/app/ui/components/auth/Avatar";
// import AccountSettingsPageWrapper from "./AccountSettingsWrapper";
// import SignOutButton from "@/ui/components/auth/SignOutButton";
// import { getUser } from "@/database/queries/user/getUser";

export default async function AccountSettingsPage() {
    const session = await getServerSession(authOptions);   

    if (!session?.user) {
        return (
            <p className="text-center text-error text-xl">
                You need to be logged in to access account settings.
            </p>
        );
    }

    const thisUser = await findMemberById(session.user.mid);
    const github = await getSocialMedia(session.user.mid, 'GitHub');
    const facebook = await getSocialMedia(session.user.mid, 'Facebook');
    const twitter = await getSocialMedia(session.user.mid, 'Twitter');
    const linkedin = await getSocialMedia(session.user.mid, 'LinkedIn');
    // Format the DOB
    const formattedDOB = thisUser[0]?.dob ? new Date(thisUser[0].dob).toLocaleDateString() : "N/A";

    return (
        <div>
            <div className={styles["account-setting"]}>
                {/* Background effect by season */}
                {(season > 1 && season <= 4) && <CherryBlossomField />}
                {(season > 4 && season <= 7) && <SummerBreeze />} 
                {(season > 7 && season <= 10) && <AutumnLeaves />}
                {(season > 10 || season <= 1) && <DeepStarfield />}
                <div className={styles["container"]}>
                    <div className={styles["title"]}>
                        <h1>
                            Account Settings
                        </h1>

                        {/* Profile Avatar */}
                        <div className={styles["content-container"]}>
                            {/* Avatar */}
                            {/* <Avatar
                                image={thisUser?.image || undefined}
                                username={thisUser?.username}
                                className="ring-4 ring-primary ring-offset-4 ring-offset-gray-300 dark:ring-offset-base-100"
                                size="8rem"
                                textSize="text-2xl"
                            /> */}

                            {/* User Info */}
                            <div className={styles["content"]}>
                                <p className={styles["bold-paragraph"]}>{thisUser[0]?.first_name} {thisUser[0]?.last_name}</p>
                                <p>
                                    <span className={styles["bold-paragraph"]}>Username:</span> {thisUser[0]?.username || "ERROR: NO USERNAME"}
                                </p>
                                <p>
                                    <span className={styles["bold-paragraph"]}>Email:</span> {thisUser[0]?.email || "!!!CRITICAL ERROR: NO EMAIL"}
                                </p>
                                <p>
                                    <span className={styles["bold-paragraph"]}>Mobile Phone Number:</span> {thisUser[0]?.phone || "N/A"}
                                </p>
                                <p>
                                    <span className={styles["bold-paragraph"]}>DOB:</span> {formattedDOB || "ERROR: NO DOB"}
                                </p>
                                <p>
                                    <span className={styles["bold-paragraph"]}>UID:</span> {thisUser[0]?.mid || "!!!CRITICAL ERROR: NO UID"}
                                </p>
                                {/* <SignOutButton className="mt-5 px-3 py-2 w-full" /> */}
                            </div>
                        </div>
                        {/* Client Component for Upload */}
                        
                        <WrapperPage />
                        
                    </div>
                </div>
            </div>
            
            <Footer
            member={thisUser[0]} 
            github={github? github[0] : ''} 
            facebook={facebook? facebook[0] : ''}
            twitter={twitter? twitter[0] : ''}
            linkedin={linkedin? linkedin[0] : ''}
            />
        </div>
    );
}
