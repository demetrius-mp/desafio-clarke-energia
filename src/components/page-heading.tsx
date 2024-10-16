import { Typography } from "@/components/typography";

type PageHeadingProps = {
  title: string;
  description: string;
};

export function PageHeading(props: PageHeadingProps) {
  const { title, description } = props;

  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <Typography variant="h2">{title}</Typography>

        <Typography className="mt-1" variant="subtitle">
          {description}
        </Typography>
      </div>
    </div>
  );
}
