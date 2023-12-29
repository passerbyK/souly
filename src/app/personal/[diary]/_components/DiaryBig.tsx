import { FaComment } from "react-icons/fa";

import Image from "next/image";

import HeartDialog from "./HeartDialog";

type postProps = {
  topic: string;
  image: string;
  description: string;
  createdAt: Date;
  likes: number;
  likeslist: string[];
};

function DiaryBig({
  topic,
  image,
  description,
  createdAt,
  likes,
  likeslist,
}: postProps) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
  const formattedDate = `
    ${createdAt.getFullYear()}-
    ${(createdAt.getMonth() + 1).toString().padStart(2, "0")}-
    ${createdAt.getDate().toString().padStart(2, "0")} 
    (${daysOfWeek[createdAt.getDay()]})`;
  return (
    <div className="lg:flex w-full gap-2">
      <div className="lg:hidden mb-4 flex justify-center text-xl sm:text-3xl">{formattedDate}</div>
      <div className="relative aspect-[4/3] rounded-2xl border-2 border-solid border-[#7C5A16] bg-white">
        <div className="h-4/5">
          <div className="flex h-full lg:h-[90%] items-center justify-center">
            <Image
              src={image}
              alt="Logo"
              width={100}
              height={100}
              className="h-[90%] w-[70%] rounded-2xl"
            />
          </div>
          <div className="hidden lg:flex w-full items-center justify-center text-base sm:text-2xl text-[#998D73]">
            {description}
          </div>
        </div>
        <div className="flex h-1/5 items-center justify-center gap-8 rounded-b-2xl bg-[#F2D7A3] text-base md:text-2xl font-bold">
          <div className="rounded-2xl bg-description/60 p-1/2 md:p-2 px-4 ml-4">{topic}</div>
          <div className="hidden lg:block">{formattedDate}</div>
          <div className="flex items-center">
            <div>
              <HeartDialog likeslist={likeslist} />
            </div>
            <div className="ml-1 mr-4">{likes}</div>
          </div>
        </div>
      </div>
      <div className="flex mt-4 lg:hidden w-full items-center justify-center text-base sm:text-2xl">
          {description}
      </div>
    </div>
  );
}

export default DiaryBig;
