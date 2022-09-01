import React from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <section
      id="explore"
      className="sticky top-0 mx-auto flex h-[calc(100vh-64px)] max-w-7xl items-center px-8"
    >
      <div className="space-y-8">
        <h1 className="flex flex-col space-y-3 text-5xl font-semibold tracking-wide lg:text-6xl xl:text-7xl">
          <span className="gradient block bg-clip-text text-transparent">
            Powered
          </span>

          <span>By Intellect</span>

          <span>Driven By Values</span>
        </h1>

        <div className="flex items-center space-x-6">
          <button className="gradient btn rounded px-8">Buy Now</button>

          <div className="group relative">
            <div className="absolute bottom-0 h-0.5 w-full origin-left scale-0 bg-black transition-transform duration-200 group-hover:scale-100" />

            <button className="btn py-1">Learn More</button>
          </div>
        </div>
      </div>

      <div className="relative hidden h-[450px] w-[450px] md:inline lg:h-[600px] lg:w-[600px]">
        <Image src="/assets/iphone.png" layout="fill" objectFit="contain" />
      </div>
    </section>
  );
};

export default Banner;
