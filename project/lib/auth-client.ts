import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import {
  inferAdditionalFields,
  multiSessionClient,
} from "better-auth/client/plugins";
import { auth } from "@/lib/auth";

export const authClient = createAuthClient({
  plugins: [multiSessionClient(), inferAdditionalFields<typeof auth>()],
});
