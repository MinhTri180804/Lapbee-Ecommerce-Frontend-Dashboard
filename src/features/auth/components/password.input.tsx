import type { FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { LoginSchemaType } from "../schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/input";

type Props = {
  form: UseFormReturn<LoginSchemaType>;
};

export const PasswordField: FC<Props> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>Mật khẩu</FormLabel>
          <FormControl>
            <Input
              className="focus-visible:ring-primary/50 h-10"
              type="password"
              {...field}
            />
          </FormControl>
          <AnimatePresence mode="wait" initial={false}>
            {fieldState.error?.message && (
              <motion.div
                key="email-error"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-destructive mt-1 text-sm font-medium"
              >
                {fieldState.error.message}
              </motion.div>
            )}
          </AnimatePresence>
        </FormItem>
      )}
    />
  );
};
