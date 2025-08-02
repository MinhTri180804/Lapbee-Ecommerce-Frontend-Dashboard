import { useUploadFileManagerActions } from "@/contexts/uploadFileManager";
import { X } from "lucide-react";
import type { FC } from "react";

type RemoveFileActionProps = {
  id: string;
};
export const RemoveFileAction: FC<RemoveFileActionProps> = ({ id }) => {
  const { removeFileFromLink } = useUploadFileManagerActions();

  return (
    <div
      onClick={() => removeFileFromLink(id)}
      className="absolute top-2 left-2 cursor-pointer rounded-full bg-white p-1 hover:bg-gray-200"
    >
      <X size={18} />
    </div>
  );
};
