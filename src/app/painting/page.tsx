"use client";

import { useRef, useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import type { ColorResult } from "react-color";

// import { toPng } from "html-to-image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDraw } from "@/hooks/useDraw";
import { usePost } from "@/hooks/usePost";
import type { Draw } from "@/lib/types/shared_types";

export default function Painting() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [color, setColor] = useState<string>("#000");
  const [showPicker, setShowPicker] = useState(false);
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);
  const elementRef = useRef<HTMLDivElement>(null);
  const [isPost, setIsPost] = useState<boolean>(false);
  const [isFirstPost, setIsFirstPost] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const { loading, fetchTopic, postPaint, posted, firstPost } = usePost();

  const [welcomeDialog, setWelcomeDialog] = useState<boolean>(false);
  const [personalDialog, setPersonalDialog] = useState<boolean>(false);
  const [socialDialog, setSocialDialog] = useState<boolean>(false);

  const [isPostDialog, setIsPostDialog] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const userId = session?.user?.id ?? "";

  useEffect(() => {
    const checkPost = async () => {
      try {
        const post = await posted({ userId });
        setIsPost(post);
      } catch (error) {
        console.error("Error fetching the topic:", error);
      }
    };

    checkPost();
  }, [posted, userId]);

  useEffect(() => {
    const checkFirstPost = async () => {
      try {
        const firstPosted = await firstPost({ userId });
        setIsFirstPost(firstPosted);

        if (isFirstPost) {
          setWelcomeDialog(true);
        }
      } catch (error) {
        console.error("Error fetching the first topic:", error);
      }
    };

    checkFirstPost();
  }, [firstPost, isFirstPost, isPost, userId]);

  useEffect(() => {
    if (isPost === false) {
      const loadTopic = async () => {
        try {
          const fetchedTopic = await fetchTopic({ userId });
          setTopic(fetchedTopic);
        } catch (error) {
          console.error("Error fetching the topic:", error);
        }
      };

      loadTopic();

      const mainElement = document.getElementById("main-element");

      if (mainElement) {
        const timer = setTimeout(() => {
          mainElement.classList.remove("blur-lg");
        }, 500);

        return () => clearTimeout(timer);
      }
    } else {
      setIsPostDialog(true);
    }
  }, [fetchTopic, firstPost, isFirstPost, isPost, router, userId]);

  if (!userId || userId === "") {
    router.push("/auth/login");
    return <div></div>;
  }

  const handleColorIconClick = () => {
    setShowPicker(!showPicker);
  };

  const handlePostClick = async () => {
    if (elementRef.current) {
      try {
        // const dataUrl = await toPng(elementRef.current, { cacheBust: false });
        const dataUrl = canvasRef.current?.toDataURL("image/png");
        if (!dataUrl) return;
        const base64Img = dataUrl.replace(/^data:.+base64,/, "");

        const result = await fetch("/api/paint/image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64Img }),
        });
        const response = await result.json(); // response.data is an object containing the image URL

        await postPaint({
          userId: userId,
          topic: topic,
          description: description,
          image: response.image.data.link,
        });
        router.push(`/personal`);
      } catch (error) {
        console.error("Error exporting canvas:", error);
      }
    }
  };

  const handleFirstDialog = () => {
    setWelcomeDialog(true);
    setPersonalDialog(false);
    setSocialDialog(false);
  };

  const handleSecondDialog = () => {
    setWelcomeDialog(false);
    setPersonalDialog(true);
    setSocialDialog(false);
  };

  const handleThirdDialog = () => {
    setWelcomeDialog(false);
    setPersonalDialog(false);
    setSocialDialog(true);
  };

  const handleCloseDialog = () => {
    setWelcomeDialog(false);
    setPersonalDialog(false);
    setSocialDialog(false);
  };

  const handleConfirmDialog = () => {
    setIsConfirmed(true);
  };

  const handleClosePostDialog = () => {
    setIsPostDialog(false);
    router.push(`/personal`);
  };

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = color;
    const lineWidth = 5;

    const startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  if (status !== "authenticated") {
    router.push("/auth/login");
  } else {
    return (
      <div id="main-element" className="blur-lg overflow-y-auto">
        <main
          className={`flex h-screen min-h-screen flex-col items-center bg-brand`}
        >
          <AlertDialog open={isPostDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl">
                  You have already posted today !
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction onClick={handleClosePostDialog}>
                  OK
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
                <AlertDialogAction onClick={handlePostClick}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div className="h-1/6 w-full"></div>
          <div className="flex flex-col h-full w-full lg:mt-0 justify-center px-6 lg:px-12">
            <div className="mt-4 lg:flex w-full items-center gap-4 px-4 py-auto text-3xl ">
              <div className="w-full lg:flex items-center space-x-4">
              <div className="w-full flex flex-col items-center justify-center text-txt text-center">
                Today's Topic:{" "}
                <span className="overflow-hidden whitespace-nowrap underline">
                  {topic}
                </span>
              </div>
              </div>
              
            </div>
            <div className="w-full flex justify-center lg:justify-start gap-4">
              <div
                className="z-10 h-[25px] w-[25px] cursor-pointer self-center rounded-full p-2"
                onClick={handleColorIconClick}
                style={{ backgroundColor: color }}
              >
                {showPicker && (
                  <ChromePicker
                    color={color}
                    onChange={(e: ColorResult) => setColor(e.hex)}
                  />
                )}
              </div>

              <button
                type="button"
                className="flex items-end my-4 rounded-lg border-2 border-black px-2 text-base text-black"
                onClick={clear}
              >
                Clear
              </button>
              
              <div className="grow"></div>
              <div className="flex mt-auto hidden lg:block ml-auto text-gray-500 text-xl">
                2023/12/09 {"(Sat.)"}
              </div>
              </div>
            <div className="mb-4 lg:flex gap-4">
              <div 
              className="relative lg:w-[55%] aspect-[5/3] rounded-2xl border-4 border-bdr_2"
              >
                <div ref={elementRef} className="flex justify-center h-full w-full rounded-2xl bg-white">
                  <canvas
                    ref={canvasRef}
                    onMouseDown={onMouseDown}
                    className="h-full w-full rounded-2xl"
                  />
                </div>
              </div>
              <div className="mt-2 lg:mb-0 flex flex-col lg:grow">
                <p className="w-full mb-2 flex justify-center text-center lg:hidden w-5/6 text-md mt-2 ml-2 text-start text-gray-500">
                  type something, do not exceed 50 words
                </p>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  className="items-start h-full w-full p-4 rounded-2xl border-4 border-bdr_2 bg-brand p-2 text-lg resize-none"
                  placeholder="Type something..."
                />
                <div className="flex justify-center">
                <p className="hidden lg:block w-5/6 text-md mt-2 ml-2 text-start text-gray-500">
                  type something to further deliver your thought, do not exceed 50 words
                </p>
                <button
                disabled={loading}
                onClick={handleConfirmDialog}
                className="mb-10 lg:mb-4 flex lg-justify-end mt-2 rounded-2xl border-4 border-bdr bg-btn_2 px-4 py-2 text-xl text-txt"
                >
                  POST
                </button>
                </div>
              </div>
            </div>
            
          </div>
          
        </main>
        <AlertDialog open={isFirstPost && welcomeDialog}>
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
                We're thrilled to have you here as part of our creative
                community. At <span className="text-txt_2">S</span>
                <span className="text-txt_3">O</span>
                <span className="text-txt_2">U</span>
                <span className="text-txt_3">L</span>
                <span className="text-txt_2">Y</span>, you have the artistic
                freedom to express yourself through daily drawings based on
                unique topics.
              </AlertDialogDescription>
              <AlertDialogDescription className="text-2xl">
                Starting today, we'll provide you with a daily drawing topic to
                inspire your creations. Remember, you can post once a day, so
                make it count!
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogAction onClick={handleSecondDialog}>
                  Next
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog open={isFirstPost && personalDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-4xl">
                Additionally, explore the personal page...
              </AlertDialogTitle>
              <AlertDialogDescription className="text-2xl">
                Head over to your personal page to view and cherish your posted
                artworks. It's your personal gallery showcasing your artistic
                journey.
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleFirstDialog}>
                  Back
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleThirdDialog}>
                  Next
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog open={isFirstPost && socialDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-4xl">
                Additionally, explore the social page...
              </AlertDialogTitle>
              <AlertDialogDescription className="text-2xl">
                discover the incredible artworks posted by fellow{" "}
                <span className="text-txt_2">S</span>
                <span className="text-txt_3">O</span>
                <span className="text-txt_2">U</span>
                <span className="text-txt_3">L</span>
                <span className="text-txt_2">Y</span> creators. It's a space to
                connect, be inspired, and celebrate the diverse talents within
                our community.
              </AlertDialogDescription>
              <AlertDialogDescription className="text-2xl">
                Now, let's embark on this creative adventure together. We hope
                you find joy, inspiration, and a piece of your soul in every
                stroke!
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleSecondDialog}>
                  Back
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleCloseDialog}>
                  OK
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }
}
