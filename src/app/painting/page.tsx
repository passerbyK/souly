"use client";

import Image from "next/image";
import Link from "next/link";

import type { FC } from 'react';
import { useState } from 'react';
import { useDraw } from '@/hooks/useDraw';
import { ChromePicker } from 'react-color';

interface pageProps {};

const Paint: FC<pageProps> = ({}) => {
  const [color, setColor] = useState<string>('#000');
  const [showPicker, setShowPicker] = useState(false);
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

  const handleColorIconClick = () => {
    setShowPicker(!showPicker);
  };

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint
    const lineColor = color
    const lineWidth = 5

    const startPoint = prevPoint ?? currentPoint
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    ctx.moveTo(startPoint.x, startPoint.y)
    ctx.lineTo(currX, currY)
    ctx.stroke()

    ctx.fillStyle = lineColor
    ctx.beginPath()
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI)
    ctx.fill()
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-brand h-screen">
      <header className="flex w-full flex-wrap items-center justify-between p-4 px-8 pt-8">
        <div className="mb-2 flex items-center justify-center gap-4 md:mb-0">
          <Link href="/" className="mr-6 flex items-center text-4xl">
            <div className="h-20 w-20">
              <Image
                src="/Logo_new.png"
                alt="Souly Logo"
                className="mr-2 w-full"
                width={20}
                height={20}
              />
            </div>
            <p className="text-txt_2">S</p>
            <p className="text-txt_3">O</p>
            <p className="text-txt_2">U</p>
            <p className="text-txt_3">L</p>
            <p className="text-txt_2">Y</p>
          </Link>
          <Link
            href="/introduction"
            className="m-2 rounded-2xl border-4 border-bdr bg-btn px-4 py-2 text-center text-3xl text-txt"
          >
            About Us
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:justify-end">
          <Link
            href="/auth/login"
            className="m-2 rounded-2xl border-4 border-bdr bg-btn_2 px-4 py-2 text-center text-3xl text-txt"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="m-2 rounded-2xl border-4 border-bdr bg-btn px-4 py-2 text-center text-3xl text-txt"
          >
            Sign Up
          </Link>
        </div>
      </header>
      <div className="flex-col bg-brand_2 w-full justify-center items-center px-4 md:px-12">
        <div className="flex flex-col md:flex-row justify-between w-full px-4 mt-4 gap-4 text-4xl items-center">
          <div className="text-center text-txt_4 mb-2 md:mb-0 md:w-1/2">
            Today's Topic:{" "}
            <span className="underline max-w-full overflow-hidden whitespace-nowrap">
              XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            </span>
          </div>
          <div className="text-gray-500">
            2023/12/09 {" "} {"(Sat.)"}
          </div>
        </div>
        <div className="flex justify-between gap-4 my-4">
          <div className="w-full bg-white items-center rounded-2xl border-4 border-bdr_2 relative">
            <canvas
              ref={canvasRef}
              onMouseDown={onMouseDown}
              className="w-full rounded-2xl"
            />
          </div>
          <div className="w-full flex flex-col gap-4">
            <input
              type="text"
              className="w-full p-2 text-xl bg-brand rounded-2xl border-4 border-bdr_2"
              placeholder="Type something..."
            />
            <p className="text-md text-center mt-2 text-gray-500">View others’ painting after you accomplish your mission.</p>
          </div>
        </div>
        <div className="flex md:2/5">
          <div className='flex flex-col gap-10 pr-10'>
            <div
              className='p-2 rounded-full border-2 border-black'
              onClick={handleColorIconClick}
              style={{ backgroundColor: color, cursor: 'pointer' }}
            >
              {showPicker && (
              <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
              )}
            </div>
            <button type='button' className='p-2 rounded-md border border-black' onClick={clear}>
              Clear canvas
            </button>
          </div>
          <button className="rounded-2xl border-4 border-bdr bg-btn_2 px-4 py-2 text-center text-3xl text-txt">POST</button>
        </div>
      </div>
    </main>
  );
}

export default Paint;