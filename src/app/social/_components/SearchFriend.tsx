"use client";

import { useRef } from "react";

import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";

export default function Search() {
  // const session = await auth();
  // if (!session || !session?.user?.id) {
  //   redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  // }
  // const userId = session.user.id;

  const textareaRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevent line break
      const content = textareaRef.current?.value;
      if (!content) return;
      router.push(`/social/?search=${content}`);
      textareaRef.current.value = "";
    }
  };

  return (
    <Input
      placeholder="search"
      name="searchFriend"
      ref={textareaRef}
      onKeyDown={handleSearch}
      className="rounded-full border-4 border-txt_7 text-xl text-txt_7"
    />
  );
}
