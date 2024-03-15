import { MdOutlineDraw } from "react-icons/md";

import Image from "next/image";
import { redirect } from "next/navigation";

import LikeButton from "../_components/LikeButton";
import {
  getFriend,
  getFriendPost,
  getLiked,
  getLikes,
} from "../_components/action";

import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

type Props = {
  params: { friendId: string };
};

async function FriendPage(props: Props) {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userId = session.user.id;

  const friend = await getFriend(props.params.friendId);
  const friendPost = await getFriendPost(props.params.friendId);

  if (friendPost != undefined) {
    const Date = friendPost.createdAt.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      weekday: "short",
    });
    const [weekday, date] = Date.split(", ");
    const [month, day, year] = date.split("/");
    const outputDate = `${year}/${month}/${day}(${weekday})`;

    const likes = await getLikes(friendPost.displayId);
    const liked = await getLiked(userId, friendPost.displayId);

    return (
      <div className="h-full w-full overflow-y-auto bg-brand_2 p-2 lg:flex">
        <div className="lg: mr-6 flex w-1/2 flex-col items-center lg:items-start">
          <h1 className="pt-6 text-3xl text-txt_5 md:text-5xl lg:pl-6">
            {friend[0].name}
          </h1>
          <h2 className="pt-4 text-center text-xl text-txt_6 md:text-3xl lg:pl-6 lg:text-start">
            {friendPost.topic}
          </h2>
        </div>
        <div className="h-11/12 mx-6 my-8 flex aspect-[4/3] flex-col items-center rounded-2xl border-2 border-[#7C5A16] bg-white md:mx-10 lg:mx-0 lg:mr-6">
          <div className="flex h-4/5 w-full flex-col items-center justify-center">
            <div className="flex h-[80%] h-full w-full items-center justify-center">
              <Image
                src={friendPost.image}
                alt="Logo"
                width={1000}
                height={1000}
                className="w-[80%] rounded-2xl"
              />
            </div>
            <div className="z-10 flex h-[30%] w-full items-center justify-center pb-2 text-center text-base text-[#998D73] sm:text-2xl lg:flex">
              {friendPost.description}
            </div>
          </div>
          <div className="flex h-1/5 w-full items-center justify-center gap-6 rounded-b-2xl bg-[#F2D7A3] text-base font-bold md:text-2xl">
            <div className="p-1/2 ml-4 rounded-2xl px-4 md:p-2">
              {outputDate}
            </div>
            <div className="flex items-center px-4">
              <LikeButton
                initialLikes={likes}
                initialLiked={liked}
                postId={friendPost.displayId}
                userId={userId}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-brand_2">
        <MdOutlineDraw size={100} className="text-bdr_3" />
        <p className="gap-2 pt-6 text-center text-3xl font-semibold text-bdr_3">
          {friend[0].name} has never started painting.
          <br />
          Remind {friend[0].name} to paint with you.
        </p>
      </div>
    );
  }
}

export default FriendPage;
