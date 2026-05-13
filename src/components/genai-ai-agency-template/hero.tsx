"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = 500; // Maximum scroll distance for the effect
      const progress = Math.min(scrolled / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scale = 1 - scrollProgress * 0.15; // Scale from 1 to 0.85
  const borderRadius = scrollProgress * 24; // Border radius from 0 to 24px

  return (
    <section id="home" className="pt-28 pb-16">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Left Content - Title and Button */}
          <div className="lg:max-w-3xl pt-0">
            <h1 className="leading-tight text-balance text-left font-sans font-semibold tracking-tight text-foreground text-5xl">
              <span className="text-primary">Powering Innovation</span> with AI
              & Generative Technology
            </h1>

            <Link
              href="#works"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity"
            >
              See Our Works
              <ArrowUpRight className="text-primary h-4 w-4" />
            </Link>
          </div>

          {/* Team Avatars - Top Right */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              <Image
                src="/images/imgi_114_user94.webp"
                alt="Team member"
                width={40}
                height={40}
                className="rounded-full border-2 border-background"
              />
              <Image
                src="/images/imgi_110_user90.webp"
                alt="Team member"
                width={40}
                height={40}
                className="rounded-full border-2 border-background"
              />
              <Image
                src="/images/imgi_111_user91.webp"
                alt="Team member"
                width={40}
                height={40}
                className="rounded-full border-2 border-background"
              />
            </div>
            <p className="text-sm text-foreground/70 max-w-[180px]">
              AI specialists delivering cutting-edge solutions in LLM, image,
              and video generation.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 px-6">
        <div
          className="relative overflow-hidden transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${scale})`,
            borderRadius: `${borderRadius}px`,
          }}
        >
          <Image
            src="/images/97ab9037-5842-4584-bc95-9fc90baece99.png"
            alt="Modern sunglasses"
            width={1920}
            height={600}
            className="w-full h-auto object-cover"
          />

          {/* Video Play Button */}
          <div className="absolute bottom-6 right-6 bg-foreground text-background rounded-xl px-4 py-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center">
              <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-background ml-1" />
            </div>
            <span className="text-sm font-medium">Trailer.mp4</span>
          </div>
        </div>
      </div>
    </section>
  );
}
