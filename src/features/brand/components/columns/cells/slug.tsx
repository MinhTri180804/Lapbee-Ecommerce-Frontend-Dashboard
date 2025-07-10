import type { FC } from "react";

type CellSlugProps = {
  slug: string;
};

export const CellSlug: FC<CellSlugProps> = ({ slug }) => {
  return <div>{slug}</div>;
};

export const HeaderCellSlug: FC = () => {
  return <div>Slug</div>;
};
