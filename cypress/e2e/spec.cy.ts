describe("form submission routine", () => {
  it("should display loading message during submission", () => {
    cy.visit("http://localhost:3000");

    cy.get("#page-heading")
      .contains("Buscar fornecedores")
      .next()
      .contains(
        "Iremos buscar os melhores fornecedores de acordo com o seu consumo mensal",
      );

    cy.intercept("POST", "http://localhost:3000/api/graphql").as("graphql");
    cy.get("input[type='number']").type("9000");
    cy.get("button[type='submit']").click();
    cy.get("h4").contains("Encontrando as melhores opções para você...");
    cy.wait("@graphql").then(() => {
      cy.get("h4").contains(
        "Encontramos 8 fornecedores compatíveis com o seu consumo mensal",
      );

      cy.get(".grid").children().should("have.length", 8);
    });
  });
});
