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

import { Icon } from "@iconify-icon/react";
import starIcon from "@iconify-icons/mdi/star";
import starHalfFullIcon from "@iconify-icons/mdi/star-half-full";
import starOutlineIcon from "@iconify-icons/mdi/star-outline";

type EnergySupplierCardProps = {
  id: string;
  name: string;
  logo: string;
  state: string;
  costPerKwh: number;
  minKwhLimit: number;
  totalClients: number;
  averageRating: number;
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

export function EnergySupplierCard(props: EnergySupplierCardProps) {
  const {
    name,
    logo,
    state,
    costPerKwh,
    minKwhLimit,
    totalClients,
    averageRating,
  } = props;

  const numberOfFullStars = Math.floor(averageRating + Number.EPSILON);
  const hasHalfStar = averageRating - numberOfFullStars >= 0.5;
  const numberOfEmptyStars = 5 - numberOfFullStars - (hasHalfStar ? 1 : 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={logo} alt="@shadcn" />
            <AvatarFallback className="text-sm">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>

          {name}
        </CardTitle>
        <CardDescription>{state}</CardDescription>
      </CardHeader>
      <CardContent className="-mt-4">
        <div className="flex items-center gap-1">
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
            Custo por kWh:{" "}
            <span className="font-semibold">
              {currencyFormatter.format(costPerKwh)}
            </span>
          </li>
          <li>
            Limite mínimo de kWh:{" "}
            <span className="font-semibold">{minKwhLimit} kWh</span>
          </li>
          <li>
            Quantidade de clientes:{" "}
            <span className="font-semibold">{totalClients}</span>
          </li>
        </ul>
      </CardContent>

      <CardFooter className="flex">
        <Button className="w-full">Receber proposta</Button>
      </CardFooter>
    </Card>
  );
}
