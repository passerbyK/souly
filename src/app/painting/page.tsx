"use client";

import { useRef, useState } from "react";
import { ChromePicker } from "react-color";
import type { ColorResult } from "react-color";
import { toPng } from "html-to-image";

import { useDraw } from "@/hooks/useDraw";
import type { Draw } from "@/lib/types/shared_types";

export default function Home() {
  const [color, setColor] = useState<string>("#000");
  const [showPicker, setShowPicker] = useState(false);
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleColorIconClick = () => {
    setShowPicker(!showPicker);
  };

  const htmlToImageConvert = () => {
    if (elementRef.current) {
      toPng(elementRef.current, { cacheBust: false })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "my-image-name.png";
          link.href = dataUrl;
          console.log("link", link);
          link.click();
        })
        .catch((err) => {
          console.error(err);
        });
    }
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

  return (
    <main className="flex h-screen min-h-screen flex-col items-center bg-brand">
      <div className="h-1/6 w-full"></div>
      <div className="w-full flex-col items-center justify-center bg-brand_2 px-4 md:px-12">
        <div className="mt-4 flex w-full flex-col items-center justify-between gap-4 px-4 text-4xl md:flex-row">
          <div className="mb-2 text-center text-txt_4 md:mb-0 md:w-1/2">
            Today's Topic:{" "}
            <span className="max-w-full overflow-hidden whitespace-nowrap underline">
              A dog running in the park
            </span>
          </div>
          <div className="text-gray-500">2023/12/09 {"(Sat.)"}</div>
        </div>
        <div className="my-4 flex justify-between gap-4">
          <div className="w-full items-center rounded-2xl border-4 border-bdr_2 ">
            <div ref={elementRef} className="rounded-2xl bg-white">
              <canvas
                ref={canvasRef}
                onMouseDown={onMouseDown}
                className="w-full h-full rounded-2xl"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              className="grow w-full rounded-2xl border-4 border-bdr_2 bg-brand p-2 text-xl overflow-auto overflow-clip"
              placeholder="Type something..."
            />
            <p className="text-md my-2 text-center text-gray-500">
              View others’ painting after you accomplish your mission.
            </p>
          </div>
        </div>
        <div className="md:2/5 flex">
          <div className="flex flex-col gap-10 pr-10">
            <div
              className={`rounded-full border-2 border-black p-2 cursor-pointer`}
              onClick={handleColorIconClick}
              style={{ backgroundColor: color}}
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
              className="rounded-md border border-black p-2"
              onClick={clear}
            >
              Clear canvas
            </button>
          </div>
          <button onClick={htmlToImageConvert} className="rounded-2xl border-4 border-bdr bg-btn_2 px-4 py-2 text-center text-3xl text-txt">
            POST
          </button>
        </div>
      </div>
    </main>
  );
}
