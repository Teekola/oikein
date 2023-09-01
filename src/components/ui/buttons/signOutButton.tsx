"use client";

import { signOut } from "next-auth/react";

import { Button } from "./button";

export default function SignOutButton() {
   return <Button onClick={() => signOut()}>Kirjaudu ulos</Button>;
}
