import { AiFillDelete } from "react-icons/ai";

import { revalidatePath } from "next/cache";
// import Link from "next/link";
import { redirect } from "next/navigation";

//import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

// import { deleteFriend, getFriend } from "./actions";
// import { getPainting } from "../[chatId]/_components/actions";
import AddDialog from "./AddDialog";
import RequestDialog from "./RequestDialog";
//import SearchFriend from "./SearchFriend";
import { Input } from "@/components/ui/input";

async function FriendList() {
  // const session = await auth();
  // if (!session || !session?.user?.id) {
  //   redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  // }
  // const userId = session.user.id;

  // get the user's all friends
//  const friends = await getFriends(userId);
  const friends = [
    {id: "1", display_id: "ffdvnjgmorivgjoim", name: "vivi", topic: "sun"},
    {id: "2", display_id: "dvnjscjkfcnhhkmkf", name: "winnie", topic: "flower"},
    {id: "3", display_id: "mkvgclimjiomivmhfh", name: "xiang yi", topic: "sky"},
  ];

  return (
    <div className="flex h-full" style={{ backgroundColor: '#DFD3C4' }}>
    <div className="flex flex-col overflow-y-scroll m-4 p-4 rounded-2xl" style={{ backgroundColor: '#FFEFDC' }}>
      <h1 className="text-3xl p-2" style={{ color: '#5C574D' }}>
        Your friends
      </h1>
      {/* <SearchFriend />  */}
      <Input 
      placeholder="search" 
      name="searchFriend" 
      className="rounded-full border-4 text-xl" 
      style={{ color: '#5C574D', borderColor: '#5C574D' }}/>
      <section className="flex w-full flex-col divide-y-4 divide-slate-400/25">
        {friends.map (async (friend , i) => {
          return (
            <div
              key={i}
              className="group flex w-full cursor-pointer items-center justify-between gap-2 p-2 hover:bg-slate-200 "
            >
              {/* <Link
                className="grow px-3 py-1"
                href={`/painting/${chat.chat.displayId}`}
              > */}
                <div className="items-center gap-2">
                  <div className="flex text-2xl gap-2 font-semibold" style={{ color: '#000000' }}>
                    {friend.name}
                  </div>
                  <div className="flex text-xl gap-2 whitespace-normal break-words" style={{ color: '#000000' }}>
                    {friend.topic}
                  </div>
                </div>
              {/*</Link>*/}
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
                  <AiFillDelete size={20} />
                </button>
              </form>
            </div>
          );
        })}
      </section>
      <div className="gap-4 sticky bottom-0 flex justify-evenly">
        <AddDialog />
        <RequestDialog />
      </div>
    </div>
    </div>
  );
}

export default FriendList;
