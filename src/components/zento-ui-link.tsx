import zentoUiLogo from "@/assets/zento-ui-logo.svg";
import Image from "next/image";
import Link from "next/link";

const ZentoUiLink = () => {
  return (
    <Link
      className="border py-2 px-4 rounded-lg flex items-center justify-center gap-3 hover:opacity-90 transition-all absolute top-8 right-2 bg-card border-border shadow-lg"
      href={"https://zento-iota.vercel.app/"}
    >
      <Image width={32} height={32} src={zentoUiLogo} alt="Zento UI Logo" />
      <div className="flex flex-col gap-1">
        <h5 className="text-sm font-bold text-foreground">Zento UI</h5>
        <p className="text-xs text-muted-foreground">
          Explore blocks and components
        </p>
      </div>
    </Link>
  );
};

export default ZentoUiLink;
