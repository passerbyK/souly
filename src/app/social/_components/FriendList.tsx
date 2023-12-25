import { AiFillDelete } from "react-icons/ai";

import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

//import SearchFriend from "./SearchFriend";
import { Input } from "@/components/ui/input";
//import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

// import { deleteFriend, getFriend } from "./actions";
// import { getPainting } from "../[chatId]/_components/actions";
import AddDialog from "./AddDialog";
import RequestDialog from "./RequestDialog";

async function FriendList() {
  // const session = await auth();
  // if (!session || !session?.user?.id) {
  //   redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  // }
  // const userId = session.user.id;

  // get the user's all friends
  //  const friends = await getFriends(userId);
  const friends = [
    { id: "1", display_id: "ffdvnjgmorivgjoim", name: "vivi", topic: "sun" },
    { id: "2", display_id: "dvnjscjkfcnhhkmkf", name: "winnie", topic: "flower", },
    { id: "3", display_id: "mkvgclimjiomivmhfh", name: "xiang yi", topic: "sky", },
  ];

  return (
    <div className="flex h-full bg-brand_2">
      <div className="m-4 flex flex-col overflow-y-scroll rounded-2xl p-4 bg-nav">
        <h1 className="p-2 text-3xl text-txt_7">
          Your friends
        </h1>
        {/* <SearchFriend />  */}
        <Input
          placeholder="search"
          name="searchFriend"
          className="rounded-full border-4 text-xl text-txt_7 border-txt_7"
        />
        <section className="flex w-full flex-col divide-y-4 divide-slate-400/25">
          {friends.map(async (friend, i) => {
            return (
              <div
                key={i}
                className="group flex w-full cursor-pointer items-center justify-between gap-2 p-2 hover:bg-slate-200 "
              >
                <Link
                  className="grow px-3 py-1"
                  href={`/social/${friend.display_id}`}
                >
                  <div className="items-center gap-2">
                    <div className="flex gap-2 text-2xl font-semibold text-black">
                      {friend.name}
                    </div>
                    <div className="flex gap-2 whitespace-normal break-words text-xl text-black">
                      {friend.topic}
                    </div>
                  </div>
                </Link>
                <form
                  className="hidden px-2 text-slate-400 hover:text-red-400 group-hover:flex"
                  action={async () => {
                    "use server";
                    //await deleteFriend(friend.display_id);
                    revalidatePath("/social");
                    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/social`);
                  }}
                >
                  <button type={"submit"}>
                    <AiFillDelete size={24} />
                  </button>
                </form>
              </div>
            );
          })}
        </section>
        <div className="sticky bottom-0 flex justify-evenly gap-4">
          <AddDialog />
          <RequestDialog />
        </div>
      </div>
    </div>
  );
}

export default FriendList;
