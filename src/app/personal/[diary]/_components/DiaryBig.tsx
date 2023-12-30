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
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const formattedDate = `
    ${createdAt.getFullYear()}-
    ${(createdAt.getMonth() + 1).toString().padStart(2, "0")}-
    ${createdAt.getDate().toString().padStart(2, "0")} 
    (${daysOfWeek[createdAt.getDay()]})`;
  return (
    <div className="w-full gap-2 lg:flex-col">
      <div className="mb-4 flex justify-center rounded-2xl bg-description/60 p-2 text-center text-xl sm:text-2xl lg:bg-description/0">
        {topic}
      </div>
      <div className="relative aspect-[4/3] w-full rounded-2xl border-2 border-solid border-[#7C5A16] bg-white lg:mx-auto lg:w-[70%]">
        <div className="h-4/5">
          <div className="flex h-full items-center justify-center lg:h-[88%]">
            <Image
              src={image}
              alt="Logo"
              width={1000}
              height={1000}
              className="h-[90%] w-[70%] rounded-2xl lg:h-[80%]"
            />
          </div>
          <div className="hidden w-full items-center justify-center text-base text-[#998D73] sm:text-2xl lg:flex lg:pb-2">
            {description}
          </div>
        </div>
        <div className="flex h-1/5 items-center justify-center rounded-b-2xl bg-[#F2D7A3] text-base font-bold md:gap-8 md:text-2xl">
          <div className="ml-2 rounded-2xl md:ml-4 md:p-2 lg:hidden">
            {formattedDate}
          </div>
          <div className="hidden lg:block">{formattedDate}</div>
          <div className="flex items-center">
            <div>
              <HeartDialog likeslist={likeslist} />
            </div>
            <div className="ml-1 mr-2">{likes}</div>
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
