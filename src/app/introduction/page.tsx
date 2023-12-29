"use client";

import localFont from "next/font/local";

const pattaya = localFont({
  src: "../fonts/Pattaya-Regular.ttf",
  weight: "700",
  style: "italic",
});

export default function Introduction() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-brand_2">
      <div className="flex w-full flex-wrap items-center justify-between p-4 px-8 pt-8"></div>
      <div className="flex w-full flex-wrap items-center justify-between p-4 px-8 pt-8"></div>
      <div
        id="firstSection"
        className="m-4 mt-16 flex w-full flex-wrap justify-center gap-20 p-8"
      >
        <div className="order-2 mx-4 flex flex-col gap-4 md:order-1 md:w-[40%]">
          <h1 className="text-center text-4xl font-bold text-description">
            Embark on a Journey
          </h1>
          <h1 className="mb-6 text-center text-3xl font-bold text-description">
            Daily Creations with Souly
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
            dream to life. We welcome fresh perspectives for an enriching
            creative voyage. Join us in crafting a space that inspires and
            celebrates daily creativity.
          </p>
          <p
            className={`${pattaya.className} mb-4 text-center text-5xl text-txt`}
          >
            To Create Your Soul
          </p>
        </div>
        <div className="mx-4 flex flex-col gap-4 md:w-[40%]">
          <h1 className="text-center text-4xl font-bold text-description">
            Inspiration Unveiled
          </h1>
          <h1 className="mb-6 text-center text-3xl font-bold text-description">
            Where Creativity Blossoms
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
              Wei-Fan, Cheng
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
