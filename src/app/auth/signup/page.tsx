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

  const [usernameError, setUsernameError] = useState<string>("null");
  const [emailError, setEmailError] = useState<string>("null");
  const [passwordError, setPasswordError] = useState<string>("null");
  const [confirmpasswordError, setConfirmpasswordError] =
    useState<string>("null");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username) setUsernameError("username");
    if (username) setUsernameError("null");
    if (!email) setEmailError("email");
    if (email) setEmailError("null");
    if (!password) setPasswordError("password");
    if (password && password.length < 8) setPasswordError("length");
    if (password && password.length >= 8) setPasswordError("null");
    if (!confirmPassword) setConfirmpasswordError("confirmPassword");
    if (confirmPassword && confirmPassword != password)
      setConfirmpasswordError("fail");
    if (confirmPassword && confirmPassword === password)
      setConfirmpasswordError("null");

    if (
      username &&
      email &&
      password.length >= 8 &&
      confirmPassword === password
    ) {
      try {
        await signIn("credentials", {
          username,
          email,
          password,
          callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/preference`,
        });
      } catch (e) {
        setEmailError("duplicate");
        console.log(e);
        // router.push("/auth/signup");
      }
    }
  };

  return (
    <div className="relative z-50 flex min-h-screen items-center justify-center bg-brand">
      <Card className="w-4/5 border-4 border-bdr bg-brand md:w-[600px] lg:w-[800px]">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-4xl">
            <Link href="/" className="mr-4 flex items-center">
              <div className="h-20 w-20">
                <Image
                  src="/Logo_new.png"
                  alt="Souly Logo"
                  className="mr-2 w-full"
                  width={100}
                  height={100}
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
            <div className="flex-col items-center justify-center text-xl md:hidden">
              <div className="flex text-center">
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
        <CardContent className="flex flex-col gap-2">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <AuthInput
              label="Username"
              type="text"
              value={username}
              setValue={setUsername}
              error={usernameError}
            />
            <AuthInput
              label="Email"
              type="email"
              value={email}
              setValue={setEmail}
              error={emailError}
            />
            <AuthInput
              label="Password"
              type="password"
              value={password}
              setValue={setPassword}
              error={passwordError}
            />
            <AuthInput
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              setValue={setConfirmPassword}
              error={confirmpasswordError}
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
            <Button
              onClick={async () => {
                signIn("google", {
                  callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/preference`,
                });
              }}
              className="mt-4 w-full rounded-2xl border-4 border-bdr bg-btn_2 text-center text-xl text-txt"
            >
              <Image
                src="/google.png"
                alt="google icon"
                width={25}
                height={25}
                className="mx-2 rounded-2xl border-2"
              />
              <span className="hidden sm:inline">Sign Up with Google</span>
              <span className="sm:hidden">Google</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUp;
