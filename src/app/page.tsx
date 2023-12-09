import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";

const pattaya = localFont({
  src: "./fonts/Pattaya-Regular.ttf",
  weight: "700",
  style: "italic",
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-brand">
      <header className="flex w-full flex-wrap items-center justify-between p-4 px-8 pt-8">
        <div className="mb-2 flex items-center justify-center gap-4 md:mb-0">
          <Link href="/" className="mr-6 flex items-center text-4xl">
            <div className="h-20 w-20">
              <Image
                src="/Logo_new.png"
                alt="Souly Logo"
                className="mr-2 w-full"
                width={20}
                height={20}
              />
            </div>
            <p className="text-txt_2">S</p>
            <p className="text-txt_3">O</p>
            <p className="text-txt_2">U</p>
            <p className="text-txt_3">L</p>
            <p className="text-txt_2">Y</p>
          </Link>
          <Link
            href="/introduction"
            className="m-2 rounded-2xl border-4 border-bdr bg-btn px-4 py-2 text-center text-3xl text-txt"
          >
            About Us
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:justify-end">
          <Link
            href="/auth/login"
            className="m-2 rounded-2xl border-4 border-bdr bg-btn_2 px-4 py-2 text-center text-3xl text-txt"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="m-2 rounded-2xl border-4 border-bdr bg-btn px-4 py-2 text-center text-3xl text-txt"
          >
            Sign Up
          </Link>
        </div>
      </header>
      <div className="m-4 flex w-full flex-wrap items-center justify-center gap-20 p-8">
        <Image
          src="/souly.svg"
          alt="Souly Logo"
          className="mb-4 w-full rounded-2xl border-4 border-bdr md:mb-0 md:mr-4 md:w-2/5"
          width={25}
          height={25}
        />
        <div className="mx-4 flex flex-col items-center gap-4 md:w-2/5">
          <h1 className="mb-16 text-center text-6xl font-bold text-description">
            Welcome to Souly !
          </h1>
          <p
            className={`${pattaya.className} mb-2 text-center text-5xl text-txt`}
          >
            Find Your Heart
          </p>
          <p
            className={`${pattaya.className} mb-4 text-center text-5xl text-txt`}
          >
            Create Your Soul
          </p>
          <Link
            href="/auth/signup"
            className="m-2 rounded-2xl border-4 border-bdr bg-btn px-4 py-2 text-center text-3xl text-txt"
          >
            Start Painting
          </Link>
        </div>
      </div>
    </main>
  );
}
