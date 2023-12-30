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
      <div className="lg:flex lg:items-center lg:overflow-y-auto h-full w-full bg-brand_2 p-2">
        
        <div className="w-full flex flex-col items-center lg:items-start ">
          <h1 className="lg:pl-6 pt-6 text-3xl md:text-5xl text-txt_5">{friend[0].name}</h1>
          <h2 className="mx-8 text-center lg:text-start lg:ml-auto lg:pl-6 pt-4 text-xl md:text-3xl text-txt_6">
          {friendPost.topic}
          </h2>
        </div>
        <div className="mx-6 md:mx-10 w-5/6 lg:mx-0 lg:w-full h-11/12 lg:mr-6 my-8 aspect-[4/3] flex flex-col items-center rounded-2xl border-2 border-[#7C5A16] bg-white">
          <div className="w-full h-4/5 flex flex-col items-center justify-center">
            <div className="w-full flex h-full items-center justify-center h-[80%]">
              <Image
                src={friendPost.image}
                alt="Logo"
                width={1000}
                height={1000}
                className="w-[80%] rounded-2xl"
              />
            </div>
            <div className="z-10 w-full h-[30%] flex items-center justify-center text-base text-[#998D73] sm:text-2xl lg:flex">
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
