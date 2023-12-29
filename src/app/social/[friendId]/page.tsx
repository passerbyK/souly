import { MdOutlineDraw } from "react-icons/md";

import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import { getFriend, getFriendPost, getLiked, getLikes } from "../_components/action";
import LikeButton from "../_components/LikeButton";

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

  if(friendPost != undefined) {
    const Date = friendPost.createdAt.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      weekday: 'short',
    });
    const [weekday, date] = Date.split(', ');
    const [month, day, year] = date.split('/');
    const outputDate = `${year}/${month}/${day}(${weekday})`;

    const likes = await getLikes(friendPost.displayId);
    const liked = await getLiked(userId, friendPost.displayId);

    return (
      <div className="h-full w-full bg-brand_2">
        <div className="flex">
          <h1 className="pl-6 pt-6 text-6xl text-txt_5">{friend[0].name}</h1>
          <h2 className="ml-auto pr-6 pt-10 text-4xl text-txt_6">{outputDate}</h2>
        </div>
        <div className="mx-8 my-4 flex h-4/5 items-end rounded-xl border-4 border-bdr_4 bg-white">
          <div className="flex h-min w-full justify-between rounded-b-lg border-bdr_4 bg-brand_3 px-8 py-4 text-5xl">
            {friendPost.image} 
            {/* position of post have to change */}
            <div className="flex flex-col gap-2">
              <p className="text-4xl">{friendPost.topic}</p>
              <p className="text-2xl">{friendPost.description}</p>
            </div>
            <div className="px-4">
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
      <div className="h-full w-full bg-brand_2 flex flex-col items-center justify-center">
        <MdOutlineDraw size={100} className="text-bdr_3" />
        <p className="pt-6 text-center text-3xl font-semibold text-bdr_3 gap-2">
          {friend[0].name} has never started painting.
          <br />
          Remind {friend[0].name} to paint with you.
        </p>
      </div>
    )
  }
}

export default FriendPage;
