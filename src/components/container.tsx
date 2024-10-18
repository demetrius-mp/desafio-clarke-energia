import { ComponentProps } from "react";

import { cn } from "@/lib/utils/shadcn-utils";

type ContainerProps = ComponentProps<"div">;

export function Container(props: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto my-4 max-w-7xl px-4 sm:px-6 lg:px-8",
        props.className,
      )}
    >
      <div className="mx-auto max-w-6xl">{props.children}</div>
    </div>
  );
}
