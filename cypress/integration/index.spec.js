describe("Index page", () => {
  it("should be displayed correctly", () => {
    cy.visit("/")
      .get("h1")
      .contains("Goals");
  });
});
