"use client";

import { useState, useEffect, useRef } from "react";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSettings } from "@/hooks/useSettings";

function Preference() {
  const { data: session } = useSession();
  const userId = session?.user?.id ?? "";

  const [subject, setSubject] = useState<string>("");
  const [lastingDays, setLastingDays] = useState<number>(21); // Default value is 21
  const [showSubjectAlert, setShowSubjectAlert] = useState<boolean>(false);
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
    try {
      await postSettings({
        userId: userId,
        subject: subject,
        lastingDays: lastingDays,
        isNotified: false,
        paintingTime: "",
      });

      router.push(`/painting`);
    } catch (error) {
      console.error("Error setting the info:", error);
    }
  };

  return (
    <div className="relative z-50 flex min-h-screen items-center justify-center bg-brand">
      <AlertDialog>
        <AlertDialogTrigger ref={alertDialogTriggerRef}></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-4xl">
              Welcome to <span className="text-txt_2">S</span>
              <span className="text-txt_3">O</span>
              <span className="text-txt_2">U</span>
              <span className="text-txt_3">L</span>
              <span className="text-txt_2">Y</span> !
            </AlertDialogTitle>
            <AlertDialogDescription className="text-2xl">
              Please set up your basic information before you start your journey
              !
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
              <Select
                onValueChange={(value) => {
                  setSubject(value);
                  value === "Custom"
                    ? setShowCustomInput(true)
                    : setShowCustomInput(false);
                }}
              >
                <SelectTrigger className="w-2/3 border-4 border-txt_4 bg-btn_3 text-xl">
                  <SelectValue placeholder="Select your prefered subjects" />
                </SelectTrigger>
                <SelectContent className="w-2/3 border-4 border-txt_4 bg-btn_3 text-xl">
                  <SelectItem value="Customize On Your Own">
                    Customize On Your Own
                  </SelectItem>
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
            {showCustomInput && (
              <div className="mb-2 flex w-full flex-col items-center gap-4 text-center md:flex-row md:items-center">
                <Label className="w-[200px] text-center text-xl md:justify-center">
                  Your Custom Subject
                </Label>
                <Input
                  type="text"
                  value={subject}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSubject(e.target.value)
                  }
                  placeholder="Enter custom subject"
                  className="w-2/3 border-4 border-txt_4 bg-btn_3 text-xl"
                />
              </div>
            )}
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
              {loading && (
                <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-75">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
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
