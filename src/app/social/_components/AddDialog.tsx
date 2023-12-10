// import { BiSolidMessageRoundedAdd } from "react-icons/bi";
// import { revalidatePath } from "next/cache";
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
// import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

// import { createChat } from "./actions";

async function AddDialog() {
  // const session = await auth();
  // if (!session?.user?.id) return null;
  // const userId = session.user.id;

  return (
    <Dialog
      style={{
        color: "#A8450F",
        borderColor: "#A8450F",
        backgroundColor: "#E5A582",
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="items-center rounded-full border-4 px-3 py-1 text-xl"
          style={{
            color: "#A8450F",
            borderColor: "#A8450F",
            backgroundColor: "#E5A582",
          }}
        >
          Add
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="py-1 text-3xl" style={{ color: "#D88253" }}>
            Add Friend!
          </DialogTitle>
          <DialogDescription className="text-xl" style={{ color: "#8E6920" }}>
            Who do you want to share your paintings with?
          </DialogDescription>
        </DialogHeader>
        <form
          action={async (e) => {
            "use server";
            const otherUser = e.get("otherUser");
            if (!otherUser) return;
            if (typeof otherUser !== "string") return;
            const result = await createChat(userId, otherUser);
            console.log(result);
            if (!result) {
              // TODO:: tell user no this specific user or chat already exist!!!
            } else {
              redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs/${result}`);
            }
          }}
          className="flex flex-row gap-4"
        >
          <Input
            placeholder="Type in his/her email."
            name="otherUser"
            className="items-center rounded-lg border-4 px-3 py-1 text-xl"
            style={{
              color: "#846425",
              borderColor: "#846425",
              backgroundColor: "#D1C1A1",
            }}
          />
          <Button
            type="submit"
            className="items-center rounded-full border-4 px-3 py-1 text-xl"
            style={{
              color: "#A8450F",
              borderColor: "#A8450F",
              backgroundColor: "#E5A582",
            }}
          >
            Add
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddDialog;
