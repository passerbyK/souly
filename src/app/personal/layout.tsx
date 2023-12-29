import { redirect } from "next/navigation";

import { eq, desc, gte, lte, and } from "drizzle-orm";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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

  const today = new Date();
  const startTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0,
    0,
  );
  const endTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    59,
    59,
    999,
  );

  const todayPost = await db
    .select({
      createdAt: postsTable.createdAt,
    })
    .from(postsTable)
    .orderBy(desc(postsTable.createdAt))
    .where(
      and(
        eq(postsTable.userId, id ?? " "),
        gte(postsTable.createdAt, startTime),
        lte(postsTable.createdAt, endTime),
      ),
    )
    .execute();

  if (!subject) {
    redirect("/preference");
  }

  console.log(posts);
  return (
    <main className="h-screen min-h-screen w-full">
      {posts.length === 0 && (
        <AlertDialog defaultOpen>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl">
                You have't painted yet !
              </AlertDialogTitle>
              <AlertDialogTitle className="text-2xl">
                We're waiting for you !
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Let's paint !</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {posts.length !== 0 && todayPost.length === 0 && (
        <AlertDialog defaultOpen>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl">
                You have't painted today !
              </AlertDialogTitle>
              <AlertDialogTitle className="text-2xl">
                Let's paint !
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Ok !</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <div className="h-1/6 w-full"></div>
      <div className="relative h-5/6 w-full bg-brand_2 lg:flex">
        <div className=" flex w-full justify-center overflow-hidden p-4 text-xl font-bold lg:hidden lg:items-center lg:rounded-2xl">
          <div className="m-2 flex w-[20%] flex-col justify-center md:w-[30%] ">
            <div className="mb-3 text-center md:mb-5"> Topic </div>
            <div className="mb-3 flex h-[30%] w-full items-center justify-center rounded-2xl bg-[#B7AD97] md:mb-5 lg:h-[50%] ">
              {" "}
              {subject.subject}{" "}
            </div>
            <div className="mb-3 text-center md:mb-5"> Complete </div>
            <div className="flex h-[30%] w-full items-center justify-center rounded-2xl bg-[#B7AD97] lg:h-[50%]">
              {" "}
              {posts.length}/{user.lastingDay} days{" "}
            </div>
          </div>

          <div className="m-4 flex w-[60%] flex-col md:w-[40%] lg:items-center">
            <div className="mb-5 text-center">Daily Record</div>
            <div className="mx-4 flex items-center justify-center rounded-2xl bg-[#B7AD97] p-1 text-base text-black lg:h-[54%]">
              <Calendar
                startDay={startDay}
                endDay={endDay}
                successDays={successDays}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-wrap gap-4  overflow-y-auto bg-brand_2 px-24 py-6 md:px-36 lg:w-3/4 lg:px-8">
          {children}
        </div>
        <div className="mx-6 my-6 hidden w-1/4 flex-col items-center justify-center overflow-hidden rounded-2xl bg-header text-xl font-bold text-[#998D73] lg:flex">
          <div className="flex h-full w-full flex-col justify-center">
            <div className="mx-4 h-[12%] items-center  rounded-2xl">
              <div className="mb-1 text-center"> Topic </div>
              <div className="flex h-[50%] items-center justify-center rounded-2xl bg-[#D8D2C7]">
                {" "}
                {subject.subject}{" "}
              </div>
            </div>
            <div className="m-4 h-[12%] items-center justify-center">
              <div className="mb-1 text-center"> Complete </div>
              <div className="flex h-[50%] items-center justify-center rounded-2xl bg-[#D8D2C7]">
                {" "}
                {posts.length}/{user.lastingDay} days{" "}
              </div>
            </div>
            <div className="mb-1 text-center">Daily Record</div>
            <div className="mx-4 flex h-[54%] items-center justify-center rounded-2xl bg-[#B7AD97] p-1 text-base text-black">
              <Calendar
                startDay={startDay}
                endDay={endDay}
                successDays={successDays}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PersonalLayout;
