"use client";

import { useRef, useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import type { ColorResult } from "react-color";
import { BsEraser } from "react-icons/bs";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [isPost, setIsPost] = useState<boolean>(false);
  const [isFirstPost, setIsFirstPost] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const { fetchTopic, postPaint, posted, firstPost } = usePost();

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
        setLoading(true);
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

        await new Promise((resolve) => setTimeout(resolve, 3000));

        router.push(`/personal`);
      } catch (error) {
        console.error("Error exporting canvas:", error);
      } finally {
        setLoading(false);
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
      <div id="main-element" className="overflow-y-auto blur-lg">
        <main
          className={`flex h-screen min-h-screen flex-col items-center bg-brand_2`}
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
          <div className="h-1/6 w-full"></div>
          <div className="flex h-full w-full flex-col justify-center px-6 lg:mt-0 lg:px-12">
            <div className="py-auto mt-4 w-full items-center gap-4 px-4 text-3xl lg:flex ">
              <div className="w-full items-center space-x-4 lg:flex">
                <div className="flex w-full flex-col items-center justify-center text-center text-txt">
                  Today's Topic:{" "}
                  <span className="mt-2 overflow-hidden whitespace-normal break-all text-xl underline sm:text-2xl">
                    {topic}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center gap-4 lg:justify-start">
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

              <BsEraser
                className="z-10 h-[30px] w-[30px] cursor-pointer self-center rounded-full p-1 hover:bg-white"
                onClick={() => setColor("#fff")}
              />

              <button
                type="button"
                className="my-4 flex items-end rounded-lg border-2 border-black px-2 text-base text-black hover:bg-description/80"
                onClick={clear}
              >
                Clear
              </button>

              <div className="grow"></div>
              <div className="ml-auto mt-auto flex hidden text-xl text-gray-500 lg:block">
                {`${new Date().getFullYear()}/${
                  new Date().getMonth() + 1
                }/${new Date().getDate()} (${new Date().toLocaleDateString(
                  "en-US",
                  { weekday: "short" },
                )})`}
              </div>
            </div>
            <div className="mb-4 gap-4 lg:flex">
              <div className="relative aspect-[5/3] rounded-2xl border-4 border-bdr_2 lg:w-[55%]">
                <div
                  ref={elementRef}
                  className="flex h-full w-full justify-center rounded-2xl bg-white"
                >
                  <canvas
                    ref={canvasRef}
                    onMouseDown={onMouseDown}
                    className="h-full w-full rounded-2xl"
                  />
                </div>
              </div>
              <div className="mt-2 flex flex-col lg:mb-0 lg:grow">
                <p className="text-md mb-2 ml-2 mt-2 flex w-5/6 w-full justify-center text-center text-start text-gray-500 lg:hidden">
                  type something, do not exceed 50 words
                </p>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-full w-full resize-none items-start rounded-2xl border-4 border-bdr_2 bg-brand p-2 p-4 text-3xl"
                  placeholder="Type something..."
                  maxLength={50}
                />
                <div className="flex justify-center">
                  <p className="text-md ml-2 mt-2 hidden w-5/6 text-start text-gray-500 lg:block">
                    type something to further deliver your thought, do not
                    exceed 50 words
                  </p>
                  <button
                    disabled={loading}
                    onClick={handleConfirmDialog}
                    className="lg-justify-end mb-10 mt-2 flex rounded-2xl border-4 border-bdr bg-btn_2 px-4 py-2 text-xl text-txt hover:bg-description/30 lg:mb-4"
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
