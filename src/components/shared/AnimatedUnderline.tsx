import { cn } from "@/lib/utils";

export default function AnimatedUnderline({ className: additionalStyles }: { className?: string }) {
  const baseStyles = "absolute -bottom-[4px] left-0 block h-[1.5px] w-full max-w-0 group-hover:max-w-full rounded-full transition-all duration-300 ease-in-out bg-black"
  return <span className={cn( baseStyles, additionalStyles )}></span>
};