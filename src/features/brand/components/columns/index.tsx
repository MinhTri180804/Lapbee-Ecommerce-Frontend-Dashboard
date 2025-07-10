import type { Brand } from "@/types/brand";
import { createColumnHelper } from "@tanstack/react-table";
import {
  CellActions,
  CellBanner,
  CellCreatedAt,
  CellLogo,
  CellName,
  CellSelect,
  CellSlug,
  CellSTT,
  CellUpdatedAt,
  HeaderCellActions,
  HeaderCellBanner,
  HeaderCellCreatedAt,
  HeaderCellLogo,
  HeaderCellName,
  HeaderCellSelect,
  HeaderCellSlug,
  HeaderCellSTT,
  HeaderCellUpdatedAt,
} from "./cells";

const columnHelper = createColumnHelper<Brand>();

export const columns = [
  columnHelper.display({
    id: "check",
    header: () => <HeaderCellSelect />,
    cell: () => <CellSelect />,
    meta: {
      headerClassName: "w-[40px]",
      cellClassName: "w-[40px]",
    },
  }),

  columnHelper.display({
    id: "index",
    cell: (props) => <CellSTT index={props.row.index} />,
    header: () => <HeaderCellSTT />,
    meta: {
      headerClassName: "w-[60px]",
      cellClassName: "w-[60px]",
    },
  }),

  columnHelper.accessor("name", {
    cell: ({ cell }) => (
      <CellName name={cell.getValue()} slug={cell.row.getValue("slug")} />
    ),
    header: () => <HeaderCellName />,
    meta: {
      headerClassName: "min-w-[100px]",
      cellClassName: "min-w-[100px]",
    },
  }),

  columnHelper.accessor("slug", {
    header: () => <HeaderCellSlug />,
    cell: (slug) => <CellSlug slug={slug.getValue()} />,
    meta: {
      headerClassName: "min-w-[100px]",
      cellClassName: "min-w-[100px]",
    },
  }),

  columnHelper.accessor("logo.publicId", {
    header: () => <HeaderCellLogo />,
    cell: (publicIdLogo) => <CellLogo publicId={publicIdLogo.getValue()} />,
    meta: {
      headerClassName: "min-w-[60px]",
      cellClassName: "min-w-[60px]",
    },
  }),

  columnHelper.accessor("banners", {
    header: () => <HeaderCellBanner />,
    cell: (banners) => <CellBanner banners={banners.getValue()} />,
    meta: {
      headerClassName: "min-w-[80px]",
      cellClassName: "min-w-[80px]",
    },
  }),

  columnHelper.accessor("createdAt", {
    header: () => <HeaderCellCreatedAt />,
    cell: (createdAt) => <CellCreatedAt createdAt={createdAt.getValue()} />,
    meta: {
      headerClassName: "w-[240px]",
      cellClassName: "w-[240px]",
    },
  }),

  columnHelper.accessor("updatedAt", {
    header: () => <HeaderCellUpdatedAt />,
    cell: (updatedAt) => <CellUpdatedAt updatedAt={updatedAt.getValue()} />,
    meta: {
      headerClassName: "w-[240px]",
      cellClassName: "w-[240px]",
    },
  }),

  columnHelper.display({
    id: "actions",
    header: () => <HeaderCellActions />,
    cell: ({ row }) => <CellActions brandId={row.original.id} />,
    meta: {
      headerClassName: "min-w-[80px]",
      cellClassName: "min-w-[80px]",
    },
  }),
];
