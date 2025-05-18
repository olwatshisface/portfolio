import { Skeleton } from "primereact/skeleton";
import React from "react";

interface Props {
  text: string | undefined;
  size?: "large" | "normal" | "small";
  className?: string;
}

const TitleLayout: React.FC<Props> = ({
  text = "",
  size = "normal",
  className = "",
}) => {
  if (!text) return <Skeleton height="38px"></Skeleton>;
  return size === "normal" ? (
    <h2 className={className}>{text}</h2>
  ) : size === "large" ? (
    <h1 className={className}>{text}</h1>
  ) : (
    <h3 className={className}>{text}</h3>
  );
};

export { TitleLayout };
