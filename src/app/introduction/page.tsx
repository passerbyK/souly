"use client";

import { useEffect, useState } from "react";

import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";

const pattaya = localFont({
  src: "../fonts/Pattaya-Regular.ttf",
  weight: "700",
  style: "italic",
});

export default function Introduction() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const container = document.getElementById("secondSection");
      if (container) {
        const rect = container.getBoundingClientRect();
        setIsVisible(rect.top <= window.innerHeight / 2);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center bg-brand">
      <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b-4 border-bdr bg-brand p-4 px-8">
        <div className="mb-2 flex items-center justify-center gap-4 md:mb-0">
          <div className="mr-2 h-20 w-20">
            <Link href="/" className="text-4xl">
              <Image
                src="/souly.svg"
                alt="Souly Logo"
                className="mr-2 w-full"
                width={20}
                height={20}
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:justify-end">
          <Link
            href="/signup"
            className="m-2 rounded-2xl border-4 border-bdr bg-btn_2 px-4 py-2 text-center text-3xl text-txt"
          >
            Start Painting
          </Link>
        </div>
      </header>
      <div className="flex w-full flex-wrap items-center justify-between p-4 px-8 pt-8"></div>
      <div className="flex w-full flex-wrap items-center justify-between p-4 px-8 pt-8"></div>
      <div
        id="firstSection"
        className="m-4 flex w-full flex-wrap items-center justify-center gap-20 p-8"
      >
        <Image
          src="/souly.svg"
          alt="Souly Logo"
          className="mb-4 w-full rounded-2xl border-4 border-bdr md:mb-0 md:mr-4 md:w-2/5"
          width={25}
          height={25}
        />
        <div className="mx-4 flex flex-col items-center gap-4 md:w-2/5">
          <h1 className="text-center text-4xl font-bold text-description">
            Inspiration Unveiled
          </h1>
          <h1 className="mb-6 text-center text-4xl font-bold text-description">
            Souly - Where Creativity Blossoms
          </h1>
          <p
            className={`${pattaya.className} mb-6 text-center text-2xl text-txt`}
          >
            In the midst of an inspiring talk, the speaker emphasized the value
            of "accumulation," urging the audience to commit to a 21-day habit
            formation challenge. Drawing from the analogy of honing artistic
            skills through daily drawings, the speaker shared the transformative
            power of consistent creative practice. Intrigued by this idea, I, as
            a lover of all things creative - from handmade cards to web games,
            believe that the act of creation serves as a mirror reflecting our
            awareness and preferences in life.
          </p>
          <p
            className={`${pattaya.className} mb-4 text-center text-5xl text-txt`}
          >
            To Find Your Heart
          </p>
        </div>
      </div>
      <div
        id="secondSection"
        className="m-4 flex w-full flex-wrap items-center justify-center gap-20 p-8"
      >
        <div className="order-2 mx-4 flex flex-col items-center gap-4 md:order-1 md:w-2/5">
          <h1 className="mb-6 text-center text-4xl font-bold leading-relaxed text-description">
            Embark on a Journey of Daily Creations with Souly
          </h1>
          <p
            className={`${pattaya.className} mb-6 text-center text-2xl text-txt`}
          >
            Embark on a creative odyssey with Souly, a platform transcending the
            ordinary. Seamlessly create an account, dive into daily art prompts,
            and celebrate your journey in a personal showcase. Connect
            effortlessly with friends, fostering a community. A dynamic news
            feed awaits, revealing daily prompts and friends' expressions. Our
            vision extends beyond features, promising an exhilarating journey of
            creativity. Seeking partners who share our passion, bringing this
            dream to life. With a foundation in UI/UX design and web game
            development, we welcome fresh perspectives for an enriching creative
            voyage. Join us in crafting a space that inspires and celebrates
            daily creativity.
          </p>
          <p
            className={`${pattaya.className} mb-4 text-center text-5xl text-txt`}
          >
            To Create Your Soul
          </p>
        </div>
        <Image
          src="/souly.svg"
          alt="Another Image"
          className="animate-fade-left order-1 mb-4 w-full rounded-2xl border-4 border-bdr md:order-2 md:mb-0 md:ml-4 md:w-2/5"
          width={25}
          height={25}
        />
      </div>
      <div
        id="thirdSection"
        className={`m-4 flex w-full flex-wrap items-center justify-center gap-20 p-8 ${
          isVisible ? "animate__animated animate__fadeIn" : "invisible"
        }`}
      >
        <Image
          src="/souly.svg"
          alt="Souly Logo"
          className="mb-4 w-full rounded-2xl border-4 border-bdr md:mb-0 md:mr-4 md:w-2/5"
          width={25}
          height={25}
        />
        <div className="mx-4 flex flex-col items-center gap-4 md:w-2/5">
          <h1 className="mb-6 text-center text-4xl font-bold text-description">
            A Canvas of Dreams: Join Us in Crafting Souly
          </h1>
          <p
            className={`${pattaya.className} mb-6 text-center text-2xl text-txt`}
          >
            In the realm of Souly, each stroke of creativity paints a picture of
            dreams, hopes, and aspirations. This platform isn't merely about
            daily drawings; it's a sanctuary where imagination flourishes and
            connections bloom. Join us on this extraordinary journey, where
            every creation is a step toward self-discovery and a shared
            narrative of artistic expression.
          </p>
          <p
            className={`${pattaya.className} mb-4 text-center text-5xl text-txt`}
          >
            Let Paint Your Dreams
          </p>
        </div>
      </div>
      <div
        id="fourthSection"
        className="m-4 flex w-full flex-wrap items-center justify-center gap-20 p-8"
      >
        <div className="order-2 mx-4 flex flex-col items-center gap-4 md:mx-8 lg:mx-16">
          <h1 className="mb-6 text-center text-5xl font-bold leading-relaxed text-description md:text-4xl lg:text-5xl">
            Meet the Creators: Unveiling the Souly Team
          </h1>
          <div
            className={`${pattaya.className} mx-auto mb-6 max-w-2xl text-center text-2xl text-txt md:text-xl lg:text-2xl`}
          >
            Our visionaries behind Souly are a trio of passionate individuals
            dedicated to infusing creativity into everyday life. With expertise
            in front-end UI/UX design and a track record of developing engaging
            web games, we bring a harmonious blend of skills to ensure that
            Souly becomes a canvas where dreams come to life. Together, we
            aspire to create a vibrant community that celebrates the beauty of
            daily creation and shared artistic exploration.
          </div>
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <p
              className={`${pattaya.className} mb-4 text-center text-4xl text-txt`}
            >
              Xiang-Yi, Huang
              <br className="text-2xl" />
              <span className="text-2xl">B08303047@ntu.edu.tw</span>
            </p>
            <p
              className={`${pattaya.className} mb-4 text-center text-4xl text-txt`}
            >
              Wei-Fan, Zheng
              <br className="text-2xl" />
              <span className="text-2xl">B09505031@ntu.edu.tw</span>
            </p>
            <p
              className={`${pattaya.className} mb-4 text-center text-4xl text-txt`}
            >
              Yun-Wen, Huang
              <br className="text-2xl" />
              <span className="text-2xl">B09610020@ntu.edu.tw</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
