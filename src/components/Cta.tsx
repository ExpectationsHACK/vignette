import { ArrowRight, BookOpen, CreditCard, ShoppingBag, Star, Store, Users } from "@/components/Icons";
import { site } from "@/content/book";

type Tone = "onLight" | "onDark";
type Retailer = "barnesAndNoble" | "bookshop" | "selar" | "goodreads";

const base =
  "group ui inline-flex h-[52px] items-center justify-center gap-2.5 whitespace-nowrap px-5 !text-[12px] !tracking-[0.08em] sm:gap-3 sm:px-6 sm:!text-[13px] sm:!tracking-[0.1em] transition-[background-color,color,box-shadow,transform] duration-300 ease-out-expo active:translate-y-px";

const retailerIcons = {
  barnesAndNoble: Store,
  bookshop: BookOpen,
  selar: CreditCard,
  goodreads: Star,
};

function DestinationButton({
  href,
  label,
  retailer,
  tone = "light",
  className = "",
}: {
  href: string;
  label: string;
  retailer: Retailer;
  tone?: "light" | "dark";
  className?: string;
}) {
  const Icon = retailerIcons[retailer];
  const appearance =
    tone === "dark"
      ? "border-[1.5px] border-white text-white hover:bg-white hover:text-red"
      : "border-[1.5px] border-red text-red hover:bg-red hover:text-white";
  const classes = `${base} ${appearance} ${className}`;
  const content = (
    <>
      <Icon size={18} />
      {label}
      <ArrowRight size={16} className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
    </>
  );
  if (!href) {
    return (
      <button
        type="button"
        disabled
        title={`${label} link coming soon`}
        className={`${classes} cursor-not-allowed opacity-65`}
      >
        {content}
      </button>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {content}
    </a>
  );
}

/** Primary action: buy the book. Solid, with a lift on hover. */
export function BuyButton({ tone = "onLight", className = "" }: { tone?: Tone; className?: string }) {
  const look =
    tone === "onLight"
      ? "bg-red text-white shadow-[0_6px_16px_-6px_rgba(168,43,32,0.55)] hover:bg-red-dark hover:shadow-[0_10px_22px_-8px_rgba(168,43,32,0.6)]"
      : "bg-white text-red shadow-[0_6px_16px_-6px_rgba(0,0,0,0.35)] hover:bg-cream";
  const content = (
    <>
      <ShoppingBag size={18} />
      Buy on Amazon
      <ArrowRight size={16} className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
    </>
  );
  if (!site.amazonUrl) {
    return (
      <button
        type="button"
        disabled
        title="Amazon product link coming soon"
        className={`${base} ${look} cursor-not-allowed opacity-65 ${className}`}
      >
        {content}
      </button>
    );
  }
  return (
    <a href={site.amazonUrl} target="_blank" rel="noopener noreferrer" className={`${base} ${look} ${className}`}>
      {content}
    </a>
  );
}

export function RetailerButton({
  retailer,
  href,
  label,
  className = "",
}: {
  retailer: Exclude<Retailer, "goodreads">;
  href: string;
  label: string;
  className?: string;
}) {
  return <DestinationButton retailer={retailer} href={href} label={label} className={className} />;
}

export function GoodreadsButton({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <DestinationButton
      retailer="goodreads"
      href={site.goodreadsUrl}
      label="Find the book on Goodreads"
      tone={tone}
      className={className}
    />
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
      Order in Bulk / Inquiries
    </a>
  );
}
