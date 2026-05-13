"use client";

import { ArrowUpRight, Briefcase } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const works = [
  {
    title: "VisionAI - Generative Image Platform",
    description:
      "Advanced AI-powered platform for creating, editing, and enhancing images using state-of-the-art diffusion models and neural networks.",
    image: "/images/vision-ai.png",
    href: "/works/visionai",
  },
  {
    title: "ChatGenius - Enterprise LLM Solution",
    description:
      "Custom large language model implementation for enterprise customer support, featuring multi-language support, context awareness, and real-time learning capabilities.",
    image: "/images/chat.png",
    href: "/works/chatgenius",
  },
  {
    title: "MotionAI - Video Generation Suite",
    description:
      "Revolutionary AI video synthesis platform that transforms text and images into professional-quality videos using generative AI technology.",
    image: "/images/motion-ai.png",
    href: "/works/motionai",
  },
];

export default function SelectedWorks() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => [...new Set([...prev, index])]);
            }
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -100px 0px" },
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section id="works" className="py-20 px-6 bg-card">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="w-5 h-5 text-primary" strokeWidth={2} />
          <span className="text-sm font-medium text-foreground/70">
            Our projects
          </span>
        </div>

        <h2 className="font-serif text-foreground mb-12 text-5xl">
          Selected Works
        </h2>

        {/* Works List */}
        <div className="space-y-8">
          {works.map((work, index) => (
            <Link
              key={index}
              href={work.href}
              className="group block border-t border-border pt-8 border-none"
            >
              <div
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className="flex flex-col lg:flex-row lg:items-start gap-6"
              >
                {/* Title and Description */}
                <div className="lg:w-1/3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-semibold text-foreground md:text-3xl">
                      {work.title}
                    </h3>
                    <ArrowUpRight className="text-primary h-6 w-6  group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                  <p className="mt-4 text-foreground/70 text-sm">
                    {work.description}
                  </p>
                </div>

                <div
                  className={`lg:w-2/3 rounded-2xl overflow-hidden transition-all duration-700 ${
                    visibleItems.includes(index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Image
                    src={work.image || "/placeholder.svg"}
                    alt={`${work.title} preview`}
                    width={800}
                    height={500}
                    className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
