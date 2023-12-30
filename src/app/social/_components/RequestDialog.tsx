import { AiFillDelete } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import { addFriend, deleteFriend, getRequestedUser } from "./action";

async function RequestDialog() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userId = session.user.id;

  const request_friends = await getRequestedUser(userId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative">
          <Button className="w-full items-center rounded-full border-2 border-bdr_3 bg-btn_2 px-2 text-base text-bdr_3 hover:bg-description md:border-4 md:px-3 md:py-1 md:text-xl">
            Request
          </Button>
          <div
            className={
              request_friends != undefined
                ? "visible absolute right-0 top-0 flex h-6 w-6 -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full bg-txt_7 text-xl text-white"
                : "invisible"
            }
          >
            {request_friends?.length}
          </div>
        </div>
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
        {request_friends &&
          request_friends.map(async (friend, i) => {
            return (
              <div
                key={i}
                className="group flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg p-2 hover:bg-yellow-100"
              >
                <div className="items-center gap-2">
                  <div className="flex gap-2 text-2xl font-semibold text-black">
                    {friend.user.username}
                  </div>
                </div>
                <div className="flex gap-2">
                  <form
                    className="px-2 hover:text-[#8E6920] group-hover:flex"
                    action={async () => {
                      "use server";
                      const friendId = await addFriend(
                        userId,
                        friend.user.displayId,
                      );
                      revalidatePath("/social");
                      redirect(
                        `${publicEnv.NEXT_PUBLIC_BASE_URL}/social/${friendId}`,
                      );
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
                      await deleteFriend(userId, friend.user.displayId);
                      revalidatePath("/social");
                      redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/social`);
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
