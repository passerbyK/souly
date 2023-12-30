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
    <main className="flex h-full min-h-screen w-full flex-col items-center bg-brand_2">
      <div className="h-[200px] w-full"></div>
      <div className="m-4 flex h-full w-full flex-wrap items-center justify-center gap-20 p-8">
        <Image
          src="/Homepage_new.png"
          alt="Souly Logo"
          className="mb-4 w-full rounded-2xl border-4 border-bdr lg:mb-0 lg:mr-4 lg:w-2/5"
          width={3000}
          height={3000}
        />
        <div className="mx-4 flex flex-col items-center gap-4 lg:w-2/5">
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
            className="m-2 rounded-2xl border-4 border-bdr bg-btn px-4 py-2 text-center text-3xl text-txt hover:bg-description/80"
          >
            Start Painting
          </Link>
        </div>
      </div>
    </main>
  );
}
