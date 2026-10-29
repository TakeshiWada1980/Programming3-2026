"use client";
import Image from "next/image";
import { cn } from "cn";

const Page: React.FC = () => {
  return (
    <main>
      <div className="mb-5 text-2xl font-bold">About</div>

      <div
        className={cn("mx-auto mb-5 w-full md:w-2/3", "flex justify-center")}
      >
        <Image
          src="/images/avatar.png"
          alt="ブログ運営者のアバター"
          width={350}
          height={350}
          preload
          className="h-auto max-w-full rounded-full border-4 border-slate-500 p-1.5"
        />
      </div>

      <div className="space-y-3">
        <div className="md:flex md:justify-center md:gap-x-4">
          <div className="font-bold md:w-1/6 md:shrink-0 md:text-center">名 前</div>
          <div className="md:min-w-0 md:flex-1">寝屋川 タヌキ (Tanuki Neyagawa)</div>
        </div>
        <div className="md:flex md:justify-center md:gap-x-4">
          <div className="font-bold md:w-1/6 md:shrink-0 md:text-center">連絡先</div>
          <div className="md:min-w-0 md:flex-1">tanuki.neyagawa@example.com</div>
        </div>
        <div className="md:flex md:justify-center md:gap-x-4">
          <div className="font-bold md:w-1/6 md:shrink-0 md:text-center">
            ポートフォリオ
          </div>
          <div className="md:min-w-0 md:flex-1">
            <a
              href="https://google.com"
              className="mr-1 text-blue-500 underline"
            >
              タヌキ&apos;s Portfolio
            </a>
            (GitHub Pages)
          </div>
        </div>
        <div className="md:flex md:justify-center md:gap-x-4">
          <div className="font-bold md:w-1/6 md:shrink-0 md:text-center">自己紹介</div>
          <div className="md:min-w-0 md:flex-1">
            とある高専の情報系学科3年生です。最近は、ウェブアプリ開発やデザインに興味があって、Next.js
            (React) の勉強を兼ねて、このブログアプリを構築しました。
            <br />
            このブログでは、日々の学習記録や技術的な発見を共有していければと思います。よろしくお願いします！
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
