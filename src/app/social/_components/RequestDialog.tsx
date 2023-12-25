// import { BiSolidMessageRoundedAdd } from "react-icons/bi";
// import { revalidatePath } from "next/cache";
// import { auth } from "@/lib/auth";
import { AiFillDelete } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// import { createChat } from "./actions";

async function RequestDialog() {
  // const session = await auth();
  // if (!session?.user?.id) return null;
  // const userId = session.user.id;

  const request_friends = [
    { id: "4", display_id: "svrkinhlcgmoidrngkdh", name: "aaa", topic: "sun" },
    {
      id: "5",
      display_id: "vgsjclimjeihmgshmrgi",
      name: "bbb",
      topic: "flower",
    },
    { id: "6", display_id: "nchmunhmgkisnsxmiafl", name: "ccc", topic: "sky" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="items-center rounded-full border-4 px-3 py-1 text-xl border-bdr_3 text-bdr_3 bg-btn_2 hover:bg-description">
          Request
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="py-1 text-3xl text-description">
            Friend requests
          </DialogTitle>
          <DialogDescription className="text-xl text-txt_5">
            You can decide who you want to add.
          </DialogDescription>
        </DialogHeader>
        {request_friends.map(async (friend, i) => {
          return (
            <div
              key={i}
              className="group flex w-full cursor-pointer items-center justify-between gap-2 p-2 hover:bg-yellow-100 rounded-lg"
            >
              <div className="items-center gap-2">
                <div className="flex gap-2 text-2xl font-semibold text-black">
                  {friend.name}
                </div>
              </div>
              <div className="flex gap-2">
                <form
                  className="px-2 hover:text-[#8E6920] group-hover:flex"
                  action={async () => {
                    "use server";
                    //await deleteFriend(friend.display_id);
                    //revalidatePath("/social");
                    //redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/social`);
                  }}
                >
                  <button type={"submit"}>
                    <IoMdAddCircle size={24} />
                  </button>
                </form>
                <form
                  className="px-2 hover:text-[#8E6920] group-hover:flex"
                  action={async () => {
                    "use server";
                    //await deleteFriend(friend.display_id);
                    //revalidatePath("/social");
                    //redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/social`);
                  }}
                >
                  <button type={"submit"}>
                    <AiFillDelete size={24} />
                  </button>
                </form>
              </div>
            </div>
          );
        })}
      </DialogContent>
    </Dialog>
  );
}

export default RequestDialog;
