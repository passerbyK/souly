import { redirect } from "next/navigation";

import { eq, desc } from "drizzle-orm";

import { db } from "@/db";
import { postsTable, subjectsTable, usersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import Calendar from "./_compoments/Calendar";

type Props = {
  children: React.ReactNode;
};

async function PersonalLayout({ children }: Props) {
  const session = await auth();
  console.log(session);
  if (!session) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }

  const id = session.user?.id;
  console.log(id);
  const [user] = await db
    .select({
      lastingDay: usersTable.lastingDays,
      startDay: usersTable.createdAt,
    })
    .from(usersTable)
    .where(eq(usersTable.displayId, id ?? " "));

  const startDay = new Date(user.startDay);
  const endDay = new Date(user.startDay);
  endDay.setDate(startDay.getDate() + user.lastingDay);

  const [subject] = await db
    .select({ subject: subjectsTable.subject })
    .from(subjectsTable)
    .where(eq(subjectsTable.userId, id ?? " "));

  const posts = await db
    .select({
      createdAt: postsTable.createdAt,
    })
    .from(postsTable)
    .orderBy(desc(postsTable.createdAt))
    .where(eq(postsTable.userId, id ?? " "))
    .execute();
  const successDays = posts.map((post) => new Date(post.createdAt));

  return (
    <main className="h-screen min-h-screen w-full">
      <div className="h-1/6 w-full"></div>
      <div className="relative flex h-5/6 w-full bg-body">
        <div className="flex w-3/4 flex-wrap overflow-y-auto px-8 py-6">
          {children}
        </div>
        <div className="mx-6 my-6 w-1/4 flex-col items-center overflow-hidden rounded-2xl bg-header text-2xl font-bold text-[#998D73]">
          <div className="m-4 h-[12%] items-center justify-center rounded-2xl">
            <div className="mb-2 text-center"> Topic </div>
            <div className="flex h-[50%] w-full items-center justify-center rounded-2xl bg-[#D8D2C7] align-middle">
              {" "}
              {subject.subject}{" "}
            </div>
          </div>
          <div className="m-4 h-[12%] items-center justify-center">
            <div className="mb-2 text-center"> Complete </div>
            <div className="flex h-[50%] w-full items-center justify-center rounded-2xl bg-[#D8D2C7]">
              {" "}
              {posts.length}/{user.lastingDay} days{" "}
            </div>
          </div>
          <div className="mb-2 text-center">Daily Record</div>
          <div className="mx-4 flex h-[55%] items-center justify-center rounded-2xl bg-[#B7AD97] p-1 text-base text-black">
            <Calendar
              startDay={startDay}
              endDay={endDay}
              successDays={successDays}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default PersonalLayout;
