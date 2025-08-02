import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addLinkImageSchema,
  type AddLinkImageSchemaType,
} from "@/features/auth/schema/addLinkImage.schema";
import {
  dispatchAddFileFromLink,
  useUploadFileManagerActions,
} from "@/contexts/uploadFileManager";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";

export const FormAddLinkImage: FC = () => {
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
