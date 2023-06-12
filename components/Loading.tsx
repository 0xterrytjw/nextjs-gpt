import React from "react";
import { CSSProperties } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { cn } from "@/utils/cn";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

// const CONNEXUS_BLUE = "#1A7DFF";

type LoadingProps = {
  color?: string;
  className?: string;
};
const Loading = ({ color, className }: LoadingProps) => {
  return (
    <div
      aria-label="Loading..."
      role="status"
      className={cn(
        "flex animate-pulse flex-col items-center justify-center",
        className ?? ""
      )}
    >
      <div className="sweet-loading">
        <BeatLoader
          color={color}
          loading={true}
          cssOverride={override}
          size={10}
          aria-label="Loading Animation"
          data-testid="loading-animation"
        />
      </div>
    </div>
  );
};

export default Loading;
