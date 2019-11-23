describe("Index", () => {
  it("should display the page correctly", () => {
    cy.visit("/")
      .get("h1")
      .contains("Goals");
  });
});
