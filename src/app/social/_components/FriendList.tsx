import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import AddDialog from "./AddDialog";
import Friend from "./Friend";
import RequestDialog from "./RequestDialog";
import { getAddedFriends } from "./action";

// import SearchFriend from "./SearchFriend";

// type PageProps = {
//   searchParams: {
//     search?: string;
//   };
// };

async function FriendList() {
  const session = await auth();
  console.log(session?.user);
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userId = session.user.id;
  const friends = await getAddedFriends(userId);

  return (
    <div className="flex h-full bg-brand_2">
      <div className="relative m-4 flex w-full flex-col overflow-y-auto rounded-2xl bg-nav p-4">
        <div className="flex w-full items-center gap-2 md:hidden">
          <p className="p-2 text-2xl text-txt_7 md:text-3xl">Your friends</p>
          <div className="flex gap-2 xl:flex-row xl:gap-6">
            <AddDialog />
            <RequestDialog />
          </div>
        </div>
        <p className="hidden p-2 text-2xl text-txt_7 md:block md:text-4xl">
          Your friends
        </p>
        <section className="flex w-full flex-col divide-y-4 divide-slate-400/25 overflow-y-auto pb-12">
          {friends &&
            friends.map(async (friend) => (
              <Friend
                key={friend.id}
                displayId={friend.user.displayId}
                name={friend.user.username}
              />
            ))}
        </section>
        <div className="absolute bottom-4  hidden w-10/12 flex-col gap-4 md:flex xl:flex-row xl:gap-6">
          <AddDialog />
          <RequestDialog />
        </div>
      </div>
    </div>
  );
}

export default FriendList;
