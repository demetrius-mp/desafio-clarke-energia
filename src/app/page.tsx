import { Metadata } from "next";

import { Container } from "@/components/container";
import { PageHeading } from "@/components/page-heading";

import { PageContent } from "./page-content";

export const metadata: Metadata = {
  title: "Buscar fornecedores",
};

export default function Home() {
  return (
    <Container className="my-4 sm:my-6 lg:my-8">
      <PageHeading
        title="Buscar fornecedores"
        description="Iremos buscar os melhores fornecedores de acordo com o seu consumo mensal"
      />

      <PageContent />
    </Container>
  );
}
