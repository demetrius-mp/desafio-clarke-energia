"use client";
import { useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { Else, If, Then } from "react-if";

import { gql } from "@/__generated__";
import {
  EnergySupplierCard,
  EnergySupplierCardGrid,
  SkeletonEnergySupplierCard,
} from "@/components/energy-supplier-card";
import { Typography } from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import { pluralize } from "@/lib/utils/pluralize";

import { MonthlyConsumptionForm } from "./monthly-consumption-form";

const SEARCH_ENERGY_SUPPLIERS = gql(`
  query GetSuppliers($monthlyConsumption: Int!) {
    energySuppliers(monthlyConsumption: $monthlyConsumption) {
      id
      logo
      name
      state
      averageRating
      costPerKwh
      minKwhLimit
      totalClients
    }
  }
`);

export function PageContent() {
  const [search, { loading, data, error }] = useLazyQuery(
    SEARCH_ENERGY_SUPPLIERS,
    {
      // force the query to be executed every time to show loading state
      fetchPolicy: "network-only",
    },
  );

  const [monthlyConsumption, setMonthlyConsumption] = useState(0);

  return (
    <>
      <MonthlyConsumptionForm
        isPending={loading}
        onSubmit={async (values) => {
          await search({
            variables: {
              monthlyConsumption: values.monthlyConsumption,
            },
          });

          setMonthlyConsumption(values.monthlyConsumption);
        }}
      />

      <If condition={loading}>
        <Then>
          <Separator className="mt-8 mb-4" />

          <Typography variant="h4" className="text-center md:text-start">
            Encontrando as melhores opções para você...
          </Typography>

          <EnergySupplierCardGrid aria-hidden>
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonEnergySupplierCard key={index} />
            ))}
          </EnergySupplierCardGrid>
        </Then>

        <Else>
          {data?.energySuppliers && (
            <>
              <Separator className="mt-8 mb-4" />

              <If condition={data.energySuppliers.length === 0}>
                <Then>
                  <Typography
                    variant="h4"
                    className="text-center md:text-start text-balance"
                  >
                    Não encontramos nenhum fornecedor compatível com o seu
                    consumo mensal
                  </Typography>
                </Then>

                <Else>
                  <Typography
                    variant="h4"
                    className="text-center md:text-start text-balance"
                  >
                    Encontramos {data.energySuppliers.length}{" "}
                    {pluralize(
                      "fornecedor",
                      data.energySuppliers.length,
                      "fornecedores",
                    )}{" "}
                    {pluralize(
                      "compatível",
                      data.energySuppliers.length,
                      "compatíveis",
                    )}{" "}
                    com o seu consumo mensal
                  </Typography>

                  <EnergySupplierCardGrid>
                    {data.energySuppliers.map((supplier) => (
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

          {error && (
            <>
              <Separator className="mt-8 mb-4" />

              <Typography variant="h4" className="text-center md:text-start">
                {"Algo deu errado. Tente novamente mais tarde."}
              </Typography>
            </>
          )}
        </Else>
      </If>
    </>
  );
}
