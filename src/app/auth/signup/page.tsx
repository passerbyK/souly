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
  const [usernameerror, setUsernameerror] = useState<string>("null");
  const [emailerror, setEmailerror] = useState<string>("null");
  const [passworderror, setPassworderror] = useState<string>("null");
  const [confirmpassworderror, setConfirmpassworderror] =
    useState<string>("null");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username) {
      setUsernameerror("username");
    }
    if (username) {
      setUsernameerror("null");
    }
    if (!email) {
      setEmailerror("email");
    }
    if (email) {
      setEmailerror("null");
    }
    if (password.length >= 8) {
      setPassworderror("null");
    }
    if (!password) {
      setPassworderror("password");
    }
    if (password && password.length < 8) {
      setPassworderror("length");
    }
    if (!confirmPassword) {
      setConfirmpassworderror("confirmPassword");
    }
    if (confirmPassword && password !== confirmPassword) {
      setConfirmpassworderror("fail");
    }
    if (password === confirmPassword) {
      setConfirmpassworderror("null");
    }
    if (
      username &&
      email &&
      password.length >= 8 &&
      confirmPassword === password
    ) {
      try {
        const res = await signIn("credentials", {
          username,
          email,
          password,
          redirect: false,
        });
        if (res?.error == null) {
          window.location.href = `${publicEnv.NEXT_PUBLIC_BASE_URL}/preference`;
        } else {
          setEmailerror("duplicate");
          throw new Error(res?.error);
        }
      } catch (e) {
        console.log(e);
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
              error={usernameerror}
              setValue={setUsername}
            />
            <AuthInput
              label="Email"
              type="email"
              value={email}
              error={emailerror}
              setValue={setEmail}
            />
            <AuthInput
              label="Password"
              type="password"
              value={password}
              error={passworderror}
              setValue={setPassword}
            />
            <AuthInput
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              error={confirmpassworderror}
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
