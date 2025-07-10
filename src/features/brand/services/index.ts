import { brandApi } from "../api";
import { BrandService } from "./brandService";

export const brandService = new BrandService(brandApi);
