"use client";

import { useState } from "react";
import { ChromePicker } from "react-color";
import type { ColorResult } from "react-color";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useDraw } from "@/hooks/useDraw";
import type { Draw } from "@/lib/types/shared_types";

export default function Painting() {
  const { status } = useSession();
  const router = useRouter();

  const [color, setColor] = useState<string>("#000");
  const [showPicker, setShowPicker] = useState(false);
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

  const handleColorIconClick = () => {
    setShowPicker(!showPicker);
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
      <main className="flex h-screen min-h-screen flex-col items-center bg-brand">
        <div className="h-1/6 w-full"></div>
        <div className="h-full w-full flex-col items-center justify-center bg-brand_2 px-4 md:px-12">
          <div className="mt-4 flex w-full items-center gap-4 px-4 text-4xl ">
            <div className="my-4 w-3/4 grow flex-wrap text-center text-txt_4 md:w-1/2">
              Today's Topic:{" "}
              <span className="max-w-full overflow-hidden whitespace-nowrap underline">
                A dog running in the park
              </span>
            </div>
            <div className="w-1/4 flex-wrap text-gray-500">
              2023/12/09 {"(Sat.)"}
            </div>
          </div>
          <div className="mb-4 flex gap-4">
            <div className="relative h-[400px] w-[1000px] items-center rounded-2xl border-4 border-bdr_2 bg-white">
              <canvas
                ref={canvasRef}
                onMouseDown={onMouseDown}
                className="h-full w-full rounded-2xl"
              />
            </div>
            <div className="flex flex w-1/3 flex-col gap-4">
              <input
                type="text"
                className="flex w-full grow rounded-2xl border-4 border-bdr_2 bg-brand p-2 text-xl"
                placeholder="Type something..."
              />
              <p className="text-md mt-2 text-center text-gray-500">
                View others’ painting after you accomplish your mission.
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex grow gap-10 pr-10">
              <button
                type="button"
                className="rounded-md border border-black p-2"
                onClick={clear}
              >
                Clear canvas
              </button>
              <div
                className="h-[50px] w-[50px] self-center rounded-full border-2 border-black p-2"
                onClick={handleColorIconClick}
                style={{ backgroundColor: color, cursor: "pointer" }}
              >
                {showPicker && (
                  <ChromePicker
                    color={color}
                    onChange={(e: ColorResult) => setColor(e.hex)}
                  />
                )}
              </div>
            </div>
            <button className="rounded-2xl border-4 border-bdr bg-btn_2 px-4 py-2 text-center text-3xl text-txt">
              POST
            </button>
          </div>
        </div>
      </main>
    );
  }
}
