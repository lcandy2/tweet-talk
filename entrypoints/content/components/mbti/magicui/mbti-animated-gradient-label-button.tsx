import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/entrypoints/lib/utils.ts";
import { motion, MotionProps, type AnimationProps } from "framer-motion";

const animationProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
} as AnimationProps;

type MBTIAnimatedGradientLabelButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> &
    MotionProps & {
      children: ReactNode;
      className?: string;
    };

export default function MBTIAnimatedGradientLabelButton({
  children,
  className,
  ...props
}: MBTIAnimatedGradientLabelButtonProps) {
  return (
    <motion.button
      className={cn(
        "group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-[#33A47408] px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f] dark:bg-black/40",
        className,
      )}
      {...animationProps}
      {...props}
    >
      <div
        className={`absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#4298B4]/50 via-[#33A474]/50 to-[#886199]/50 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`}
      />
      {children}
    </motion.button>
  );
}
