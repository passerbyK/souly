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
  // const search = searchParams?.search;

  // const friends = (search) ? await getAddedFriends_search(userId, search) : await getAddedFriends(userId);
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
  const friends = await getAddedFriends(userId);

  return (
    <div className="flex h-full bg-brand_2">
      <div className="relative m-4 flex w-full flex-col overflow-y-auto rounded-2xl bg-nav p-4">
        <p className="p-2 text-4xl text-txt_7">Your friends</p>
        {/* <SearchFriend /> */}
        <section className="flex w-full flex-col divide-y-4 divide-slate-400/25 overflow-y-auto pb-12">
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
