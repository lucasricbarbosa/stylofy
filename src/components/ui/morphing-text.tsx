"use client";

import { useCallback, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const MORPH_TIME = 1.5;
const COOLDOWN_TIME = 0.5;

function useMorphingText(texts: string[]) {
  const textIndexRef = useRef(0);
  const morphRef = useRef(0);
  const cooldownRef = useRef(0);
  const timeRef = useRef(new Date());
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  const setStyles = useCallback(
    (fraction: number) => {
      const [el1, el2] = [text1Ref.current, text2Ref.current];
      if (!el1 || !el2) return;

      el2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      el2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      const inv = 1 - fraction;
      el1.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`;
      el1.style.opacity = `${Math.pow(inv, 0.4) * 100}%`;

      el1.textContent = texts[textIndexRef.current % texts.length] ?? "";
      el2.textContent = texts[(textIndexRef.current + 1) % texts.length] ?? "";
    },
    [texts],
  );

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;

    let fraction = morphRef.current / MORPH_TIME;
    if (fraction > 1) {
      cooldownRef.current = COOLDOWN_TIME;
      fraction = 1;
    }

    setStyles(fraction);
    if (fraction === 1) textIndexRef.current++;
  }, [setStyles]);

  const doCooldown = useCallback(() => {
    morphRef.current = 0;
    const [el1, el2] = [text1Ref.current, text2Ref.current];
    if (el1 && el2) {
      el2.style.filter = "none";
      el2.style.opacity = "100%";
      el1.style.filter = "none";
      el1.style.opacity = "0%";
    }
  }, []);

  useEffect(() => {
    let rafId: number;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const now = new Date();
      const dt = (now.getTime() - timeRef.current.getTime()) / 1000;
      timeRef.current = now;
      cooldownRef.current -= dt;
      if (cooldownRef.current <= 0) doMorph();
      else doCooldown();
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [doMorph, doCooldown]);

  return { text1Ref, text2Ref };
}

interface MorphingTextProps {
  texts: string[];
  className?: string;
}

function Texts({ texts }: Pick<MorphingTextProps, "texts">) {
  const { text1Ref, text2Ref } = useMorphingText(texts);
  return (
    <>
      {/* Invisible sizer: longest text reserves the box's width & height */}
      <span aria-hidden className="invisible whitespace-nowrap">
        {texts.reduce((a, b) => (a.length >= b.length ? a : b), "")}
      </span>
      <span
        ref={text1Ref}
        className="absolute inset-0 flex items-center justify-center"
      />
      <span
        ref={text2Ref}
        className="absolute inset-0 flex items-center justify-center"
      />
    </>
  );
}

function SvgFilters() {
  return (
    <svg
      id="morphing-text-filters"
      className="fixed h-0 w-0"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="threshold">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 255 -140"
          />
        </filter>
      </defs>
    </svg>
  );
}

export function MorphingText({ texts, className }: MorphingTextProps) {
  return (
    <div
      className={cn(
        "relative mx-auto inline-flex max-w-full items-center justify-center text-center font-sans text-[40pt] font-bold leading-[1.1] [filter:url(#threshold)_blur(0.6px)] lg:text-[6rem]",
        className,
      )}
    >
      <Texts texts={texts} />
      <SvgFilters />
    </div>
  );
}
