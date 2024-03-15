import { useCallback, useState } from "react";

import { useRouter } from "next/navigation";

export const usePost = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const posted = useCallback(
    async ({ userId }: { userId: string }) => {
      try {
        const res = await fetch(`/api/paint/${userId}`);

        if (!res.ok) {
          router.push(`/personal`);
          return;
        }

        const data = await res.json();
        return data.posted;
      } catch (error) {
        console.error("Error fetching the topic:", error);
      }
    },
    [router],
  );

  const firstPost = useCallback(
    async ({ userId }: { userId: string }) => {
      try {
        const res = await fetch(`/api/paint/${userId}`);

        if (!res.ok) {
          router.push(`/personal`);
          return;
        }

        const data = await res.json();
        return data.firstPost;
      } catch (error) {
        console.error("Error fetching the topic:", error);
      }
    },
    [router],
  );

  const postPaint = useCallback(
    async ({
      userId,
      topic,
      description,
      image,
    }: {
      userId: string;
      topic: string;
      description: string;
      image: string;
    }) => {
      setLoading(true);
      if (!userId) return;

      try {
        const res = await fetch(`/api/paint/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            topic: topic,
            description: description,
            image: image,
          }),
        });
        if (!res.ok) {
          router.push(`/personal`);
          return;
        }
      } catch (error) {
        console.error("Error posting your painting:", error);
      } finally {
        window.location.href = `/personal`;
        setLoading(false);
      }
    },
    [router],
  );

  const fetchTopic = useCallback(
    async ({ userId }: { userId: string }) => {
      try {
        const res = await fetch(`/api/paint/topic/${userId}`);

        if (!res.ok) {
          router.push(`/personal`);
          return;
        }

        const data = await res.json();
        return data.topic;
      } catch (error) {
        console.error("Error fetching the topic:", error);
      }
    },
    [router],
  );

  return {
    postPaint,
    fetchTopic,
    posted,
    firstPost,
    loading,
  };
};
