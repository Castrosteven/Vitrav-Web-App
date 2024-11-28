"use client";

import { Amplify } from "aws-amplify";

import outputs from "@/backend/amplify_outputs.json";
import { Authenticator } from "@aws-amplify/ui-react";
import { Header } from "./Header";

Amplify.configure(outputs, { ssr: true });

export default function ConfigureAmplifyClientSide({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Authenticator.Provider>
      <Header />
      {children}
    </Authenticator.Provider>
  );
}
