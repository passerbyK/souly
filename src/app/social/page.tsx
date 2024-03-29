import { FaUserClock, FaUserTimes } from "react-icons/fa";
import { IoLogoSnapchat } from "react-icons/io";

import { redirect } from "next/navigation";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { subjectsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import { getAddedFriends } from "./_components/action";

async function SocialPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userId = session.user.id;

  const friends = await getAddedFriends(userId);
  const newestFriendId = friends == null ? null : friends[0].userId;
  if (newestFriendId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/social/${newestFriendId}`);
  }

  const [subject] = await db
    .select({ subject: subjectsTable.subject })
    .from(subjectsTable)
    .where(eq(subjectsTable.userId, userId ?? " "));

  if (!subject) {
    redirect("/preference");
  }

  return (
    <div className="mt-0 flex h-full w-full items-center justify-center bg-brand_2 md:mt-20 lg:mt-0">
      <div className="flex flex-col items-center justify-center">
        {!searchParams?.error ? (
          <>
            <IoLogoSnapchat size={100} className="text-bdr_3" />
            <p className="pt-6 text-center text-2xl font-semibold text-bdr_3">
              Invite your friends to paint with you.
            </p>
          </>
        ) : searchParams?.error == "nothing" ? (
          <>
            <FaUserTimes size={100} className="text-bdr_3" />
            <p className="pt-6 text-center text-2xl font-semibold text-bdr_3">
              This account does not exist. <br />
              Invite your friend to join Souly.
            </p>
          </>
        ) : (
          <>
            <FaUserClock size={100} className="text-bdr_3" />
            <p className="pt-6 text-center text-2xl font-semibold text-bdr_3">
              You have already sent a request to the user. <br />
              Wait for his/her response.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
export default SocialPage;
