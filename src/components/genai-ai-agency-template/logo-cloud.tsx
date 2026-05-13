export default function LogoCloud() {
  const logos = [
    "RightAssure",
    "Spherecoast",
    "Hopicom",
    "DataCode",
    "Aerial Crew",
    "HeuroSens",
    "CloadBank",
  ];

  return (
    <section className="py-12 px-6 border-y border-border bg-accent border-none">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {logos.map((logo) => (
            <div
              key={logo}
              className="font-medium text-lg hover:text-primary transition-colors text-foreground/80"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
