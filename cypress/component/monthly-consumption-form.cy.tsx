import { MonthlyConsumptionForm } from "@/app/monthly-consumption-form";

describe("<MonthlyConsumptionForm />", () => {
  it("should render and display expected content", () => {
    const onSubmitSpy = cy.spy().as("onSubmitSpy");

    cy.mount(
      <MonthlyConsumptionForm isPending={false} onSubmit={onSubmitSpy} />,
    );

    cy.get("form").should("exist");
    cy.get("label").contains("Consumo mensal (em kWh)");
    cy.get("input[type='number']").should("exist");
    cy.get("button[type='submit']").contains("Buscar");
  });
});

describe("<MonthlyConsumptionForm /> with pending state", () => {
  it("should render submit button in disabled state", () => {
    const onSubmitSpy = cy.spy().as("onSubmitSpy");

    cy.mount(
      <MonthlyConsumptionForm isPending={true} onSubmit={onSubmitSpy} />,
    );

    cy.get("button[type='submit']").should("be.disabled");
  });
});

describe("<MonthlyConsumptionForm /> with event handler", () => {
  it("should fire event with expected value", () => {
    const onSubmitSpy = cy.spy().as("onSubmitSpy");

    cy.mount(
      <MonthlyConsumptionForm isPending={false} onSubmit={onSubmitSpy} />,
    );

    cy.get("input[type='number']").type("100");
    cy.get("button[type='submit']").click();
    cy.get("@onSubmitSpy").should("have.been.calledWith", {
      monthlyConsumption: 100,
    });
  });
});

describe("<MonthlyConsumptionForm /> with invalid input", () => {
  it("should state that input is invalid and show error message", () => {
    const onSubmitSpy = cy.spy().as("onSubmitSpy");

    cy.mount(
      <MonthlyConsumptionForm isPending={false} onSubmit={onSubmitSpy} />,
    );

    cy.get("input[type='number']").type("0");
    cy.get("button[type='submit']").click();
    cy.get("input[type='number']").should("have.attr", "aria-invalid", "true");

    cy.get("input[type='number']")
      .should("have.attr", "id")
      .then((id) => {
        cy.get(`[id="${id}-message"]`).contains("O valor deve ser maior que 0");
      });
  });
});

describe("<MonthlyConsumptionForm /> with event handler and invalid input", () => {
  it("should not fire event", () => {
    const onSubmitSpy = cy.spy().as("onSubmitSpy");

    cy.mount(
      <MonthlyConsumptionForm isPending={false} onSubmit={onSubmitSpy} />,
    );

    cy.get("input[type='number']").type("0");
    cy.get("button[type='submit']").click();
    cy.get("@onSubmitSpy").should("not.have.been.calledBefore");
  });
});
