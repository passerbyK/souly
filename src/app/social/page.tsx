//import { auth } from "@/lib/auth";
import { IoLogoSnapchat } from "react-icons/io";

import { redirect } from "next/navigation";

import { publicEnv } from "@/lib/env/public";

//import { getChats } from "./_components/actions";

async function DocsPage() {
  // const session = await auth();
  // if (!session || !session?.user?.id) {
  //   redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  // }
  // const userId = session.user.id;

  // const chats = await getChats(userId);
  // const length = chats.length;
  // const newestChat = (length == 0) ? null : chats[length-1].chatId;
  // if (newestChat) {
  //   redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs/${newestChat}`);
  // }

  redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/social/ffdvnjgmorivgjoim`);

  return (
    <div className="flex h-[90vh] w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <IoLogoSnapchat size={80} />
        <p className="pt-6 text-lg font-semibold text-slate-700">
          Invite your friends to paint with you.
        </p>
      </div>
    </div>
  );
}
export default DocsPage;
