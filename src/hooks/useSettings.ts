import { useCallback } from "react";

import { useRouter } from "next/navigation";

export const useSettings = () => {
  const router = useRouter();

  const postSettings = useCallback(
    async ({
      userId,
      subject,
      lastingDays,
      isNotified,
      paintingTime,
    }: {
      userId: string;
      subject: string;
      lastingDays: number;
      isNotified: boolean;
      paintingTime: string;
    }) => {
      if (!userId) return;

      try {
        const res = await fetch(`/api/settings/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            subject: subject,
            lastingDays: lastingDays,
            isNotified: isNotified,
            paintingTime: paintingTime,
          }),
        });
        if (!res.ok) {
          router.refresh();
          return;
        }
      } catch (error) {
        console.error("Error posting your settings:", error);
      }
    },
    [router],
  );

  const fetchSettings = useCallback(
    async (userId: string) => {
      if (!userId) return;

      try {
        const res = await fetch(`/api/settings/${userId}`);
        if (!res.ok) {
          console.error("Error fetching your settings:", res);
          router.refresh();
          return;
        }
        const data = await res.json();
        return data.settings;
      } catch (error) {
        console.error("Error fetching your settings:", error);
      }
    },
    [router],
  );

  const isSettings = useCallback(
    async (userId: string) => {
      if (!userId) return;

      try {
        const res = await fetch(`/api/settings/${userId}`);
        if (!res.ok) {
          console.error("Error fetching your settings:", res);
          router.refresh();
          return;
        }
        const data = await res.json();
        return data.isDone;
      } catch (error) {
        console.error("Error fetching your settings:", error);
      }
    },
    [router],
  );

  const updateSettings = useCallback(
    async ({
      userId,
      subject,
      lastingDays,
      isNotified,
      paintingTime,
    }: {
      userId: string;
      subject: string;
      lastingDays: number;
      isNotified: boolean;
      paintingTime: string;
    }) => {
      if (!userId) return;

      try {
        const res = await fetch(`/api/settings/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            subject: subject,
            lastingDays: lastingDays,
            isNotified: isNotified,
            paintingTime: paintingTime,
          }),
        });
        console.log("res", res);
        if (!res.ok) {
          router.refresh();
          return;
        }
      } catch (error) {
        console.error("Error updating your settings:", error);
      }
    },
    [router],
  );

  return {
    postSettings,
    fetchSettings,
    isSettings,
    updateSettings
  };
};
