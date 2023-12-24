import { IoIosNotificationsOutline } from "react-icons/io";
import { IoPersonCircleSharp } from "react-icons/io5";

import Image from "next/image";
import Link from "next/link";

import { auth } from "@/lib/auth";

async function Header() {
  const session = await auth();

  if (!session) {
    return (
      <div className="fixed top-0 z-40 grid h-1/6 w-full bg-header px-8 py-4 text-3xl font-bold text-description">
        <div className="flex items-center gap-2">
          <Link href="/" className="mr-6 flex items-center text-5xl">
            <div className="h-20 w-20">
              <Image
                src="/Logo_new.png"
                alt="Souly Logo"
                className="mr-2 w-full"
                width={100}
                height={100}
              />
            </div>
            <p className="text-txt_2">S</p>
            <p className="text-txt_3">O</p>
            <p className="text-txt_2">U</p>
            <p className="text-txt_3">L</p>
            <p className="text-txt_2">Y</p>
          </Link>
          <div className="grow"></div>
          <Link
            className="rounded-2xl p-2 px-4 transition-colors hover:bg-description/30"
            href={{
              pathname: `/introduction`,
            }}
          >
            <div className="">About Us</div>
          </Link>
          <Link
            className="rounded-2xl border-4 border-bdr bg-btn_2 p-2 px-4 text-txt transition-colors hover:bg-btn_2/30"
            href={{
              pathname: `/auth/login`,
            }}
          >
            <div className="">Sign In</div>
          </Link>
          <Link
            className="rounded-2xl border-4 border-bdr bg-btn p-2 px-4 text-txt transition-colors hover:bg-btn/30"
            href={{
              pathname: `/auth/signup`,
            }}
          >
            <div className="">Sign Up</div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 z-40 grid h-1/6 w-full bg-header px-8 py-4 text-3xl font-bold text-description">
      <div className="flex items-center gap-2">
        <Link href="/" className="mr-6 flex items-center text-5xl">
          <div className="h-20 w-20">
            <Image
              src="/Logo_new.png"
              alt="Souly Logo"
              className="mr-2 w-full"
              width={100}
              height={100}
            />
          </div>
          <p className="text-txt_2">S</p>
          <p className="text-txt_3">O</p>
          <p className="text-txt_2">U</p>
          <p className="text-txt_3">L</p>
          <p className="text-txt_2">Y</p>
        </Link>
        <div className="grow"></div>
        <Link
          className="rounded-2xl p-2 px-4 transition-colors hover:bg-description/30"
          href={{
            pathname: `/introduction`,
          }}
        >
          <div className="">About Us</div>
        </Link>
        <Link
          className="rounded-2xl p-2 px-4 transition-colors hover:bg-description/30"
          href={{
            pathname: `/painting`,
          }}
        >
          <div className="">Painting</div>
        </Link>
        <Link
          className="rounded-2xl p-2 px-4 transition-colors hover:bg-description/30"
          href={{
            pathname: `/personal`,
          }}
        >
          <div className="">Personal</div>
        </Link>
        <Link
          className="rounded-2xl p-2 px-4 transition-colors hover:bg-description/30"
          href={{
            pathname: `/social`,
          }}
        >
          <div className="">Social</div>
        </Link>
        <div className="cursor-pointer p-2 px-4 text-3xl transition-colors hover:rounded-full hover:bg-description/30">
          <IoIosNotificationsOutline />
        </div>
        <div className="mx-2 text-5xl text-black hover:cursor-pointer">
          <IoPersonCircleSharp />
        </div>
      </div>
    </div>
  );
}

export default Header;
