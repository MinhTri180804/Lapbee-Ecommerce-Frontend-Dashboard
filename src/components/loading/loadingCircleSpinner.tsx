import { motion } from "motion/react";
import type { FC } from "react";

type LoadingCircleSpinnerProps = {
  width?: number;
  height?: number;
};

export const LoadingCircleSpinner: FC<LoadingCircleSpinnerProps> = ({
  width = 50,
  height = 50,
}) => {
  return (
    <div className="flex items-center justify-center rounded-md">
      <motion.div
        className={`border-muted border-t-primary h-[${height}px] w-[${width}px] rounded-full border-4`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};
