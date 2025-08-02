import type { FileImageFromLink } from "@/contexts/uploadFileManager";
import { type FC, useRef, useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { useUploadFileManagerActions } from "@/contexts/uploadFileManager";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type RenameFileImageOptionProps = {
  data: FileImageFromLink;
};

export const RenameFileImageOption: FC<RenameFileImageOptionProps> = ({
  data,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [newName, setNewName] = useState<string>("");
  const { toggleRenameFileFromLink, updateRenameFileFromLink } =
    useUploadFileManagerActions();

  useEffect(() => {
    if (data.isRename && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [data.isRename]);

  const handleChangeNewName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleUpdateRenameFileFromLink = () => {
    updateRenameFileFromLink(data.id, newName);
  };

  const handleChangeSwitch = (checked: boolean) => {
    toggleRenameFileFromLink(data.id, checked);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor="rename-file" className="text-sm">
          Thay đổi tên tệp
        </label>
        <Switch
          id="rename-file"
          defaultChecked={data.isRename}
          checked={data.isRename}
          onCheckedChange={handleChangeSwitch}
        />
      </div>

      <div
        className={cn(
          "border-primary flex flex-col gap-2 rounded-sm rounded-t-none border border-t-0 p-3 pt-1",
          {
            "opacity-50": !data.isRename,
            "cursor-not-allowed": !data.isRename,
          },
        )}
      >
        <Label htmlFor="rename-file-input" className="text-sm font-normal">
          Tên mới
        </Label>
        <div className="flex flex-col items-start gap-2">
          <Input
            ref={inputRef}
            disabled={!data.isRename}
            id="rename-file-input"
            placeholder="Nhập tên mới cho tệp..."
            className="w-full rounded-sm"
            onChange={handleChangeNewName}
            value={newName}
            onBlur={handleUpdateRenameFileFromLink}
          />
          {newName.length === 0 && data.isRename && (
            <p className="text-destructive text-xs">
              Tên mới không được để trống
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
