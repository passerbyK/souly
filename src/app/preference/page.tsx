"use client";

import { useState, useEffect, useRef } from "react";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useSettings } from "@/hooks/useSettings";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Preference() {
  const { data: session } = useSession();
  const userId = session?.user?.id ?? "";

  const [subject, setSubject] = useState<string>("");
  const [lastingDays, setLastingDays] = useState<number>(21); // Default value is 21
  const [notification, setNotification] = useState<boolean>(false);
  const [paintingTime, setPaintingTime] = useState<string>("");
  const [showSubjectAlert, setShowSubjectAlert] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const alertDialogTriggerRef = useRef<HTMLButtonElement>(null);

  const { postSettings, isSettings } = useSettings();

  const router = useRouter();

  useEffect(() => {
    const checkSettings = async () => {
      try {
        const isSetting = await isSettings(userId);
        if (isSetting === true) {
          router.push(`/painting`);
        }
      } catch (error) {
        console.error("Error fetching the settings:", error);
      }
    };

    checkSettings();

    if (alertDialogTriggerRef.current) {
      alertDialogTriggerRef.current.click();
    }
  }, [isSettings, router, userId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!subject) {
        setShowSubjectAlert(true);
        return;
      }

      setIsConfirmed(true);
    } catch (error) {
      console.error("Error setting the info:", error);
    }
  };

  const handleClick = async () => {
    try {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const currentTime = `${hours}:${minutes}`

      await postSettings({
        userId: userId,
        subject: subject,
        lastingDays: lastingDays,
        isNotified: notification,
        paintingTime: notification === true && paintingTime === "" ? currentTime : paintingTime,
      });

      router.push(`/painting`);
    } catch (error) {
      console.error("Error setting the info:", error);
    }
  }

  return (
    <div className="relative z-50 flex min-h-screen items-center justify-center bg-brand">
      <AlertDialog >
        <AlertDialogTrigger ref={alertDialogTriggerRef}></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-4xl">
                Welcome to {" "}
                <span className="text-txt_2">S</span>
                <span className="text-txt_3">O</span>
                <span className="text-txt_2">U</span>
                <span className="text-txt_3">L</span>
                <span className="text-txt_2">Y</span> 
                {" "}!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-2xl">
              Please set up your basic information before you start your journey !
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Card className="w-4/5 border-4 border-bdr bg-brand md:w-[600px] lg:w-[800px]">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-4xl">
            <Link href="/" className="mr-6 flex items-center">
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
              <div className="mt-2 flex grow justify-end">
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
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-2"
          >
            <div className="mb-2 flex w-full flex-col items-center gap-4 text-center md:flex-row md:items-center">
              <Label className="w-[200px] text-center text-xl md:justify-center">
                Painting Subject
              </Label>
              <Select onValueChange={(value) => setSubject(value)}>
                <SelectTrigger className="w-2/3 border-4 border-txt_4 bg-btn_3 text-xl">
                  <SelectValue placeholder="Select your prefered subjects" />
                </SelectTrigger>
                <SelectContent className="w-2/3 border-4 border-txt_4 bg-btn_3 text-xl">
                  <SelectItem value="Animal Party">Animal Party</SelectItem>
                  <SelectItem value="Strange Patterns">
                    Strange Patterns
                  </SelectItem>
                  <SelectItem value="Nonsense Words">Nonsense Words</SelectItem>
                  <SelectItem value="Self-Growth Time">
                    Self-Growth Time
                  </SelectItem>
                  <SelectItem value="Colorful Relationships">
                    Colorful Relationships
                  </SelectItem>
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
                value={lastingDays}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  let newValue = parseInt(e.target.value, 10);
                  newValue = isNaN(newValue)
                    ? 21
                    : Math.max(21, Math.min(60, newValue));

                  setLastingDays(newValue);
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
                className="h-8 w-8 border-4 border-txt_4 bg-btn_3"
                checked={notification}
                onCheckedChange={() => setNotification(!notification)}
              />
              <p className="text-sm text-muted-foreground">
                We will remind you to paint every day !
              </p>
            </div>
            {notification && (
              <div className="mb-2 flex w-full flex-col items-center gap-4 text-center md:flex-row md:items-center">
                <Label className="w-[200px] text-center text-xl md:justify-center">
                  Prefered Painting Time
                </Label>
                <Input
                  type="time"
                  value={paintingTime}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPaintingTime(e.target.value);
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
      <AlertDialog open={isConfirmed}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">
              Are you sure you want to post?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsConfirmed(false)}>
              Back
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleClick}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={showSubjectAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">
              Please select a painting subject.
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSubjectAlert(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Preference;
