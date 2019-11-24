import faker from 'faker';

const fakeEmail = faker.internet.email();
const fakePassword = faker.internet.password();

// Helpers
const register = (email = fakeEmail, password = fakePassword) => {
  if (email) {
    cy.get('#email').type(email);
  }
  if (password) {
    cy.get('#password').type(password);
  }
  cy.get('button[type="submit"]').click();
};

describe('Register form', () => {
  it('should be displayed', () => {
    cy.visit('/register')
      .get('h1')
      .contains('Register')
      .get('form');
  });
});

describe('Successful registration', () => {
  beforeEach(() => {
    cy.visit('/register');
    register();
  });

  it('should navigate to home url', () => {
    throw new Error('Not yet implemented');
  });

  it('should register a user', () => {
    cy.contains('Welcome new user!');
  });
});

describe('Register Form validation', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('should require email field to be non empty', () => {
    register('');

    cy.contains('Please fill in this field');
  });

  it('should require password field to be non empty', () => {
    register(fakeEmail, '');

    cy.contains('Please fill in this field');
  });

  it("should require email field to have '@' symbol", () => {
    register('test.com');

    cy.contains(
      "Please include an '@' in the email address. 'test.com' is missing an '@'"
    );
  });
});
