import { FaHeart } from "react-icons/fa";

import Image from "next/image";
import Link from "next/link";

type postProps = {
  id: string;
  topic: string;
  image: string;
  createdAt: Date;
  likes: number;
};

function Diary({ id, topic, image, createdAt, likes }: postProps) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
  const formattedDate = `
    ${createdAt.getFullYear()}-
    ${(createdAt.getMonth() + 1).toString().padStart(2, "0")}-
    ${createdAt.getDate().toString().padStart(2, "0")} 
    (${daysOfWeek[createdAt.getDay()]})`;
  return (
    <Link
      key={id}
      className="rounded-2xl p-2 transition-colors hover:bg-white/50"
      href={{
        pathname: `personal/${String(id)}`,
      }}
    >
      <div className="relative aspect-[4/3] rounded-2xl border-2 border-solid border-[#7C5A16] bg-white">
        <div className="flex h-4/5 items-center justify-center">
          <Image
            src={image}
            alt={topic}
            width={100}
            height={100}
            className="h-2/3 w-2/3 rounded-2xl"
          />
        </div>
        <div className="flex h-1/5 items-center justify-center gap-4 rounded-b-2xl bg-[#F2D7A3] text-base font-bold">
          <div className="ml-4">{formattedDate}</div>
          <div className="flex items-center">
            <div>
              <FaHeart />
            </div>
            <div className="ml-1 mr-4">{likes ?? "0"}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Diary;
