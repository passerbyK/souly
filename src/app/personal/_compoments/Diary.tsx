import { FaHeart, FaComment } from "react-icons/fa";

import Image from "next/image";

function Diary() {
  return (
    <div className="h-[50%] w-[32%] rounded-2xl border-2 border-solid border-[#7C5A16] bg-white">
      <div className="flex h-4/5 items-center justify-center">
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="h-2/3 w-2/3 rounded-2xl"
        />
      </div>
      <div className="flex h-1/5 items-center justify-center gap-4 rounded-b-2xl bg-[#F2D7A3] text-base font-bold">
        <div>2023/12/06 (Wed.)</div>
        <div className="flex items-center">
          <div>
            <FaHeart />
          </div>
          <div className="ml-1">6</div>
        </div>
        <div className="flex items-center">
          <div>
            <FaComment />
          </div>
          <div className="ml-1">2</div>
        </div>
      </div>
    </div>
  );
}

export default Diary;
