import Image from "next/image";
import Link from "next/link";

import { branding } from "@/config/branding";
import { cn } from "@/lib/utils";

type BrandLockupProps = {
  className?: string;
  /** Extra classes on the wordmark wrapper (e.g. sidebar `group-data-[collapsible=icon]:hidden`). */
  wordmarkWrapperClassName?: string;
  /** Force dark-bg wordmark regardless of color scheme (use when container is always dark, e.g. navy sidebar). */
  forceDarkWordmark?: boolean;
};

type WordmarkProps = {
  /** Render light type for always-dark containers (e.g. a navy sidebar). */
  forceDark?: boolean;
  className?: string;
};

/**
 * "ManpowerHub" set in the app display face — the wordmark is type, not an
 * image, so it follows the theme (`var(--fg)`) with no asset per colour scheme.
 */
export function Wordmark({ forceDark = false, className }: WordmarkProps) {
  return (
    <span
      className={cn(
        "block whitespace-nowrap font-heading font-bold leading-none tracking-[-0.02em]",
        "text-[1.0625rem] sm:text-[1.1875rem]",
        forceDark ? "text-white" : "text-[var(--fg)]",
        className,
      )}
    >
      ManpowerHub
    </span>
  );
}

/**
 * Default-colored mark + theme-aware wordmark (dark type on light bg, light type on dark bg).
 */
export function BrandLockup({
  className,
  wordmarkWrapperClassName,
  forceDarkWordmark = false,
}: BrandLockupProps) {
  return (
    <div className={cn("shrink-0", className)}>
      <div className="flex items-end gap-2 leading-none">
        <Image
          src={branding.mark}
          alt=""
          width={32}
          height={32}
          unoptimized
          className="block size-6 shrink-0 object-contain object-bottom sm:size-7 group-data-[collapsible=icon]:size-8"
        />
        <span
          className={cn(
            "flex min-w-0 items-end leading-none",
            wordmarkWrapperClassName,
          )}
        >
          <Wordmark forceDark={forceDarkWordmark} />
        </span>
      </div>
    </div>
  );
}

type BrandLockupLinkProps = BrandLockupProps & {
  href?: string;
  linkClassName?: string;
};

export function BrandLockupLink({
  href = "/dashboard",
  className,
  linkClassName,
  wordmarkWrapperClassName,
  forceDarkWordmark,
}: BrandLockupLinkProps) {
  return (
    <Link
      href={href}
      aria-label="ManpowerHub home"
      className={cn(
        "inline-flex shrink-0 items-center transition-opacity hover:opacity-90",
        linkClassName,
      )}
    >
      <BrandLockup
        className={className}
        wordmarkWrapperClassName={wordmarkWrapperClassName}
        forceDarkWordmark={forceDarkWordmark}
      />
    </Link>
  );
}
