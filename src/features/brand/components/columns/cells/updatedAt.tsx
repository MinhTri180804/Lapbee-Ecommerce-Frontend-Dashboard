import type { FC } from "react";

type CellUpdatedAtProps = {
  updatedAt: string;
};

export const CellUpdatedAt: FC<CellUpdatedAtProps> = ({ updatedAt }) => {
  const timeFormat = Intl.DateTimeFormat("vi-VN", {
    timeStyle: "medium",
    dateStyle: "medium",
  }).format(new Date(updatedAt));
  return <div>{timeFormat}</div>;
};

export const HeaderCellUpdatedAt: FC = () => {
  return <div>Thời gian cập nhật</div>;
};
