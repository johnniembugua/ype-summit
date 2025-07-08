import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { haveIBeenPwned, openAPI, multiSession } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 20,
  },
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  cookieCache: {
    enabled: true,
    maxAge: 5 * 60, // Cache duration in seconds 5 mins
  },
  plugins: [
    openAPI(), //Navigate to /api/auth/reference
    multiSession({
      maximumSessions: 3,
    }),
    haveIBeenPwned({
      customPasswordCompromisedMessage: "Please choose a more secure password.",
    }),
    nextCookies(),
  ],
});

// Type for our user with the additional role field
export type Session = typeof auth.$Infer.Session;
