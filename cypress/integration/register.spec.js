describe("Register page", () => {
  it("should be displayed correctly", () => {
    cy.visit("/register")
      .get("h1")
      .contains("Register");
  });
});
