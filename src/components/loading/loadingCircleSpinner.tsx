import { motion } from "motion/react";

export function LoadingCircleSpinner() {
  return (
    <div className="flex h-dvh w-dvw items-center justify-center rounded-md p-10">
      <motion.div
        className="border-muted border-t-primary h-12 w-12 rounded-full border-4"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
