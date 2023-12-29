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
    <div className="w-full gap-2 lg:flex">
      <div className="mb-4 flex justify-center text-xl sm:text-3xl lg:hidden">
        {formattedDate}
      </div>
      <div className="relative aspect-[4/3] rounded-2xl border-2 border-solid border-[#7C5A16] bg-white">
        <div className="h-4/5">
          <div className="flex h-full items-center justify-center lg:h-[90%]">
            <Image
              src={image}
              alt="Logo"
              width={100}
              height={100}
              className="h-[90%] w-[70%] rounded-2xl"
            />
          </div>
          <div className="hidden w-full items-center justify-center text-base text-[#998D73] sm:text-2xl lg:flex">
            {description}
          </div>
        </div>
        <div className="flex h-1/5 items-center justify-center gap-8 rounded-b-2xl bg-[#F2D7A3] text-base font-bold md:text-2xl">
          <div className="p-1/2 ml-4 rounded-2xl bg-description/60 px-4 md:p-2">
            {topic}
          </div>
          <div className="hidden lg:block">{formattedDate}</div>
          <div className="flex items-center">
            <div>
              <HeartDialog likeslist={likeslist} />
            </div>
            <div className="ml-1 mr-4">{likes}</div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex w-full items-center justify-center text-base sm:text-2xl lg:hidden">
        {description}
      </div>
    </div>
  );
}

export default DiaryBig;
