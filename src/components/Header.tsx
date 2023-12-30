import { TfiMenuAlt } from "react-icons/tfi";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/header_sidebar";
import { auth } from "@/lib/auth";

import NotificationDialog from "./_components/NotificationDialog";
import PersonalDialog from "./_components/PersonalDialog";

async function Header() {
  const session = await auth();

  if (!session) {
    return (
      <div className="fixed top-0 z-40 grid h-1/6 w-full bg-header px-8 py-4 text-3xl font-bold text-description sm:px-8">
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
            className="hidden rounded-2xl p-2 px-4 transition-colors hover:bg-description/30 sm:block"
            href={{
              pathname: `/introduction`,
            }}
          >
            <div className="hidden sm:block">About Us</div>
          </Link>
          <Link
            className="hidden rounded-2xl border-4 border-bdr bg-btn_2 p-2 px-4 text-txt transition-colors hover:bg-btn_2/30 sm:block"
            href={{
              pathname: `/auth/login`,
            }}
          >
            <div className="hidden sm:block">Sign In</div>
          </Link>
          <Link
            className="hidden rounded-2xl border-4 border-bdr bg-btn p-2 px-4 text-txt transition-colors hover:bg-btn/30 sm:block"
            href={{
              pathname: `/auth/signup`,
            }}
          >
            <div className="hidden sm:block">Sign Up</div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 z-40 grid h-1/6 w-full bg-header px-4 text-3xl font-bold text-description shadow-lg sm:px-8">
      <div className="flex items-center gap-0 sm:gap-2">
        <Link href="/" className="mr-6 flex items-center xl:text-4xl">
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
          className="hidden rounded-2xl p-2 px-4 transition-colors hover:bg-description/30 lg:block lg:text-2xl xl:block xl:text-3xl"
          href={{
            pathname: `/introduction`,
          }}
        >
          <div className="">About Us</div>
        </Link>
        <Link
          className="hidden rounded-2xl p-2 px-4 transition-colors hover:bg-description/30 lg:block lg:text-2xl xl:block xl:text-3xl"
          href={{
            pathname: `/painting`,
          }}
        >
          <div className="">Painting</div>
        </Link>
        <Link
          className="hidden rounded-2xl p-2 px-4 transition-colors hover:bg-description/30 lg:block lg:text-2xl xl:block xl:text-3xl"
          href={{
            pathname: `/personal`,
          }}
        >
          <div className="">Personal</div>
        </Link>
        <Link
          className="hidden rounded-2xl p-2 px-4 transition-colors hover:bg-description/30 lg:block lg:text-2xl xl:block xl:text-3xl"
          href={{
            pathname: `/social`,
          }}
        >
          <div className="">Social</div>
        </Link>

        <NotificationDialog />
        <PersonalDialog />
        <div className="lg:hidden">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-null items-center rounded-full px-2 py-2 text-bdr_3 hover:bg-btn_2 sm:px-3 sm:text-4xl">
                <TfiMenuAlt className="pt-0.5 text-4xl sm:text-[40px]" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <div className="text-2xl font-bold text-description lg:hidden">
                <div className="flex flex-col gap-4 pt-2">
                  <Link
                    className="px-2 transition-colors hover:bg-description/30"
                    href={{
                      pathname: `/introduction`,
                    }}
                  >
                    <div className="">About Us</div>
                  </Link>

                  <Link
                    className="px-2 transition-colors hover:bg-description/30"
                    href={{
                      pathname: `/painting`,
                    }}
                  >
                    <div className="">Painting</div>
                  </Link>
                  <Link
                    className="px-2 transition-colors hover:bg-description/30"
                    href={{
                      pathname: `/personal`,
                    }}
                  >
                    <div className="">Personal</div>
                  </Link>
                  <Link
                    className="px-2 transition-colors hover:bg-description/30"
                    href={{
                      pathname: `/social`,
                    }}
                  >
                    <div className="">Social</div>
                  </Link>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default Header;
