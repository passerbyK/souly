import { IoLogoSnapchat } from "react-icons/io";

import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import { getAddedFriends } from "./_components/action";

async function DocsPage() {
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

  return (
    <div className="mt-0 flex h-full w-full items-center justify-center bg-brand_2 md:mt-20 lg:mt-0">
      <div className="flex flex-col items-center justify-center">
        <IoLogoSnapchat size={100} className="text-bdr_3" />
        <p className="pt-6 text-center text-2xl font-semibold text-bdr_3">
          Invite your friends to paint with you.
        </p>
      </div>
    </div>
  );
}
export default DocsPage;
