"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import AuthInput from "../_components/AuthInput";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { publicEnv } from "@/lib/env/public";

function SignUp() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username, password, confirmPassword);
    signIn("credentials", {
      username,
      email,
      password,
      callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/personal`,
    });
  };

  return (
    <div className="relative z-50 flex min-h-screen items-center justify-center bg-brand">
      <Card className="w-4/5 border-4 border-bdr bg-brand md:w-[600px] lg:w-[800px]">
        <CardHeader>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-4xl">
              <Link href="/" className="mr-6 flex items-center">
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
              <div className="hidden items-center md:flex">
                <p className="mr-2 text-description">Welcome to</p>
                <p className="text-txt_2">S</p>
                <p className="text-txt_3">O</p>
                <p className="text-txt_2">U</p>
                <p className="text-txt_3">L</p>
                <p className="text-txt_2">Y</p>
                <p className="ml-2 text-description">!</p>
              </div>
              <div className="flex-col items-center justify-center text-2xl md:hidden">
                <div>
                  <p className="mr-2 text-description">Welcome to</p>
                </div>
                <div className="flex items-center justify-center">
                  <p className="text-txt_2">S</p>
                  <p className="text-txt_3">O</p>
                  <p className="text-txt_2">U</p>
                  <p className="text-txt_3">L</p>
                  <p className="text-txt_2">Y</p>
                  <p className="ml-2 text-description">!</p>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
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
              label="Email"
              type="email"
              value={email}
              setValue={setEmail}
            />
            <AuthInput
              label="Password"
              type="password"
              value={password}
              setValue={setPassword}
            />
            <AuthInput
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              setValue={setConfirmPassword}
            />
            <div className="mb-2 mt-4 justify-center text-center text-xl text-gray-500">
              <span>
                Already have an account?{" "}
                <Link
                  className="ml-4 cursor-pointer underline"
                  href="/auth/login"
                >
                  Sign In
                </Link>
              </span>
            </div>
            <Button
              type="submit"
              className="w-full rounded-2xl border-4 border-bdr bg-btn text-center text-xl text-txt"
            >
              Sign Up
            </Button>
          </form>
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              onClick={async () => {
                signIn("github", {
                  callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/personal`,
                });
              }}
              className="flex w-full rounded-2xl border-4 border-bdr bg-btn text-center text-xl text-txt"
              variant={"outline"}
            >
              <Image
                src="/github.png"
                alt="github icon"
                width={20}
                height={20}
              />
              <span className="grow text-xl">Sign Up with Github</span>
            </Button>
            <Button
              onClick={async () => {
                signIn("github", {
                  callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/personal`,
                });
              }}
              className="flex w-full rounded-2xl border-4 border-bdr bg-btn text-center text-xl text-txt"
              variant={"outline"}
            >
              <Image
                src="/github.png"
                alt="github icon"
                width={20}
                height={20}
              />
              <span className="grow text-xl">Sign Up with Github</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUp;
