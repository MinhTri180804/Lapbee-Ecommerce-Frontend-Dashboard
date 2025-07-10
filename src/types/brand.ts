import type { Timestamp } from "./commons";

export type Brand = {
  id: string;
  name: string;
  slug: string;
  logo: {
    publicId: string;
    url: string;
  };
  banners: {
    publicId: string;
    url: string;
    isMain: boolean;
  }[];
} & Timestamp;
