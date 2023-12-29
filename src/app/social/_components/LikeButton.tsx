"use client";

import { useState } from "react";
import type { EventHandler, MouseEvent } from "react";
import { GoHeartFill } from "react-icons/go";

import useLike from "@/hooks/useLike";
import { cn } from "@/lib/utils/shadcn";

type LikeButtonProps = {
  initialLikes: number;
  initialLiked: boolean;
  postId: string;
  userId: string;
};

export default function LikeButton({
  initialLikes,
  initialLiked,
  postId,
  userId,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const { likePost, unlikePost, loading } = useLike();

  const handleClick: EventHandler<MouseEvent> = async () => {
    if (liked) {
      await unlikePost({
        postId,
        userId,
      });
      setLikesCount((prev) => prev - 1);
      setLiked(false);
    } else {
      await likePost({
        postId,
        userId,
      });
      setLikesCount((prev) => prev + 1);
      setLiked(true);
    }
  };

  return (
    <button
      className={cn("flex w-16 items-center gap-4")}
      onClick={handleClick}
      disabled={loading}
    >
      <div
        className={cn(
          "flex items-center gap-1 rounded-full transition-colors duration-300",
          liked && "text-red-700",
        )}
      >
        <GoHeartFill size={48} />
      </div>
      {likesCount >= 0 && likesCount}
    </button>
  );
}
