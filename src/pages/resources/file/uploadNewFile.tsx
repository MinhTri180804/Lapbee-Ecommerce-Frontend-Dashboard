import { SelectFileSection } from "@/components/page/uploadNewFile";
import { SelectFolderSection } from "@/components/page/uploadNewFile/selectFolderSection";
import { UploadFileManagerProvider } from "@/contexts/uploadFileManager";

export const UploadNewFilePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <header className="flex items-center justify-between">
        <h1 className="text-foreground text-lg leading-none font-bold">
          Thêm mới tài liệu
        </h1>
      </header>
      <UploadFileManagerProvider>
        <SelectFolderSection />
        <SelectFileSection />
      </UploadFileManagerProvider>
    </div>
  );
};
