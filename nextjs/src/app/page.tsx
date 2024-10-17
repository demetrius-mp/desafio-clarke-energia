"use client";

import { Container } from "@/components/container";
import { Else, If, Then } from "react-if";
import {
  EnergySupplierCard,
  EnergySupplierCardGrid,
  SkeletonEnergySupplierCard,
} from "@/components/energy-supplier-card";
import { MonthlyConsumptionForm } from "@/components/forms/monthly-consumption-form";
import { PageHeading } from "@/components/page-heading";
import { Typography } from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { pluralize } from "@/lib/utils/pluralize";
import { useFetcher } from "@/lib/hooks/use-fetcher";
import { fetchEnergySuppliers } from "@/lib/fetchers/fetch-energy-suppliers";

export default function Home() {
  const [monthlyConsumption, setMonthlyConsumption] = useState<number>(0);

  const { data, isPending, refetch } = useFetcher({
    fetcher: fetchEnergySuppliers,
  });

  return (
    <Container className="my-4 sm:my-6 lg:my-8">
      <PageHeading
        title="Buscar fornecedores"
        description="Iremos buscar os melhores fornecedores de acordo com o seu consumo mensal"
      />

      <MonthlyConsumptionForm
        onSubmit={async (values) => {
          setMonthlyConsumption(values.monthlyConsumption);
          await refetch({
            monthlyConsumption: values.monthlyConsumption,
          });
        }}
      />

      {isPending && (
        <>
          <Separator className="mt-8 mb-4" />

          <Typography variant="h4">
            Encontrando as melhores opções para você...
          </Typography>

          <EnergySupplierCardGrid>
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonEnergySupplierCard key={index} />
            ))}
          </EnergySupplierCardGrid>
        </>
      )}

      {!isPending && data && (
        <>
          <Separator className="mt-8 mb-4" />

          <If condition={data.length === 0}>
            <Then>
              <Typography variant="h4" className="text-center md:text-start">
                Não encontramos nenhum fornecedor compatível com o seu consumo
                mensal.
              </Typography>
            </Then>

            <Else>
              <Typography variant="h4" className="text-center md:text-start">
                Encontramos {data.length}{" "}
                {pluralize("fornecedor", data.length, "fornecedores")}{" "}
                {pluralize("compatível", data.length, "compatíveis")} com o seu
                consumo mensal!
              </Typography>

              <EnergySupplierCardGrid>
                {data.map((supplier) => (
                  <EnergySupplierCard
                    monthlyConsumption={monthlyConsumption}
                    key={supplier.id}
                    {...supplier}
                  />
                ))}
              </EnergySupplierCardGrid>
            </Else>
          </If>
        </>
      )}
    </Container>
  );
}
