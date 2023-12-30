import { redirect } from "next/navigation";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { subjectsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import FriendList from "./_components/FriendList";
import { Button } from "@/components/ui/button";
import { FaHeart } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  children: React.ReactNode;
};

async function Social({ children }: Props) {
  const session = await auth();
  if (!session) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }

  const id = session.user?.id;

  const [subject] = await db
    .select({ subject: subjectsTable.subject })
    .from(subjectsTable)
    .where(eq(subjectsTable.userId, id ?? " "));

  if (!subject) {
    redirect("/preference");
  }

  return (
    // overflow-hidden for parent to hide scrollbar
    <main className="flex h-screen w-full flex-col justify-center overflow-y-scroll md:overflow-hidden">
      {/* overflow-y-scroll for child to show scrollbar */}
      <div className="h-1/6 w-full"></div>
      <div className="flex-rows md:flex h-5/6 bg-brand_2">
        <nav className="h-[280px] lg:h-full md:flex md:w-2/5 md:my-20 lg:my-0 lg:w-1/5 min-w-min flex-col justify-start overflow-y-auto border-r bg-nav">
          <FriendList />
        </nav>
        {/* overflow-y-scroll for child to show scrollbar */}
        <div className="w-full md:mt-30 lg:mt-0 md:w-4/5 overflow-y-auto">{children}</div>
      </div>
    </main>
  );
}

export default Social;
