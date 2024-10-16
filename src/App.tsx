import { Container } from "@/components/container";
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

      <Separator className="mb-8 mt-6" />

      <MonthlyConsumptionForm />
    </Container>
  );
}

export default App;
