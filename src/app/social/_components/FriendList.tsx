//import SearchFriend from "./SearchFriend";
import { redirect } from "next/navigation";

import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import AddDialog from "./AddDialog";
import Friend from "./Friend";
import RequestDialog from "./RequestDialog";
import { getAddedFriends } from "./action";

async function FriendList() {
  const session = await auth();
  console.log(session?.user);
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userId = session.user.id;

  const friends = await getAddedFriends(userId);
  // const friends = [
  //   { id: "1", display_id: "ffdvnjgmorivgjoim", name: "vivi", topic: "sun" },
  //   {
  //     id: "2",
  //     display_id: "dvnjscjkfcnhhkmkf",
  //     name: "winnie",
  //     topic: "flower",
  //   },
  //   {
  //     id: "3",
  //     display_id: "mkvgclimjiomivmhfh",
  //     name: "xiang yi",
  //     topic: "sky",
  //   },
  //   { id: "1", display_id: "ffdvnjgmorivgjoim", name: "vivi", topic: "sun" },
  //   {
  //     id: "2",
  //     display_id: "dvnjscjkfcnhhkmkf",
  //     name: "winnie",
  //     topic: "flower",
  //   },
  //   {
  //     id: "3",
  //     display_id: "mkvgclimjiomivmhfh",
  //     name: "xiang yi",
  //     topic: "sky",
  //   },
  //   { id: "1", display_id: "ffdvnjgmorivgjoim", name: "vivi", topic: "sun" },
  //   {
  //     id: "2",
  //     display_id: "dvnjscjkfcnhhkmkf",
  //     name: "winnie",
  //     topic: "flower",
  //   },
  //   {
  //     id: "3",
  //     display_id: "mkvgclimjiomivmhfh",
  //     name: "xiang yi",
  //     topic: "sky",
  //   },
  // ];

  return (
    <div className="flex h-full bg-brand_2">
      <div className="relative m-4 flex flex-col overflow-y-scroll rounded-2xl bg-nav p-4">
        <p className="p-2 text-4xl text-txt_7">Your friends</p>
        {/* <SearchFriend />  */}
        <Input
          placeholder="search"
          name="searchFriend"
          className="rounded-full border-4 border-txt_7 text-xl text-txt_7"
        />
        <section className="flex w-full flex-col divide-y-4 divide-slate-400/25 overflow-y-scroll pb-12">
          {friends &&
            friends.map(async (friend) => (
              <Friend
                key={friend.id}
                displayId={friend.user.displayId}
                name={friend.user.username}
                // topic={friend.topic}
              />
            ))}
        </section>
        <div className="absolute bottom-4 flex w-10/12 flex-col gap-4 xl:flex-row xl:gap-6">
          <AddDialog />
          <RequestDialog />
        </div>
      </div>
    </div>
  );
}

export default FriendList;
