import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: any = {
  // Providers array will be configured in the next steps
  providers: [
    GoogleProvider({
      clientId:
        "936770188504-nuaf4vcjdfjm0jlut5d62m9ksl8lkeeg.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    // ... other providers
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  jwt: {
    // JWT encoding and decoding configurations
  },
  callbacks: {},
  pages: {
    signIn: "/signIn", // Custom sign-in page
  },
};
export const getAuth = () => getServerSession(authOptions);
