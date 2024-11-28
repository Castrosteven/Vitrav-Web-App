import { type Schema } from "@/backend/amplify/data/resource";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/data";
import outputs from "@/backend/amplify_outputs.json";
import { cookies } from "next/headers";

const cookieBasedClient = generateServerClientUsingCookies<Schema>({
  config: outputs,
  cookies,
});

export default cookieBasedClient;
