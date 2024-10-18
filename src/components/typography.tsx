import React from "react";

import { cn } from "@/lib/utils/shadcn-utils";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "subtitle"
  | "body"
  | "lead"
  | "label"
  | "muted"
  | "tableHead";

type TypographyElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant: TypographyVariant;
  children: React.ReactNode;
  noWrap?: boolean;
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight text-foreground",
  h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 text-foreground",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight text-foreground",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight text-foreground",
  subtitle: "text-sm text-muted-foreground",
  body: "leading-7 [&:not(:first-child)]:mt-6 text-foreground",
  lead: "text-lg text-muted-foreground",
  muted: "text-sm text-muted-foreground",
  label: "text-sm font-medium leading-none text-accent-foreground",
  tableHead: "font-medium text-muted-foreground",
};

const variantElements: Record<TypographyVariant, TypographyElement> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  subtitle: "p",
  body: "p",
  lead: "p",
  label: "span",
  muted: "span",
  tableHead: "span",
};

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ variant, children, className, noWrap = false, ...props }, ref) => {
    const Component = variantElements[variant];

    return React.createElement(
      Component,
      {
        ref,
        className: cn(variantStyles[variant], noWrap && "truncate", className),
        ...props,
      },
      children,
    );
  },
);

Typography.displayName = "Typography";
