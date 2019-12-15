import faker from 'faker';

const fakeEmail = faker.internet.email();
const fakePassword = faker.internet.password();

const fakeRegisterDetails = {
  email: fakeEmail,
  password: fakePassword
};

export const submitRegisterForm = (
  component,
  details = fakeRegisterDetails
) => {
  const emailField = component.find('input[type="email"]');
  emailField.simulate('change', { target: { value: details.email } });

  const passwordField = component.find('input[type="password"]');
  passwordField.simulate('change', { target: { value: details.password } });
};

export const random = () => {};
