import { useEffect, useRef, useState } from "react";

import type { Point, Draw } from "@/lib/types/shared_types";

export const useDraw = (
  onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void,
) => {
  const [mouseDown, setMouseDown] = useState(false);
  const [touchDown, setTouchDown] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPoint = useRef<null | Point>(null);

  const onMouseDown = () => setMouseDown(true);
  const onTouchStart = () => setTouchDown(true);

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!mouseDown) return;
      const currentPoint = computePointInCanvas(e);

      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx || !currentPoint) return;

      onDraw({ ctx, currentPoint, prevPoint: prevPoint.current });
      prevPoint.current = currentPoint;
    };

    const computePointInCanvas = (e: MouseEvent | Touch) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      return { x, y };
    };

    const mouseUpHandler = () => {
      setMouseDown(false);
      prevPoint.current = null;
    };

    const touchHandler = (e: TouchEvent) => {
      if (!touchDown) return;
      const touch = e.touches[0];
      const currentPoint = computePointInCanvas(touch);

      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx || !currentPoint) return;

      onDraw({ ctx, currentPoint, prevPoint: prevPoint.current });
      prevPoint.current = currentPoint;
    };

    const touchUpHandler = () => {
      setTouchDown(false);
      prevPoint.current = null;
    };

    // Add event listeners
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("mousemove", handler);
      canvas.addEventListener("touchmove", touchHandler);
      window.addEventListener("mouseup", mouseUpHandler);
      window.addEventListener("touchend", touchUpHandler);
    }

    // Remove event listeners
    return () => {
      if (canvas) {
        canvas.removeEventListener("mousemove", handler);
        canvas.removeEventListener("touchmove", touchHandler);
        window.removeEventListener("mouseup", mouseUpHandler);
        window.removeEventListener("touchend", touchUpHandler);
      }
    };
  }, [onDraw, mouseDown, touchDown]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
  }, []);

  return { canvasRef, onMouseDown, onTouchStart, clear };
};
