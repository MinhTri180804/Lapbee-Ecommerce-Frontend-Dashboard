import type { FC } from "react";
import { Link } from "react-router";

type CellNameProps = {
  name: string;
  slug: string;
};

export const CellName: FC<CellNameProps> = ({ name, slug }) => {
  return (
    <Link to={slug} className="hover:underline">
      {name}
    </Link>
  );
};

export const HeaderCellName: FC = () => {
  return <div>Tên thương hiệu</div>;
};
