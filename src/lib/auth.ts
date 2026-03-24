import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { usersService } from "@/lib/services/users.service";

class InvalidCredentialsError extends CredentialsSignin {
  code = "invalid_credentials";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await usersService.findByEmail(email);
        if (!user) throw new InvalidCredentialsError();

        const isValid = await bcrypt.compare(password, user.hashedPassword);
        if (!isValid) throw new InvalidCredentialsError();

        return {
          id: user._id.toString(),
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
