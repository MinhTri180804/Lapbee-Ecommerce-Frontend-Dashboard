import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  dispatchAddFileFromLink,
  useUploadFileManagerActions,
  useUploadFileManagerState,
} from "@/contexts/uploadFileManager";
import {
  addLinkImageSchema,
  type AddLinkImageSchemaType,
} from "@/features/auth/schema/addLinkImage.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { EmptyFile } from "./commons";
import { ImageImportFromLinkPreview } from "./imageImportFromLinkPreview";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { Upload } from "lucide-react";

type LinkTabContentProps = {
  mock?: null;
};

export type ImageImportFromLink = {
  id: string;
  url: string;
};

export const LinkTabContent: FC<LinkTabContentProps> = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <FormAddLinkImage />
      <ImagePreviewList />
      <UploadAction />
    </div>
  );
};

const UploadAction: FC = () => {
  const { filesFromLink } = useUploadFileManagerState();

  const handleUpload = () => {
    console.log(filesFromLink);
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

const FormAddLinkImage: FC = () => {
  const form = useForm<AddLinkImageSchemaType>({
    resolver: zodResolver(addLinkImageSchema),
    defaultValues: {
      url: "",
    },
  });

  const { addFileFromLink, removeFileFromLink } = useUploadFileManagerActions();

  const handleSubmit = (values: AddLinkImageSchemaType) => {
    const dispatch = dispatchAddFileFromLink(values.url);
    addFileFromLink(dispatch);
    toast.success("Thêm ảnh thành công", {
      description: "Bạn đã thêm hình ảnh thành công từ đường dẫn",
      duration: 3000,
      id: dispatch.id,
      action: (
        <Button
          variant="outline"
          onClick={() => {
            removeFileFromLink(dispatch.id);
            toast.dismiss(dispatch.id);
          }}
        >
          Xóa
        </Button>
      ),
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="relative grid w-full grid-cols-12 gap-3"
      >
        <FormField
          name="url"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-10">
              <FormControl>
                <Input
                  {...field}
                  className="w-full rounded-sm"
                  placeholder="Nhập đường dẫn ảnh..."
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          className="col-span-2 w-full rounded-sm"
          variant={"outline"}
          type="submit"
        >
          Thêm ảnh
        </Button>

        <AnimatePresence>
          {form.formState.errors.url && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-destructive col-span-12 w-full text-sm font-medium"
            >
              {form.formState.errors.url.message}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </Form>
  );
};

const ImagePreviewList: FC = () => {
  const { filesFromLink } = useUploadFileManagerState();
  return (
    <div className="grid w-full grid-cols-12 gap-3">
      {filesFromLink.length ? (
        filesFromLink.map((image) => (
          <ImageImportFromLinkPreview key={image.id} data={image} />
        ))
      ) : (
        <EmptyFile
          className="col-span-12"
          titleText="Chưa có hình ảnh nào được thêm bằng đường dẫn"
          descriptionText="Bạn có thể chọn đường dẫn hình ảnh muốn thêm vào và đăng tải"
        />
      )}
    </div>
  );
};
