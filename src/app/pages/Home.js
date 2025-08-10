import { findMemberByUsername } from "@/database/queries/Navbar/findMember";
import Footer from "@/components/Footer";
import { getSocialMedia } from "@/database/queries/user/getSocialMedia";
import { homeRoutes } from "./Routing";
import NotFound from "./NotFoundPage";

export default async function Home({ username }) {
  const member = await findMemberByUsername(username);
  if (!member || !member.length) {
    return <NotFound />;
  }

  const userId = member[0].mid;
  const github = await getSocialMedia(userId, "GitHub");
  const facebook = await getSocialMedia(userId, "Facebook");
  const twitter = await getSocialMedia(userId, "Twitter");
  const linkedin = await getSocialMedia(userId, "LinkedIn");
  const routes = await homeRoutes({ username, userId, member });

  return (
    <div>
      {routes.length > 0 ? (
        routes.map(({ id, props, Component }) => (
          <section id={id} key={id}>
            <Component {...props} />
          </section>
        ))
      ) : (
        <NotFound />
      )}
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
