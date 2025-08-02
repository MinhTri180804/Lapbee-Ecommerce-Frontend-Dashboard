import type { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResourcesManagerSection,
  ResourcesManagerSectionContent,
  ResourcesManagerSectionTitle,
} from "@/features/resource-manager";
import { useSearchParams } from "react-router";

export const FileListManager: FC = () => {
  const [searchParams] = useSearchParams();
  const folder = searchParams.get("folder") || null;

  return (
    <Tabs defaultValue="full">
      <ResourcesManagerSection>
        <ResourcesManagerSectionTitle>
          <div className="text-foreground text-base font-medium">Tài liệu</div>
          <TabsList>
            <TabsTrigger value="full">Tất cả</TabsTrigger>
            <TabsTrigger value="basedFolder" disabled={!folder}>
              Dựa theo thư mục
            </TabsTrigger>
          </TabsList>
        </ResourcesManagerSectionTitle>
        <TabsContent value="full">
          <ResourcesManagerSectionContent>
            <FileManagerSection />
          </ResourcesManagerSectionContent>
        </TabsContent>
        <TabsContent value="basedFolder">
          <ResourcesManagerSectionContent>
            <FileManagerBasedFolderSection />
          </ResourcesManagerSectionContent>
        </TabsContent>
      </ResourcesManagerSection>
    </Tabs>
  );
};
