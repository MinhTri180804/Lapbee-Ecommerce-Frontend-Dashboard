import { cn } from "@/lib/utils";
import type { ComponentProps, FC, PropsWithChildren } from "react";

type ResourcesManagerSectionProps = PropsWithChildren &
  ComponentProps<"section">;

export const ResourcesManagerSection: FC<ResourcesManagerSectionProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <section className={cn("flex flex-col gap-4", className)} {...props}>
      {children}
    </section>
  );
};

type ResourcesManagerSectionTitleProps = PropsWithChildren &
  ComponentProps<"div">;

export const ResourcesManagerSectionTitle: FC<
  ResourcesManagerSectionTitleProps
> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "text-foreground flex flex-row justify-between text-base font-medium",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

type ResourcesManagerSectionContentProps = PropsWithChildren &
  ComponentProps<"div">;

export const ResourcesManagerSectionContent: FC<
  ResourcesManagerSectionContentProps
> = ({ children, className, ...props }) => {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      {children}
    </div>
  );
};

type ResourcesManagerSectionFooterProps = PropsWithChildren &
  ComponentProps<"div">;

export const ResourcesManagerSectionFooter: FC<
  ResourcesManagerSectionFooterProps
> = ({ className, children, ...props }) => {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
};

type ResourcesManagerSectionContentItemProps = PropsWithChildren &
  ComponentProps<"div">;

export const ResourcesManagerSectionContentItem: FC<
  ResourcesManagerSectionContentItemProps
> = ({ children, className, ...props }) => {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
};
