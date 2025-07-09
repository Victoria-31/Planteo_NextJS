import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "./db";
import { getServerSession } from "next-auth";
import { verifyPassword } from "@/lib/hash"; 

export const getAuthSession = () => getServerSession(authOptions);

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
   async authorize(credentials) {
  if (!credentials) return null;

  const user = await getUserByEmail(credentials.email);
  if (!user) return null;

  const isValid = await verifyPassword(credentials.password, user.password);
  if (!isValid) return null;

  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
  };
}
 })
  ],
  pages: {
    signIn: "/", 
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.id) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
