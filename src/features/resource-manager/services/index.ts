import { resourceManagerApi } from "../api";
import { ResourceManagerService } from "./resourceManagerService";

export const resourceManagerService = new ResourceManagerService(
  resourceManagerApi,
);
