import { ResourcesManagerPage } from "@/pages/resources";
import type { RouteObject } from "react-router";
import { routeName } from "@/constants/routeName";
import { ResourcesFileManagerLayout } from "@/layouts/resources/FileManagerLayout";
import { UploadNewFilePage } from "@/pages/resources/file/upload";
import { ResourcesManagerLayout } from "@/layouts/resources";

const { file } =
  routeName.dashboard.children.management.children.resources.children;

export const resourcesRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <ResourcesManagerLayout>
        <ResourcesManagerPage />
      </ResourcesManagerLayout>
    ),
  },
  {
    path: file.ROOT,
    Component: ResourcesFileManagerLayout,
    children: [
      {
        path: file.UPLOAD,
        Component: UploadNewFilePage,
      },
    ],
  },
];
