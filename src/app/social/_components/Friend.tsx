import { AiFillDelete } from "react-icons/ai";

import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

import { publicEnv } from "@/lib/env/public";

type FriendProps = {
  displayId: string;
  name: string;
  topic: string;
};

export default function Friend({ displayId, name, topic }: FriendProps) {
  return (
    <div className="group flex w-full cursor-pointer items-center justify-between hover:bg-yellow-100">
      <Link className="grow px-3 py-1" href={`/social/${displayId}`}>
        <div className="items-center gap-2">
          <p className="flex gap-2 text-2xl font-semibold text-black">{name}</p>
          <p className="flex gap-2 whitespace-normal break-words text-xl text-black">
            {topic}
          </p>
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
        <button type="submit">
          <AiFillDelete size={24} />
        </button>
      </form>
    </div>
  );
}
