import { Else, If, Then } from "react-if";
import { Container } from "@/components/container";
import {
  EnergySupplierCard,
  EnergySupplierCardGrid,
  SkeletonEnergySupplierCard,
} from "@/components/energy-supplier-card";
import { MonthlyConsumptionForm } from "@/components/forms/monthly-consumption-form";
import { PageHeading } from "@/components/page-heading";
import { Typography } from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import { useFetcher } from "@/hooks/use-fetcher";
import { fetchEnergySuppliers } from "@/lib/fetchers/fetch-energy-suppliers";
import { pluralize } from "@/lib/pluralize";

function App() {
  const { data, isPending, refetch } = useFetcher({
    fetcher: fetchEnergySuppliers,
  });

  return (
    <Container className="my-4 sm:my-6 lg:my-8">
      <PageHeading
        title="Formulário de consumo mensal"
        description="Iremos buscar os melhores fornecedores de acordo com as suas necessidades."
      />

      <MonthlyConsumptionForm
        onSubmit={async (values) => {
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
                  <EnergySupplierCard key={supplier.id} {...supplier} />
                ))}
              </EnergySupplierCardGrid>
            </Else>
          </If>
        </>
      )}
    </Container>
  );
}

export default App;
