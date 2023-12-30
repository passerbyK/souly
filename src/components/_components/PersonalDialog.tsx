// import { revalidatePath } from "next/cache";
// import { auth } from "@/lib/auth";
import { IoPersonCircleSharp } from "react-icons/io5";

import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/up_dialog2";
import { publicEnv } from "@/lib/env/public";

import SignOutButton from "./SignOutButton";

async function PersonalDialog() {
  // const session = await auth();
  // if (!session?.user?.id) return null;
  // const userId = session.user.id;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer p-2 text-5xl text-description transition-colors hover:text-description/80 sm:px-4">
          <IoPersonCircleSharp />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-h-[120px]">
        <div className="divide-y-2 divide-slate-400/25 text-2xl text-txt_8">
          <form
            action={async () => {
              "use server";
              redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/settings`);
            }}
          >
            <button
              type="submit"
              className="flex items-center p-1 hover:bg-yellow-700/20"
            >
              Settings
            </button>
          </form>
          {/* <p className="mr-4 flex items-center py-1">Sign Out</p> */}
          <SignOutButton />
          <form
            action="https://docs.google.com/forms/d/e/1FAIpQLSfurYvxAARoDAkmLUb77NwWdfJW63O5-Vzukr7vNwMpvUlQuw/viewform"
            target="_blank"
          >
            <button
              type="submit"
              className="flex items-center p-1 hover:bg-yellow-700/20"
            >
              FeedBack
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PersonalDialog;
