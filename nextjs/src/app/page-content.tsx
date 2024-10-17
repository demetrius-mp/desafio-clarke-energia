"use client";

import { Else, If, Then } from "react-if";
import { fetchEnergySuppliers } from "@/app/actions";
import {
  EnergySupplierCard,
  EnergySupplierCardGrid,
  SkeletonEnergySupplierCard,
} from "@/components/energy-supplier-card";
import { MonthlyConsumptionForm } from "@/components/forms/monthly-consumption-form";
import { Typography } from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import { pluralize } from "@/lib/utils/pluralize";
import { usePendingAction } from "@/lib/hooks/use-pending-action";

export function PageContent() {
  const [state, action, isPending] = usePendingAction(
    fetchEnergySuppliers,
    null
  );

  return (
    <>
      <form action={action}>
        <MonthlyConsumptionForm state={state} />
      </form>

      {isPending && (
        <>
          <Separator className="mt-8 mb-4" />

          <Typography variant="h4" className="text-center md:text-start">
            Encontrando as melhores opções para você...
          </Typography>

          <EnergySupplierCardGrid>
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonEnergySupplierCard key={index} />
            ))}
          </EnergySupplierCardGrid>
        </>
      )}

      {!isPending &&
        state?.status === "success" &&
        state.result !== undefined && (
          <>
            <Separator className="mt-8 mb-4" />

            <If condition={state.result.length === 0}>
              <Then>
                <Typography variant="h4" className="text-center md:text-start">
                  Não encontramos nenhum fornecedor compatível com o seu consumo
                  mensal.
                </Typography>
              </Then>

              <Else>
                <Typography variant="h4" className="text-center md:text-start">
                  Encontramos {state.result.length}{" "}
                  {pluralize("fornecedor", state.result.length, "fornecedores")}{" "}
                  {pluralize("compatível", state.result.length, "compatíveis")}{" "}
                  com o seu consumo mensal!
                </Typography>

                <EnergySupplierCardGrid>
                  {state.result.map((supplier) => (
                    <EnergySupplierCard
                      monthlyConsumption={0}
                      key={supplier.id}
                      {...supplier}
                    />
                  ))}
                </EnergySupplierCardGrid>
              </Else>
            </If>
          </>
        )}
    </>
  );
}
