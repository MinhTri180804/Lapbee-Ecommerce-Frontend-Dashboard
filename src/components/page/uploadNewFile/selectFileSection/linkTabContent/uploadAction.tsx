import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useUploadFileManagerState } from "@/contexts/uploadFileManager";
import type { FC } from "react";

export const UploadAction: FC = () => {
  const { filesFromLink, folderSelected } = useUploadFileManagerState();

  const handleUpload = () => {
    console.log(filesFromLink);
    console.log(folderSelected);
  };

  return (
    <AnimatePresence>
      {filesFromLink.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          className="w-full"
        >
          <Button
            variant="outline"
            size={"lg"}
            className="w-full"
            onClick={handleUpload}
          >
            <Upload />
            Đăng tải
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
