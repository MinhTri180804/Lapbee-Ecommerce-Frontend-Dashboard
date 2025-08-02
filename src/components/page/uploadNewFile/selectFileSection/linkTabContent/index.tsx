import type { FC } from "react";
import { FormAddLinkImage } from "./formAddLinkImage";
import { ImagePreviewList } from "./imagePreviewList";
import { UploadAction } from "./uploadAction";

type LinkTabContentProps = {
  mock?: null;
};

export type ImageImportFromLink = {
  id: string;
  url: string;
};

const LinkTabContent: FC<LinkTabContentProps> = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <FormAddLinkImage />
      <ImagePreviewList />
      <UploadAction />
    </div>
  );
};

export default LinkTabContent;
