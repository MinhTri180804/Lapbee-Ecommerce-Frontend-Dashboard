import type { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import checkIcon from "@/assets/icons/check.svg";
import classnames from "classnames";
import { RotateCcw } from "lucide-react";
import type { FileSize } from "@/types/fileSize";
import classNames from "classnames";
type FileUploadedPreviewProps = {
  isSuccess: boolean | null;
  onClose: (index: number) => void;
  index: number;
  imageUrl: string;
  fileNameOriginal: string;
  size: FileSize;
  error: ("size" | "upload" | "type-file")[];
};

const getStatus = (isSuccess: boolean | null) => {
  if (isSuccess === null) {
    return "loading";
  }

  return isSuccess ? "success" : "error";
};

export const FileUploadedPreview: FC<FileUploadedPreviewProps> = ({
  isSuccess,
  onClose,
  index,
  imageUrl,
  fileNameOriginal,
  size,
  error,
}) => {
  const fileNameOriginalSplit = fileNameOriginal.split(".");
  const fileExt = fileNameOriginalSplit.splice(
    fileNameOriginalSplit.length - 1,
    1,
  );
  const fileName = fileNameOriginalSplit.join("-");
  const rootClassnames = classnames(
    "cursor-pointer overflow-hidden rounded-lg border-1 bg-white transition-shadow duration-150 hover:shadow transition duration-150",
    {
      "border-ring/50": isSuccess === null,
      "border-green-500": isSuccess,
      "border-red-500": isSuccess === false,
    },
  );

  const fileSizeClassnames = classnames("text-gray-500", {
    "text-red-500": error.includes("size"),
  });

  const fileExtClassnames = classNames("inline-block", {
    "text-red-500": error.includes("type-file"),
  });

  return (
    <div className={rootClassnames}>
      <div className="p-4">
        <div className="flex w-full items-center gap-3 overflow-hidden">
          <img
            className="border-ring/50 h-[48px] w-[48px] flex-none"
            src={imageUrl}
          />
          <motion.div
            variants={variant}
            initial={"initial"}
            animate={getStatus(isSuccess)}
            className="w-full flex-col overflow-hidden"
          >
            <div className="flex w-full items-center justify-between">
              <div className="text-foreground flex w-full grow-1 flex-col gap-0 font-medium">
                <div>
                  <p className="inline-block">{fileName}</p>
                  <p className={fileExtClassnames}>.{fileExt}</p>
                </div>
                <div className="flex gap-2 text-xs">
                  <p className={fileSizeClassnames}>
                    {size.value} {size.type}
                  </p>
                </div>
              </div>

              <div className="text-foreground flex shrink-0 items-center gap-5">
                <AnimatePresence mode="wait" initial={false}>
                  {isSuccess === null ? (
                    <SpinLoadingMotion
                      key={"loading-component"}
                      exit={{ translateY: 12, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    />
                  ) : isSuccess ? (
                    <motion.img
                      key={"check-logo"}
                      src={checkIcon}
                      initial={{ opacity: 0, translateY: -12 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    />
                  ) : (
                    <RotateCcwMotion
                      key={"rotate-icon"}
                      initial={{ opacity: 0, translateY: -12 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="text-gray-500"
                    />
                  )}
                </AnimatePresence>
                <X
                  onClick={() => onClose(index)}
                  className="hover:text-foreground cursor-pointer text-gray-500 transition-colors duration-75"
                />
              </div>
            </div>

            <div className="mt-2 h-1 w-full bg-gray-200">
              <motion.div
                className="bg-primary h-1"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const SpinLoading = () => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="fill-primary h-6 w-6 animate-spin text-gray-200 dark:text-gray-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  );
};

const RotateCcwMotion = motion(RotateCcw);

const SpinLoadingMotion = motion(SpinLoading);

const variant = {
  initial: {
    translateY: "8px",
    opacity: 0,
  },
  loading: {
    translateY: "0px",
    transition: { duration: 0.4 },
    opacity: 1,
  },
  error: {
    translateY: "8px",
    transition: { duration: 0.4 },
    opacity: 1,
  },
  success: {
    translateY: "8px",
    transition: { duration: 0.4 },
    opacity: 1,
  },
};
