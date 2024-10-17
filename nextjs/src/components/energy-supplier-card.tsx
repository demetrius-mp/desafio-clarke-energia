import { Typography } from "@/components/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Entities } from "@/types";

import { Icon } from "@iconify-icon/react";
import starIcon from "@iconify-icons/mdi/star";
import starHalfFullIcon from "@iconify-icons/mdi/star-half-full";
import starOutlineIcon from "@iconify-icons/mdi/star-outline";

type EnergySupplierCardProps = Entities.EnergySupplier & {
  monthlyConsumption: number;
};

function getInitials(name: string) {
  const splitted = name.split(" ");

  if (splitted.length === 2) {
    const firstChar = splitted[0][0];
    const secondChar = splitted[1][0];

    return `${firstChar}${secondChar}`.toUpperCase();
  }

  return name.slice(0, 2).toUpperCase();
}

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const numberFormatter = new Intl.NumberFormat("pt-BR");

export function EnergySupplierCard(props: EnergySupplierCardProps) {
  const {
    name,
    logo,
    state,
    costPerKwh,
    minKwhLimit,
    totalClients,
    averageRating,
    monthlyConsumption,
  } = props;

  const numberOfFullStars = Math.floor(averageRating + Number.EPSILON);
  const hasHalfStar = averageRating - numberOfFullStars >= 0.5;
  const numberOfEmptyStars = 5 - numberOfFullStars - (hasHalfStar ? 1 : 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-start gap-2">
          <Avatar className="h-11 w-11">
            <AvatarImage src={logo} alt={`Logo da empresa ${name}`} />
            <AvatarFallback className="text-sm">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-0.5">
            {name}
            <CardDescription className="font-normal">{state}</CardDescription>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="-mt-4">
        <div className="flex items-center gap-1 mb-4">
          <div className="flex">
            {Array.from({ length: numberOfFullStars }).map((_, i) => {
              return <Icon className="text-xl" icon={starIcon} key={i} />;
            })}

            {hasHalfStar && (
              <Icon className="text-xl" icon={starHalfFullIcon} />
            )}

            {Array.from({ length: numberOfEmptyStars }).map((_, i) => {
              return (
                <Icon className="text-xl" icon={starOutlineIcon} key={i} />
              );
            })}
          </div>

          <Typography variant="muted">
            ({Math.round((averageRating + Number.EPSILON) * 100) / 100} de 5)
          </Typography>
        </div>

        <ul className="ml-6 list-disc [&>li]:mt-2">
          <li>
            Quantidade de clientes:{" "}
            <span className="font-semibold">
              {numberFormatter.format(totalClients)}
            </span>
          </li>
          <li>
            Custo por kWh:{" "}
            <span className="font-semibold">
              {currencyFormatter.format(costPerKwh)}
            </span>
          </li>
          <li>
            Consumo mínimo:{" "}
            <span className="font-semibold">
              {numberFormatter.format(minKwhLimit)} kWh
            </span>
          </li>
          <li className="underline">
            Custo por {numberFormatter.format(monthlyConsumption)} kWh:{" "}
            <span className="font-semibold">
              {currencyFormatter.format(costPerKwh * monthlyConsumption)}
            </span>
          </li>
        </ul>
      </CardContent>

      <CardFooter className="flex">
        <Button className="w-full">Receber proposta</Button>
      </CardFooter>
    </Card>
  );
}

export function SkeletonEnergySupplierCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-2">
          <Avatar className="h-11 w-11">
            <AvatarFallback className="text-sm">
              <Skeleton />
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col justify-between gap-2 w-full">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="-mt-2">
        <div className="flex items-center gap-1 mb-5">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[64px]" />
        </div>

        <ul className="flex gap-1.5 flex-col">
          <li>
            <Skeleton className="h-6 w-full" />
          </li>
          <li>
            <Skeleton className="h-6 w-full" />
          </li>
          <li>
            <Skeleton className="h-6 w-full" />
          </li>
          <li>
            <Skeleton className="h-6 w-full" />
          </li>
        </ul>
      </CardContent>

      <CardFooter className="flex">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}

export function EnergySupplierCardGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-4">
      {children}
    </div>
  );
}
