"use client";

import { Else, If, Then } from "react-if";
import { fetchSuppliers } from "@/app/actions";
import {
  EnergySupplierCard,
  EnergySupplierCardGrid,
  SkeletonEnergySupplierCard,
} from "@/components/energy-supplier-card";
import { MonthlyConsumptionForm } from "@/components/forms/monthly-consumption-form";
import { Typography } from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import { pluralize } from "@/lib/utils/pluralize";

import { useFormAction } from "@/lib/hooks/use-handle-submit";
import { useState } from "react";

export function PageContent() {
  const [state, handleSubmit, isPending] = useFormAction(fetchSuppliers);

  const [monthlyConsumption, setMonthlyConsumption] = useState(0);

  return (
    <>
      <MonthlyConsumptionForm
        state={state}
        isPending={isPending}
        onSubmit={async (data) => {
          setMonthlyConsumption(data.monthlyConsumption);

          await handleSubmit(data);
        }}
      />

      <If condition={isPending}>
        <Then>
          <Separator className="mt-8 mb-4" />

          <Typography variant="h4" className="text-center md:text-start">
            Encontrando as melhores opções para você...
          </Typography>

          <EnergySupplierCardGrid>
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonEnergySupplierCard key={index} />
            ))}
          </EnergySupplierCardGrid>
        </Then>

        <Else>
          {state?.status === "success" && state.result !== undefined && (
            <>
              <Separator className="mt-8 mb-4" />

              <If condition={state.result.length === 0}>
                <Then>
                  <Typography
                    variant="h4"
                    className="text-center md:text-start"
                  >
                    Não encontramos nenhum fornecedor compatível com o seu
                    consumo mensal.
                  </Typography>
                </Then>

                <Else>
                  <Typography
                    variant="h4"
                    className="text-center md:text-start"
                  >
                    Encontramos {state.result.length}{" "}
                    {pluralize(
                      "fornecedor",
                      state.result.length,
                      "fornecedores"
                    )}{" "}
                    {pluralize(
                      "compatível",
                      state.result.length,
                      "compatíveis"
                    )}{" "}
                    com o seu consumo mensal!
                  </Typography>

                  <EnergySupplierCardGrid>
                    {state.result.map((supplier) => (
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

          {state?.status === "error" && (
            <>
              <Separator className="mt-8 mb-4" />

              <Typography variant="h4" className="text-center md:text-start">
                {state.message || "Algo deu errado"}
              </Typography>
            </>
          )}
        </Else>
      </If>
    </>
  );
}
