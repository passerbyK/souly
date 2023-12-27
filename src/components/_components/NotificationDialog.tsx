// import { revalidatePath } from "next/cache";
// import { auth } from "@/lib/auth";
import { IoNotifications } from "react-icons/io5";

import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/up_dialog";
import { publicEnv } from "@/lib/env/public";

async function NotificationDialog() {
  // const session = await auth();
  // if (!session?.user?.id) return null;
  // const userId = session.user.id;

  const likes = [
    // id: like table
    // user_displayId: like table
    // user_name: user table
    // painting_id: like table
    // painting_date: painting table
    {
      id: "1",
      user_displayId: "svrkinhlcgmoidrngkdh",
      user_name: "aaa",
      painting_id: "cdgdgc",
      painting_date: "2023/12/25",
    },
    {
      id: "2",
      user_displayId: "cmkhdfkmghndmighdcmk",
      user_name: "bbb",
      painting_id: "cdgdcg",
      painting_date: "2023/12/25",
    },
    {
      id: "5",
      user_displayId: "svrkinhlcgmoidrngkdh",
      user_name: "ccc",
      painting_id: "zdfgxd",
      painting_date: "2023/12/25",
    },
    {
      id: "6",
      user_displayId: "rthbryjvhgdrcfdrcgvv",
      user_name: "ddd",
      painting_id: "bgfcxs",
      painting_date: "2023/12/24",
    },
    {
      id: "7",
      user_displayId: "dvhbjtjyngbjyvhtgdvr",
      user_name: "eee",
      painting_id: "fgnngn",
      painting_date: "2023/12/24",
    },
    {
      id: "8",
      user_displayId: "vhgxtcrexrtvbjyjhvgv",
      user_name: "fff",
      painting_id: "sunhgn",
      painting_date: "2023/12/24",
    },
    {
      id: "9",
      user_displayId: "gectevercsersjhbvgfg",
      user_name: "ggg",
      painting_id: "gncbfb",
      painting_date: "2023/12/24",
    },
    {
      id: "10",
      user_displayId: "vdhbvrxdrghftbtcfvgr",
      user_name: "hhh",
      painting_id: "vbcgfb",
      painting_date: "2023/12/24",
    },
    {
      id: "11",
      user_displayId: "vdhtbbvcrghtfrvcghgg",
      user_name: "iii",
      painting_id: "gncgcvf",
      painting_date: "2023/12/23",
    },
    {
      id: "12",
      user_displayId: "bfvhcgdcgvdrtgtybvhh",
      user_name: "jjj",
      painting_id: "dgdgfdg",
      painting_date: "2023/12/22",
    },
    {
      id: "13",
      user_displayId: "bfjytfvtrerxvhrtrtvh",
      user_name: "kkk",
      painting_id: "dgdgd",
      painting_date: "2023/12/22",
    },
    {
      id: "14",
      user_displayId: "rtvdhyrtdtvghtrrvght",
      user_name: "lll",
      painting_id: "ngfhty",
      painting_date: "2023/12/22",
    },
    {
      id: "15",
      user_displayId: "yjgfhccghgjuftyrtfgh",
      user_name: "mmm",
      painting_id: "hrtjhrh",
      painting_date: "2023/12/22",
    },
    {
      id: "16",
      user_displayId: "vhjytftdrtvhbygfyfgh",
      user_name: "nnn",
      painting_id: "fhthn",
      painting_date: "2023/12/21",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer p-2 px-4 text-3xl text-description transition-colors hover:rounded-full hover:bg-description/30">
          <IoNotifications />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl text-txt_8">
            Notifications
          </DialogTitle>
        </DialogHeader>
        <div className="divide-y-2 divide-slate-400/25 overflow-y-scroll text-txt_9">
          {likes.map(async (like) => {
            return (
              <form
                key={like.id}
                className="mr-6 flex items-center py-1 text-xl"
                action={async () => {
                  "use server";
                  // final TODO: redirect to personal painting on the date
                  redirect(
                    `${publicEnv.NEXT_PUBLIC_BASE_URL}/social/${like.user_displayId}`,
                  );
                }}
              >
                <button type="submit">
                  {like.user_name} likes your painting on {like.painting_date}
                </button>
              </form>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default NotificationDialog;
