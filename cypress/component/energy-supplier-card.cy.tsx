import { EnergySupplierCard } from "@/components/energy-supplier-card";

describe("<EnergySupplierCard />", () => {
  it("should render and display expected information", () => {
    cy.mount(
      <EnergySupplierCard
        id="1"
        name="Energy"
        logo="https://picsum.photos/200"
        state="São Paulo"
        totalClients={100}
        averageRating={4.5}
        costPerKwh={0.5}
        minKwhLimit={100}
        monthlyConsumption={1000}
      />,
    );

    cy.get("#company-logo")
      .get("img")
      .should("have.attr", "src", "https://picsum.photos/200")
      .should("have.attr", "alt", "Logo da empresa Energy");

    cy.get("#company-identification").contains("Energy").contains("São Paulo");

    cy.get("#company-rating").contains("(4.5 de 5)");

    cy.get("#company-info")
      .contains("Quantidade de clientes: 100")
      .next()
      .contains("Custo por kWh: R$ 0,50")
      .next()
      .contains("Consumo mínimo: 100 kWh")
      .next()
      .contains("Custo por 1.000 kWh: R$ 500,00");

    cy.get("button").contains("Receber proposta");
  });
});

describe("<EnergySupplierCard /> with invalid logo", () => {
  it("should render company name initials", () => {
    cy.mount(
      <EnergySupplierCard
        id="1"
        name="Energy"
        logo="invalid-link"
        state="São Paulo"
        totalClients={100}
        averageRating={4.5}
        costPerKwh={0.5}
        minKwhLimit={100}
        monthlyConsumption={1000}
      />,
    );

    cy.get("#company-logo").contains("EN");
  });
});
