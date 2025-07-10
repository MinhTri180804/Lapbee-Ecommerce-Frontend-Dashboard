import type { FC } from "react";

type CellSTTProps = {
  index: number;
};

export const CellSTT: FC<CellSTTProps> = ({ index }) => {
  return <div className="text-center">{index + 1}</div>;
};

export const HeaderCellSTT = () => {
  return <div className="text-center">STT</div>;
};
