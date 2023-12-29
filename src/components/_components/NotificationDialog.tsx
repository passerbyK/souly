import { IoNotifications } from "react-icons/io5";

import { redirect } from "next/navigation";

import {
  getNotifications,
  getPost,
  getUser,
} from "@/app/social/_components/action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/up_dialog";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

async function NotificationDialog() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userId = session.user.id;

  // const likes = [
  //   // id: like table
  //   // user_displayId: like table
  //   // user_name: user table
  //   // painting_id: like table
  //   // painting_date: painting table
  //   {
  //     id: "1",
  //     user_displayId: "svrkinhlcgmoidrngkdh",
  //     user_name: "aaa",
  //     painting_id: "cdgdgc",
  //     painting_date: "2023/12/25",
  //   },
  //   {
  //     id: "2",
  //     user_displayId: "cmkhdfkmghndmighdcmk",
  //     user_name: "bbb",
  //     painting_id: "cdgdcg",
  //     painting_date: "2023/12/25",
  //   },
  //   {
  //     id: "5",
  //     user_displayId: "svrkinhlcgmoidrngkdh",
  //     user_name: "ccc",
  //     painting_id: "zdfgxd",
  //     painting_date: "2023/12/25",
  //   },
  //   {
  //     id: "6",
  //     user_displayId: "rthbryjvhgdrcfdrcgvv",
  //     user_name: "ddd",
  //     painting_id: "bgfcxs",
  //     painting_date: "2023/12/24",
  //   },
  //   {
  //     id: "7",
  //     user_displayId: "dvhbjtjyngbjyvhtgdvr",
  //     user_name: "eee",
  //     painting_id: "fgnngn",
  //     painting_date: "2023/12/24",
  //   },
  //   {
  //     id: "8",
  //     user_displayId: "vhgxtcrexrtvbjyjhvgv",
  //     user_name: "fff",
  //     painting_id: "sunhgn",
  //     painting_date: "2023/12/24",
  //   },
  //   {
  //     id: "9",
  //     user_displayId: "gectevercsersjhbvgfg",
  //     user_name: "ggg",
  //     painting_id: "gncbfb",
  //     painting_date: "2023/12/24",
  //   },
  //   {
  //     id: "10",
  //     user_displayId: "vdhbvrxdrghftbtcfvgr",
  //     user_name: "hhh",
  //     painting_id: "vbcgfb",
  //     painting_date: "2023/12/24",
  //   },
  //   {
  //     id: "11",
  //     user_displayId: "vdhtbbvcrghtfrvcghgg",
  //     user_name: "iii",
  //     painting_id: "gncgcvf",
  //     painting_date: "2023/12/23",
  //   },
  //   {
  //     id: "12",
  //     user_displayId: "bfvhcgdcgvdrtgtybvhh",
  //     user_name: "jjj",
  //     painting_id: "dgdgfdg",
  //     painting_date: "2023/12/22",
  //   },
  //   {
  //     id: "13",
  //     user_displayId: "bfjytfvtrerxvhrtrtvh",
  //     user_name: "kkk",
  //     painting_id: "dgdgd",
  //     painting_date: "2023/12/22",
  //   },
  //   {
  //     id: "14",
  //     user_displayId: "rtvdhyrtdtvghtrrvght",
  //     user_name: "lll",
  //     painting_id: "ngfhty",
  //     painting_date: "2023/12/22",
  //   },
  //   {
  //     id: "15",
  //     user_displayId: "yjgfhccghgjuftyrtfgh",
  //     user_name: "mmm",
  //     painting_id: "hrtjhrh",
  //     painting_date: "2023/12/22",
  //   },
  //   {
  //     id: "16",
  //     user_displayId: "vhjytftdrtvhbygfyfgh",
  //     user_name: "nnn",
  //     painting_id: "fhthn",
  //     painting_date: "2023/12/21",
  //   },
  // ];

  const likes = await getNotifications(userId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer p-2 px-4 text-4xl text-description transition-colors hover:rounded-full hover:bg-description/30">
          <IoNotifications />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl text-txt_8">
            Notifications
          </DialogTitle>
        </DialogHeader>
        {likes == undefined || likes.length == 0 ? (
          <p className="flex h-5/6 items-center justify-center text-2xl text-txt_9">
            no notification
          </p>
        ) : (
          <div className="flex flex-col items-start divide-y-2 divide-slate-400/25 overflow-y-auto text-txt_9">
            {likes.map(async (like) => {
              const postDate = await getPost(like.postId);
              const userName = await getUser(like.userId);
              return (
                <form
                  key={like.id}
                  className="p-1 text-xl hover:bg-yellow-700/20"
                  action={async () => {
                    "use server";
                    redirect(
                      `${publicEnv.NEXT_PUBLIC_BASE_URL}/personal/${like.postId}`,
                    );
                  }}
                >
                  <button type="submit">
                    {userName} likes your painting on {postDate}
                  </button>
                </form>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default NotificationDialog;
