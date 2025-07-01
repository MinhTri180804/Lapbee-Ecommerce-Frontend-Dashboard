import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";

export const LoadingLineReveal = () => {
  // Step progress (0 -> 100)
  const progress = useMotionValue(0);

  // Smooth it with spring for fluid animation
  const smoothProgress = useSpring(progress, {
    stiffness: 100,
    damping: 20,
    mass: 1,
  });

  // X position for left and right masks (slide outward)
  const leftX = useTransform(smoothProgress, (v) => `-${v}%`);
  const rightX = useTransform(smoothProgress, (v) => `${v}%`);

  // Text opacity and scale after reveal
  const textOpacity = useTransform(smoothProgress, [0, 90], [0, 1]);
  const textScale = useTransform(smoothProgress, [0, 100], [0.8, 1]);

  // Animate on mount
  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: 2,
      ease: [0.65, 0, 0.35, 1],
    });
    return controls.stop;
  }, [progress]);

  return (
    <div className="bg-background relative h-dvh w-dvw overflow-hidden">
      {/* Text */}
      <motion.div
        style={{ opacity: textOpacity, scale: textScale }}
        className="absolute inset-0 z-70 flex items-center justify-center text-[90px] font-bold text-white"
      >
        LAPBEE
      </motion.div>

      {/* Left mask */}
      <motion.div
        style={{ x: leftX }}
        className="bg-primary absolute top-0 left-0 z-50 h-full w-1/2"
      />

      {/* Right mask */}
      <motion.div
        style={{ x: rightX }}
        className="bg-primary absolute top-0 right-0 z-50 h-full w-1/2"
      />
    </div>
  );
};
