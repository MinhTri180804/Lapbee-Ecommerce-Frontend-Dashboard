type BasePagination = {
  nextCursor: string | null;
  rateLimitAllowed: number;
  rateLimitResetAt: string;
  rateLimitRemaining: number;
};

export type PaginationFileResources = BasePagination & {};

export type PaginationFolderResources = BasePagination & { totalCount: number };

export type PaginationSubFolderResources = BasePagination & {
  totalCount: number;
};

export type PaginationSearchFileResources = BasePagination & {
  totalCount: number;
};

export type ShrinkImageFromLink = {
  input: {
    size: number;
    type: string;
  };
  output: {
    size: number;
    type: string;
    url: string;
    ratio: number;
  };
};
