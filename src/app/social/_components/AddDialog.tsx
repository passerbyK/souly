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
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import { requestFriend } from "./action";

async function AddDialog() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userId = session.user.id;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="items-center rounded-full border-2 md:border-4 border-bdr_3 bg-btn_2 px-2 md:px-3 py-1 text-base md:text-xl text-bdr_3 hover:bg-description">
          Add
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="py-1 text-3xl text-description">
            Add Friend!
          </DialogTitle>
          <DialogDescription className="text-xl text-txt_5">
            Who do you want to share your paintings with?
          </DialogDescription>
        </DialogHeader>
        <form
          action={async (e) => {
            "use server";
            const otherUser = e.get("otherUser");
            if (!otherUser) return;
            if (typeof otherUser !== "string") return;
            const result = await requestFriend(userId, otherUser);
            // console.log(result);
            if (!result) {
              // final TODO: tell user no this specific user or chat already exist!!!
            } else {
              redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/social`);
            }
          }}
          className="flex flex-row gap-4"
        >
          <Input
            placeholder="Type in his/her email."
            name="otherUser"
            className="items-center rounded-lg border-4 border-txt_4 bg-btn_3 px-3 py-1 text-xl text-txt_4"
          />
          <Button
            type="submit"
            className="items-center rounded-full border-4 border-bdr_3 bg-btn_2 px-3 py-1 text-xl text-bdr_3 hover:bg-description"
          >
            Add
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddDialog;
