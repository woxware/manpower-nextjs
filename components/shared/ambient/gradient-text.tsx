import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Wraps text in the module's signature gradient (green -> indigo -> sky),
 * matching the headline treatment from the onboarding-complete loader.
 * Hexes are hardcoded (not imported from palette.ts) because Tailwind's JIT
 * scanner needs literal class strings to generate the gradient utilities.
 */
export function GradientText({
  as: Tag = "span",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "bg-gradient-to-r from-[#10B981] via-[#6366F1] to-[#0EA5E9] bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
