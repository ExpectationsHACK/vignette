import { ArrowRight, ShoppingBag, Users } from "@/components/Icons";
import { site } from "@/content/book";

type Tone = "onLight" | "onDark";

const base =
  "group ui inline-flex h-[52px] items-center justify-center gap-2.5 whitespace-nowrap px-5 !text-[12px] !tracking-[0.08em] sm:gap-3 sm:px-6 sm:!text-[13px] sm:!tracking-[0.1em] transition-[background-color,color,box-shadow,transform] duration-300 ease-out-expo active:translate-y-px";

/** Primary action: buy the book. Solid, with a lift on hover. */
export function BuyButton({ tone = "onLight", className = "" }: { tone?: Tone; className?: string }) {
  const look =
    tone === "onLight"
      ? "bg-red text-white shadow-[0_6px_16px_-6px_rgba(168,43,32,0.55)] hover:bg-red-dark hover:shadow-[0_10px_22px_-8px_rgba(168,43,32,0.6)]"
      : "bg-white text-red shadow-[0_6px_16px_-6px_rgba(0,0,0,0.35)] hover:bg-cream";
  return (
    <a href={site.amazonUrl} target="_blank" rel="noopener noreferrer" className={`${base} ${look} ${className}`}>
      <ShoppingBag size={18} />
      Buy on Amazon
      <ArrowRight size={16} className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
    </a>
  );
}

/** Secondary action: bulk / event copies. Outlined. */
export function BulkButton({ tone = "onLight", className = "", onClick }: { tone?: Tone; className?: string; onClick?: () => void }) {
  const look =
    tone === "onLight"
      ? "border-[1.5px] border-ink text-ink hover:bg-ink hover:text-paper"
      : "border-[1.5px] border-white text-white hover:bg-white hover:text-red";
  return (
    <a href="#enquire" onClick={onClick} className={`${base} ${look} ${className}`}>
      <Users size={18} />
      Request Bulk / Event Copies
    </a>
  );
}
