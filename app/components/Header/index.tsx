"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthenticator } from "@aws-amplify/ui-react";
import {
  fetchUserAttributes,
  FetchUserAttributesOutput,
} from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  const { user, signOut, authStatus } = useAuthenticator((context) => [
    context.user,
  ]);
  const [userAttributes, setUserAttributes] =
    useState<FetchUserAttributesOutput>();

  useEffect(() => {
    if (user) {
      fetchUserAttributes().then(setUserAttributes);
    }
  }, [user]);

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              {/* <Image
           src="/logo.svg"
           alt="Logo"
           width={32}
           height={32}
           className="w-auto h-8"
         /> */}
              <p className="text-2xl font-black">Vitrav</p>
            </Link>
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                href="/create-custom"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                Create New Custom Itinerary
              </Link>{" "}
              <Link
                href="/create"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                Create New Dynamic Itinerary
              </Link>
              {/* <Link
                href="/projects"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                Projects
              </Link>
              <Link
                href="/team"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                Team
              </Link> */}
            </nav>
          </div>
          {authStatus === "configuring" && <div>...</div>}
          {authStatus === "authenticated" && userAttributes !== undefined && (
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={userAttributes.picture}
                        alt="@username"
                      />
                      <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {userAttributes?.name}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex md:hidden ml-4">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </div>
            </div>
          )}
          {authStatus === "unauthenticated" && (
            <Button
              onClick={() => {
                router.push("/login");
              }}
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
