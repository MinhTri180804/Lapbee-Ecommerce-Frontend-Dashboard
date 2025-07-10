import { Input } from "@/components/ui/input";
import type { FC } from "react";

type SearchProps = {
  handleSearch: (value: string) => void;
  value: string;
};

export const Search: FC<SearchProps> = ({ handleSearch, value }) => {
  return (
    <Input
      value={value}
      className="w-120"
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Nhâp tên thương hiệu cần tìm kiếm..."
    />
  );
};
