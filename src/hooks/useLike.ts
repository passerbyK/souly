import { useState } from "react";

import { useRouter } from "next/navigation";

export default function useLike() {
  const [ loading, setLoading ] = useState(false);
  const router = useRouter();

  const likePost = async ({
    postId,
    userId,
  }: {
    postId: string;
    userId: string;
  }) => {
    if (loading) return;
    setLoading(true);

    // console.log(postId);
    // console.log(userId);

    const res = await fetch("/api/likes", {
      method: "POST",
      body: JSON.stringify({
        postId,
        userId,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    router.refresh();
    setLoading(false);
  };

  const unlikePost = async ({
    postId,
    userId,
  }: {
    postId: string;
    userId: string;
  }) => {
    if (loading) return;

    setLoading(true);
    const res = await fetch("/api/likes", {
      method: "DELETE",
      body: JSON.stringify({
        postId,
        userId,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    router.refresh();
    setLoading(false);
  };

  return {
    likePost,
    unlikePost,
    loading,
  };
}
