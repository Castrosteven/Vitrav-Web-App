"use client";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { user } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    if (user) {
      redirect("/");
    }
  }, [user]);

  return (
    <>
      <Authenticator />
    </>
  );
}
