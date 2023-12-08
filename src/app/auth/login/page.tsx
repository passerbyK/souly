"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { publicEnv } from "@/lib/env/public";
import AuthInput from "../_components/AuthInput";

function SignUp() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", {
      username,
      password,
      callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/chats`,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand">
      <Card className="w-4/5 lg:w-[800px] md:w-[600px] bg-brand border-4 border-bdr">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-4xl">
            <Link href="/" className="flex items-center mr-6">
              <div className="h-20 w-20">
                <Image
                  src="/Logo_new.png"
                  alt="Souly Logo"
                  className="mr-2 w-full"
                  width={20}
                  height={20}
                />
              </div>
            </Link>
            <div className="hidden md:flex items-center">
              <p className="text-description mr-2">Welcome Back to</p>
              <p className="text-txt_2">S</p>
              <p className="text-txt_3">O</p>
              <p className="text-txt_2">U</p>
              <p className="text-txt_3">L</p>
              <p className="text-txt_2">Y</p>
              <p className="text-description ml-2">!</p>
            </div>
            <div className="flex-col md:hidden items-center justify-center text-2xl">
              <div>
                <p className="text-description mr-2">Welcome Back to</p>
              </div>
              <div className="flex items-center justify-center">
                <p className="text-txt_2">S</p>
                <p className="text-txt_3">O</p>
                <p className="text-txt_2">U</p>
                <p className="text-txt_3">L</p>
                <p className="text-txt_2">Y</p>
                <p className="text-description ml-2">!</p>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <AuthInput
              label="Username"
              type="text"
              value={username}
              setValue={setUsername}
            />
            <AuthInput
              label="Password"
              type="password"
              value={password}
              setValue={setPassword}
            />
            <div className="mt-4 mb-2 text-xl text-center justify-center text-gray-500">
              <span>
                New to SOULY?{" "}
                <a
                  className="cursor-pointer underline ml-4"
                  href="/auth/signup"
                >
                  Sign Up
                </a>
              </span>
            </div>
            <Button type="submit" className="w-full rounded-2xl border-4 border-bdr bg-btn_2 text-center text-xl text-txt">
              Sign In
            </Button>
          </form>
          <div className="flex gap-2 justify-center">
            <Button
              onClick={async () => {
                signIn("github", {
                  callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/chats`,
                });
              }}
              className="flex w-full rounded-2xl border-4 border-bdr bg-btn_2 text-center text-xl text-txt"
              variant={"outline"}
            >
              <Image src="/github.png" alt="github icon" width={20} height={20} />
              <span className="grow text-xl">Sign In with Github</span>
            </Button>
            <Button
              onClick={async () => {
                signIn("github", {
                  callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/chats`,
                });
              }}
              className="flex w-full rounded-2xl border-4 border-bdr bg-btn_2 text-center text-xl text-txt"
              variant={"outline"}
            >
              <Image src="/github.png" alt="github icon" width={20} height={20} />
              <span className="grow text-xl">Sign In with Github</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUp;
