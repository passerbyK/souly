import { BiSolidMessageRoundedAdd } from "react-icons/bi";

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

async function RequestDialog() {
  // const session = await auth();
  // if (!session?.user?.id) return null;
  // const userId = session.user.id;

  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button 
        className="rounded-full border-4 text-xl items-center px-3 py-1"
        style={{ color: '#A8450F', borderColor: '#A8450F', backgroundColor: '#E5A582' }}>
          Request
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new chat!</DialogTitle>
          <DialogDescription>Who do you want to chat with?</DialogDescription>
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
            }
            else{
              redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs/${result}`);
            }
          }}
          className="flex flex-row gap-4"
        >
          <Input placeholder="Type in his/her username." name="otherUser" />
          <Button type="submit">Add</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default RequestDialog;
