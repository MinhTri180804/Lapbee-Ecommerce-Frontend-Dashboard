import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { type ComponentProps, type FC } from "react";
import {
  Section,
  SectionContent,
  SectionHeader,
  TitleSection,
} from "./commons";
import { LinkTabContent } from "./linkTabContent";
import { UploadTabContent } from "./uploadTabContent";

type SelectFileSectionProps = ComponentProps<"section"> & {};

export const SelectFileSection: FC<SelectFileSectionProps> = ({
  className,
  ...props
}) => {
  return (
    <Section className={cn(className)} {...props}>
      <SectionHeader>
        <TitleSection titleText="Chọn tài liệu" />
      </SectionHeader>
      <SectionContent>
        <Tabs className="gap-4" defaultValue="upload">
          <TabsList className="rounded-sm">
            <TabsTrigger value="upload">Tải lên từ máy tính</TabsTrigger>
            <TabsTrigger value="link">Tải lên từ đường dẫn ảnh</TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="flex flex-col gap-3">
            <UploadTabContent />
          </TabsContent>
          <TabsContent value="link">
            <LinkTabContent />
          </TabsContent>
        </Tabs>
      </SectionContent>
    </Section>
  );
};
