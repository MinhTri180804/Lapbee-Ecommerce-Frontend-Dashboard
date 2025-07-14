import type { FC } from "react";

type CellCreatedAtProps = {
  createdAt: string;
};

export const CellCreatedAt: FC<CellCreatedAtProps> = ({ createdAt }) => {
  const timeFormat = new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(new Date(createdAt));
  return <div>{timeFormat}</div>;
};

export const HeaderCellCreatedAt: FC = () => {
  return <div>Thời gian tạo</div>;
};
