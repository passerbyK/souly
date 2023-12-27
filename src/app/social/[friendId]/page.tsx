import { GoHeartFill } from "react-icons/go";

import { getFriend } from "../_components/action";

type Props = {
  params: { friendId: string };
};

async function FriendPage(props: Props) {
  const friend = await getFriend(props.params.friendId);

  return (
    <div className="h-full w-full bg-brand_2">
      <div className="flex">
        <h1 className="pt-6 pl-6 text-6xl text-txt_5">{friend[0].name}</h1>
        <h2 className="ml-auto pt-10 pr-5 text-4xl text-txt_6">2023/12/09(Sat.)</h2>
        {/* date of the friend's newest post */}
      </div>
      <div className="my-4 mx-8 flex h-4/5 items-end rounded-xl border-4 border-bdr_4 bg-white">
        <div className="flex h-min w-full justify-between rounded-b-lg border-bdr_4 bg-brand_3 px-8 py-4 text-5xl">
          <div className="flex flex-col gap-2">
            <p className="text-4xl">topic</p>
            {/* topic of the friend's newest post */}
            <p className="text-2xl">description</p>
            {/* description of the friend's newest post */}
          </div>
          <span className="flex gap-4 self-center">
            <GoHeartFill size={48} /> 2
          </span>
        </div>
      </div>
    </div>
  );
}

export default FriendPage;
