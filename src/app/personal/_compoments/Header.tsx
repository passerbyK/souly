import { IoIosNotificationsOutline } from "react-icons/io";
import { IoPersonCircleSharp } from "react-icons/io5";
import Image from "next/image";

function Header() {
  return (
    <div className="flex items-center gap-6 h-full w-full bg-header px-8 py-4 text-xl font-bold text-[#DF8558]">
      <div className="">
          <Image src="/logo.png" alt="Logo" width={100} height={100} className="h-2/3 w-2/3"/>
      </div>
      <div className="grow"></div>
      <div className=""></div>
      <div className="">Painting</div>
      <div className="">Personal</div>
      <div className="">Social</div>
      <div className="text-3xl">
        <IoIosNotificationsOutline />
      </div>
      <div className="text-5xl text-black">
        <IoPersonCircleSharp />
      </div>
    </div>
  ) 
}

export default Header;