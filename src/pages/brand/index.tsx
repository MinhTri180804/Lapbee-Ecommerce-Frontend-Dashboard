import { Button } from "@/components/ui/button";
import {
  DataTable,
  Pagination,
  Search,
  useGetAllBrand,
} from "@/features/brand";
import { useDebounce } from "@/hooks/useDebounce";
import { useState, type FC } from "react";
import { useSearchParams } from "react-router";

const searchParamsNames = {
  page: "trang",
  limit: "gioi-han",
  search: "tim-kiem",
};

export const BrandPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>(
    searchParams.get(searchParamsNames.search) || "",
  );
  const debouncedSearchValue = useDebounce<string>(searchValue, 300);
  const [pagination, setPagination] = useState({
    pageIndex: Number(searchParams.get(searchParamsNames.page)) || 1,
    pageSize: Number(searchParams.get(searchParamsNames.limit)) || 10,
  });

  const { isLoading, data } = useGetAllBrand({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    searchValue: debouncedSearchValue,
  });

  const handleNextPage = () => {
    setSearchParams(() => {
      const newSearchParams = {
        [searchParamsNames.page]: String(pagination.pageIndex + 1),
        [searchParamsNames.limit]: String(pagination.pageSize),
      };

      if (debouncedSearchValue !== "") {
        newSearchParams[searchParamsNames.search] =
          String(debouncedSearchValue);
      }

      return newSearchParams;
    });

    setPagination((previous) => ({
      ...previous,
      pageIndex: previous.pageIndex + 1,
    }));
  };

  const handlePreviousPage = () => {
    setSearchParams(() => {
      const newSearchParams = {
        [searchParamsNames.page]: String(pagination.pageIndex - 1),
        [searchParamsNames.limit]: String(pagination.pageSize),
      };

      if (debouncedSearchValue !== "") {
        newSearchParams[searchParamsNames.search] =
          String(debouncedSearchValue);
      }

      return newSearchParams;
    });

    setPagination((previous) => ({
      ...previous,
      pageIndex: previous.pageIndex - 1,
    }));
  };

  const handleSelectPage = (pageSelected: number) => {
    setSearchParams(() => {
      const newSearchParams = {
        [searchParamsNames.page]: String(pageSelected),
        [searchParamsNames.limit]: String(pagination.pageSize),
      };

      if (debouncedSearchValue !== "") {
        newSearchParams[searchParamsNames.search] =
          String(debouncedSearchValue);
      }

      return newSearchParams;
    });

    setPagination((previous) => ({
      ...previous,
      pageIndex: pageSelected,
    }));
  };

  const handleSelectLimit = (limitValue: number) => {
    setSearchParams(() => {
      const newSearchParams = {
        [searchParamsNames.page]: String(pagination.pageIndex),
        [searchParamsNames.limit]: String(limitValue),
      };

      if (debouncedSearchValue !== "") {
        newSearchParams[searchParamsNames.search] =
          String(debouncedSearchValue);
      }

      return newSearchParams;
    });

    setPagination((previous) => ({
      ...previous,
      pageSize: limitValue,
    }));
  };

  const handleSearch = (value: string) => {
    //TODO: Implement useDebounce
    setSearchParams(() => {
      const newSearchParams = {
        [searchParamsNames.page]: String(1),
        [searchParamsNames.limit]: String(pagination.pageSize),
      };

      if (value !== "") {
        newSearchParams[searchParamsNames.search] = value;
      }

      return newSearchParams;
    });

    setPagination((previous) => ({
      ...previous,
      pageIndex: 1,
    }));
    setSearchValue(value);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Search handleSearch={handleSearch} value={searchValue} />
        <Button variant={"outline"}>Tạo mới thương hiệu</Button>
      </div>
      <DataTable
        isLoading={isLoading}
        data={data?.data ?? []}
        pagination={data?.metadata}
      />
      <Pagination
        data={data?.metadata}
        isLoading={isLoading}
        handleSelectLimit={handleSelectLimit}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handleSelectPage={handleSelectPage}
      />
    </div>
  );
};
