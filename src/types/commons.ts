export type Timestamp = {
  createdAt: string;
  updatedAt: string;
};

export type Pagination = {
  totalDocument: number;
  totalPage: number;
  currentPage: number;
  nextPage: number | null;
  previousPage: number | null;
  limit: number;
};
