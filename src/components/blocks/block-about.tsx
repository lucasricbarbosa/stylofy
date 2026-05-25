"use client";

import { Button } from "@/components/ui/button";
import { ScrollingLogos } from "@/components/ui/scrolling-logos";
import { cn } from "@/lib/utils";
import ZentoUiLink from "../zento-ui-link";

interface AboutProps {
  className?: string;
  title?: string;
  description?: string;
  mainImage?: {
    src: string;
    alt: string;
  };
  secondaryImage?: {
    src: string;
    alt: string;
  };
  breakout?: {
    src?: string;
    alt?: string;
    title: string;
    description: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  companies?: Array<{
    src: string;
    alt: string;
  }> | null;
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{
    label: string;
    value: string;
  }>;
  contentSections?: Array<{
    title: string;
    content: string;
  }>;
}

const BlockAbout = ({
  className,
  title = "We build tools people actually use",
  description = "Our team brings together designers, engineers, and thinkers united by one goal: making the web a better place to build. We obsess over the details so you don't have to.",
  mainImage = {
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&auto=format&fit=crop&q=80",
    alt: "Team in a meeting room reviewing work",
  },
  secondaryImage = {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
    alt: "Open plan office with natural light",
  },
  breakout = {
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Logo_vector.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
    alt: "logo",
    title: "500+ components, zero compromises",
    description:
      "Copy-paste components built with Tailwind and shadcn/ui — ready for production from day one.",
    buttonText: "Browse components",
    buttonUrl: "/components",
  },
  companies = [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      alt: "Google",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      alt: "Amazon",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      alt: "Microsoft",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
      alt: "Spotify",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
      alt: "Meta",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg",
      alt: "Shopify",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg",
      alt: "Airbnb",
    },
  ],
  achievementsTitle = "Trusted by teams that ship fast",
  achievementsDescription = "From solo founders to enterprise engineering teams, builders rely on our components to move faster without cutting corners.",
  achievements = [
    { label: "Components", value: "500+" },
    { label: "GitHub Stars", value: "4k+" },
    { label: "Weekly Installs", value: "12k+" },
    { label: "Contributors", value: "40+" },
  ],
  contentSections = [
    {
      title: "Why we started",
      content:
        "Every project we took on started the same way — hours rebuilding the same buttons, cards, and layouts from scratch. Good components existed, but nothing felt like a complete, cohesive system you could actually drop into a real product.\n\nSo we built one. Our toolkit started as an internal library and grew into something we're proud to share with every developer who's ever stared at a blank Tailwind file at 11pm.",
    },
    {
      title: "How we work",
      content:
        "We're a small, focused team that moves deliberately. Every component goes through design review, accessibility checks, and real-world testing before it ships.\n\nWe don't chase trends — we build what's useful. If a component doesn't improve your workflow, it doesn't make the cut. That's the standard we hold ourselves to, and it's the reason developers keep coming back.",
    },
  ],
}: AboutProps) => {
  const logos = companies
    ? companies.map((c, i) => ({
        id: String(i),
        name: c.alt,
        image: c.src,
        height: "h-7 w-auto grayscale opacity-90 dark:invert dark:opacity-80",
      }))
    : [];

  return (
    <section
      className={cn(
        "flex w-full items-center relative justify-center bg-background px-5 py-24",
        className,
      )}
    >
      <ZentoUiLink />
      <div className="container">
        <div className="mb-14 flex flex-col gap-5 lg:w-2/3">
          <h1 className="text-5xl font-semibold tracking-tighter lg:text-6xl">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            {description}
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          <img
            src={mainImage.src}
            alt={mainImage.alt}
            className="size-full max-h-[620px] rounded-xl object-cover lg:col-span-2"
          />
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            <div className="flex flex-col justify-between gap-6 rounded-xl bg-muted p-7 md:w-1/2 lg:w-auto">
              {breakout.src && (
                <img
                  src={breakout.src}
                  alt={breakout.alt}
                  className="mr-auto h-12 dark:invert"
                />
              )}
              <div>
                <p className="mb-2 text-lg font-semibold">{breakout.title}</p>
                <p className="text-muted-foreground">{breakout.description}</p>
              </div>
              {breakout.buttonText && (
                <Button variant="outline" className="mr-auto" asChild>
                  <a href={breakout.buttonUrl} target="_blank" rel="noreferrer">
                    {breakout.buttonText}
                  </a>
                </Button>
              )}
            </div>
            <img
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              className="grow basis-0 rounded-xl object-cover md:w-1/2 lg:min-h-0 lg:w-auto"
            />
          </div>
        </div>

        {companies && logos.length > 0 && (
          <div className="py-32">
            <ScrollingLogos logos={logos} speed="slow" />
          </div>
        )}

        <div className="relative overflow-hidden rounded-xl bg-muted p-7 md:p-16">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-3xl font-medium md:text-4xl">
              {achievementsTitle}
            </h2>
            <p className="max-w-xl text-muted-foreground">
              {achievementsDescription}
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:flex md:flex-wrap md:justify-between">
            {achievements.map((item, idx) => (
              <div
                className="flex flex-col gap-2 text-center md:text-left"
                key={item.label + idx}
              >
                <span className="font-mono text-4xl font-semibold md:text-5xl">
                  {item.value}
                </span>
                <p className="text-sm md:text-base">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {contentSections && contentSections.length > 0 && (
          <div className="mx-auto grid max-w-5xl gap-16 pt-28 md:grid-cols-2 md:gap-28">
            {contentSections.map((section, idx) => (
              <div key={section.title + idx}>
                <h2 className="mb-5 text-4xl font-medium">{section.title}</h2>
                <p className="whitespace-pre-line text-lg leading-7 text-muted-foreground">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export { BlockAbout };
