import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
// import LinkedInProvider from "next-auth/providers/linkedin";
// import AppleProvider from "next-auth/providers/apple";
import { findMemberByEmail } from "@/database/queries/user/findMemberByEmail";
import { findMemberByPassword } from "@/database/queries/user/findMemberByPassword";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 2 * 24 * 60 * 60, // 2 Days
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_ID,
      clientSecret: process.env.DISCORD_SECRET,
    }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // LinkedInProvider({
    //   clientId: process.env.LINKEDIN_ID,
    //   clientSecret: process.env.LINKED_SECRET,
    // }),
    CredentialsProvider({
      credentials: {
        email: {
          label: "E-Mail",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;
        const user = await findMemberByPassword(email, password);

        if (user && user.length > 0) {
          return {
            mid: user[0].mid,
            username: user[0].username,
            email: user[0].email,
            first_name: user[0].first_name,
            last_name: user[0].last_name,
            role: user[0].role,
            occupation: user[0].occupation,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) { // Runs on first login
          token = {
              mid: user.mid,
              username: user.username,
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name,
              role: user.role,
              occupation: user.occupation,
          };
      }
  
      if (trigger === "update" && session?.user) { // Runs when session updates
          token = {
              mid: session.user.mid,
              username: session.user.username,
              email: session.user.email,
              first_name: session.user.first_name,
              last_name: session.user.last_name,
              role: session.user.role,
              occupation: session.user.occupation,
          };
      }
  
      return token; // Return the updated JWT
  },
    async session({ session, token }) {
      // Map token fields to the session object
      session.user = {
        mid: token.mid,
        username: token.username,
        email: token.email,
        first_name: token.first_name,
        last_name: token.last_name,
        role: token.role,
        occupation: token.occupation,
      };
      return session;
    },
    async signIn({ user, account }) {
      if (
        account?.provider !== "google" &&
        account?.provider !== "apple" &&
        account?.provider !== "github" &&
        account?.provider !== "linkedin" &&
        user.email
      ) {
        return true;
      } else {
        const existingUser = await findMemberByEmail(user.email);

        // If the user exists, proceed with the sign-in process
        if (existingUser.length > 0) {
          user.mid = existingUser[0].mid;
          user.username = existingUser[0].username;
          user.email = existingUser[0].email;
          user.first_name = existingUser[0].first_name;
          user.last_name = existingUser[0].last_name;
          user.role = existingUser[0].role;
          user.occupation = existingUser[0].occupation;
          return true;
        } else {
          return false;
        }
      }
    },
  },
  pages: {
    signIn: "/login",
    error: "/signup",
  },
};

