import { redirect } from "next/navigation";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { subjectsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import FriendList from "./_components/FriendList";

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
    <main className="flex h-screen w-full flex-col overflow-hidden">
      {/* overflow-y-scroll for child to show scrollbar */}
      <div className="h-1/6 w-full"></div>
      <div className="flex-rows flex h-5/6">
        <nav className="flex w-1/5 min-w-min flex-col overflow-y-auto border-r bg-nav">
          <FriendList />
        </nav>
        {/* overflow-y-scroll for child to show scrollbar */}
        <div className="w-4/5 overflow-y-auto">{children}</div>
      </div>
    </main>
  );
}

export default Social;
