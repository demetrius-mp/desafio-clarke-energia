import { Container } from "@/components/container";
import { EnergySupplierCard } from "@/components/energy-supplier-card";
import { MonthlyConsumptionForm } from "@/components/forms/monthly-consumption-form";
import { PageHeading } from "@/components/page-heading";
import { Separator } from "@/components/ui/separator";

function App() {
  return (
    <Container className="mt-16">
      <PageHeading
        title="Formulário de consumo mensal"
        description="Iremos buscar os melhores fornecedores de acordo com as suas necessidades."
      />

      <MonthlyConsumptionForm />

      <Separator className="my-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {Array.from({ length: 5 }).map((_, i) => {
          return (
            <EnergySupplierCard
              key={i}
              id="demetrius.mp789@gmail.com"
              logo="https://picsum.photos/200"
              name="Energisa"
              state="Mato Grosso do Sul"
              costPerKwh={0.9}
              minKwhLimit={15000}
              totalClients={1000}
              averageRating={i + Math.random()}
            />
          );
        })}
      </div>
    </Container>
  );
}

export default App;
