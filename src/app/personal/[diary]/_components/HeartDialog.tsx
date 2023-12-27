import { IoPersonCircleSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type HeartProps = {
  likeslist: string[];
};

async function HeartDialog({likeslist}:HeartProps) {
  // const session = await auth();
  // if (!session?.user?.id) return null;
  // const userId = session.user.id

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="items-center rounded-full px-3 py-1 text-3xl bg-null text-bdr_3 hover:bg-btn_2">
          <FaHeart />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="py-1 text-3xl text-description">
            People who likes your painting
          </DialogTitle>
          <DialogDescription className="text-xl text-txt_5">
            You can also see their paintings on social page !
          </DialogDescription>
        </DialogHeader>
        {likeslist.length>0? (
        likeslist.map(async (like, i) => (
          <div
            key={i}
            className="group flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg p-2 hover:bg-yellow-100"
          >
            <div className="items-center gap-2">
              <div className="flex gap-2 text-2xl font-semibold text-black">
                <IoPersonCircleSharp className="text-4xl"/>
                {like}
              </div>
            </div>
            <div className="flex gap-2"></div>
          </div>
        ))
      ) : (
        <div className="text-black">No one likes your painting yet.</div>
      )}
      </DialogContent>
    </Dialog>
  );
}

export default HeartDialog;