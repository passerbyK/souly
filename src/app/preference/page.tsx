"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { publicEnv } from "@/lib/env/public";

// import topics from "@/lib/topics.json";

function SignUp() {
  const [email] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPaintingTime, setShowPaintingTime] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      signIn("credentials", {
        email,
        password,
        callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/personal`,
      });
      router.push("/painting");
    } catch (e) {
      console.log(e);
      router.push("/auth/login");
    }
  };

  return (
    <div className="relative z-50 flex min-h-screen items-center justify-center bg-brand">
      <Card className="w-4/5 border-4 border-bdr bg-brand md:w-[600px] lg:w-[800px]">
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
            <div className="hidden items-center md:flex md:flex-col">
              <div className="flex">
                <p className="mr-2 text-description">Set up your</p>
                <p className="text-txt_2">D</p>
                <p className="text-txt_3">A</p>
                <p className="text-txt_2">I</p>
                <p className="text-txt_3">L</p>
                <p className="text-txt_2">Y</p>
                <p className="ml-2 text-description">mission !</p>
              </div>
              <div className="flex grow mt-2 justify-end">
                <p className="ml-2 text-lg text-gray-500">
                  This series of missions will continue for at least 21 days.
                </p>
              </div>
            </div>
            <div className="flex-col items-center justify-center text-2xl md:hidden">
              <div className="flex-wrap">
                  <p className="ml-2 text-description">Set up your</p>
                  <div className="ml-2 flex">
                    <p className="text-txt_2">D</p>
                    <p className="text-txt_3">A</p>
                    <p className="text-txt_2">I</p>
                    <p className="text-txt_3">L</p>
                    <p className="text-txt_2">Y</p>
                  </div>
                  <p className="ml-2 text-description">mission !</p>
              </div>
              <div className="flex items-center justify-center">
                  <p className="ml-2 text-lg text-gray-500">
                  This series of missions will continue for at least 21 days.
                  </p>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="ml-2 flex flex-col gap-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
            <div className="mb-2 flex w-full flex-col items-center gap-4 text-center md:flex-row md:items-center">
              <Label className="w-[200px] text-center text-xl md:justify-center">
                Painting Subject
              </Label>
              <Select>
                <SelectTrigger className="w-2/3 border-4 border-txt_4 bg-btn_3 text-xl">
                  <SelectValue placeholder="Select your prefered subjects" />
                </SelectTrigger>
                <SelectContent className="w-2/3 border-4 border-txt_4 bg-btn_3 text-xl">
                  <SelectItem value="Animal Party">Animal Party</SelectItem>
                  <SelectItem value="Strange Patterns">Strange Patterns</SelectItem>
                  <SelectItem value="Nonsense Words">Nonsense Words</SelectItem>
                  <SelectItem value="Self-Growth Time">Self-Growth Time</SelectItem>
                  <SelectItem value="Colorful Relationships">Colorful Relationships</SelectItem>
                  <SelectItem value="Ghost Stories">Ghost Stories</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-2 flex w-full flex-col items-center gap-4 text-center md:flex-row md:items-center">
              <Label className="w-[200px] text-center text-xl md:justify-center">
                Target Days
              </Label>
              <Input
                type="number"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  let newValue = parseInt(e.target.value, 10);
                  newValue = isNaN(newValue) ? 21 : Math.max(21, Math.min(60, newValue));
              
                  setPassword(newValue.toString());
                }}
                placeholder="21 ~ 60 days"
                className="w-2/3 border-4 border-txt_4 bg-btn_3 text-xl"
              />
            </div>
            <div className="mb-2 flex w-full flex-col items-center gap-4 text-center md:flex-row md:items-center">
              <Label className="w-[200px] text-center text-xl md:justify-center">
                Turn on Notification
              </Label>
              <Checkbox
                className="w-8 h-8 border-4 border-txt_4 bg-btn_3"
                onClick={() => setShowPaintingTime(!showPaintingTime)}
              />
              <p className="text-sm text-muted-foreground">
                We will remind you to paint every day !
              </p>
            </div>
            {showPaintingTime && (
              <div className="mb-2 flex w-full flex-col items-center gap-4 text-center md:flex-row md:items-center">
                <Label className="w-[200px] text-center text-xl md:justify-center">
                  Prefered Painting Time
                </Label>
                <Input
                  type="time"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                  }}
                  placeholder=""
                  lang="en" // not every browser support this attribute
                  className="w-2/3 border-4 border-txt_4 bg-btn_3 text-xl"
                />
              </div>
            )}
            <Button
              type="submit"
              className="mt-2 w-1/2 rounded-2xl border-4 border-bdr bg-btn_2 text-center text-xl text-txt"
            >
              Confirm
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUp;
