import type { FC } from "react";
import {
  Section,
  SectionContent,
  SectionHeader,
  TitleSection,
} from "../commons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AllTabContent } from "./allTabContent";
import { LinkTabContent } from "./linkTabContent";
import { LocalTabContent } from "./localTabContent";

export const UploadSection: FC = () => {
  return (
    <Section>
      <SectionHeader>
        <TitleSection titleText="Các tài liệu đăng tải" />
      </SectionHeader>
      <SectionContent>
        <Tabs defaultValue="all" className="gap-4">
          <TabsList className="rounded-sm">
            <TabsTrigger
              className="text-foreground min-w-42 rounded-sm"
              value="all"
            >
              Tất cả
            </TabsTrigger>
            <TabsTrigger
              className="text-foreground min-w-42 rounded-sm"
              value="local"
            >
              Từ máy tính
            </TabsTrigger>
            <TabsTrigger
              className="text-foreground min-w-42 rounded-sm"
              value="link"
            >
              Từ đường dẫn
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <AllTabContent />
          </TabsContent>
          <TabsContent value="local">
            <LocalTabContent />
          </TabsContent>
          <TabsContent value="link">
            <LinkTabContent />
          </TabsContent>
        </Tabs>
      </SectionContent>
    </Section>
  );
};
