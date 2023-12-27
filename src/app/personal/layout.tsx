import { db } from "@/db";
import { eq, desc } from "drizzle-orm";
import { postsTable, subjectsTable, usersTable } from "@/db/schema";
import { redirect } from "next/navigation";
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
      startDay: usersTable.createdAt
    })
    .from(usersTable)
    .where(eq(usersTable.displayId, id??" "))

  const startDay = new Date(user.startDay);
  const endDay = new Date(user.startDay);
  endDay.setDate(startDay.getDate() + user.lastingDay);

  const [subject] = await db
    .select({subject: subjectsTable.subject})
    .from(subjectsTable)
    .where(eq(subjectsTable.userId, id??" "))

  const posts = await db
    .select({
      createdAt: postsTable.createdAt,
    })
    .from(postsTable)
    .orderBy(desc(postsTable.createdAt))
    .where(eq(postsTable.userId, id??" "))
    .execute();
  const successDays = posts.map((post) => new Date(post.createdAt));

    return (
      <main className="h-screen min-h-screen w-full">
        <div className="h-1/6 w-full"></div>
          <div className="h-5/6 relative flex w-full bg-body">
            <div className="flex w-3/4 overflow-y-auto flex-wrap px-8 py-6">
              {children}
            </div>
            <div className="mx-6 my-6 w-1/4 flex-col rounded-2xl bg-header items-center text-2xl font-bold text-[#998D73] overflow-hidden">
              <div className="m-4 h-[12%] items-center justify-center rounded-2xl">
                <div className="text-center mb-2"> Topic </div>
                <div className="w-full h-[50%] flex items-center justify-center align-middle rounded-2xl bg-[#D8D2C7]"> {subject.subject} </div>
              </div>
              <div className="m-4 h-[12%] items-center justify-center">
                <div className="text-center mb-2"> Complete </div>
                <div className="w-full h-[50%] flex items-center justify-center rounded-2xl bg-[#D8D2C7]"> {posts.length}/{user.lastingDay} days </div>
              </div>
              <div className="text-center mb-2">Daily Record</div>
              <div className="mx-4 flex h-[55%] items-center justify-center rounded-2xl bg-[#B7AD97] p-1 text-base text-black">
                <Calendar 
                startDay = {startDay}
                endDay = {endDay}
                successDays={successDays}
                />
              </div>
            </div>
          </div>
      </main>
    );
  }
  
  export default PersonalLayout;