describe('Register form', () => {
  it('should be displayed', () => {
    cy.visit('/register')
      .get('h1')
      .contains('Register')
      .get('form');
  });
});
