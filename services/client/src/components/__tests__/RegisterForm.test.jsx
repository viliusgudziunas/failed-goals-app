import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import faker from 'faker';
import RegisterForm from '../RegisterForm';

const submitRegisterForm = () => {
  const component = shallow(<RegisterForm />);
  const fakeEmail = faker.internet.email();
  const fakePassword = faker.internet.password();
  // console.log(component.get(0));
  const emailField = component.find('input[type="email"]');
  emailField.simulate('change', { target: { value: fakeEmail } });
  // console.log(emailField.get(0));
  const passwordField = component.find('input[type="password"]');
  passwordField.simulate('change', { target: { value: fakePassword } });
};

describe('Register Form component', () => {
  // Snapshot
  it('should match the snapshot', () => {
    const tree = renderer.create(<RegisterForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  const component = shallow(<RegisterForm />);
  // Display
  it('should have a header', () => {
    const header = component.find('h1');
    expect(header.length).toBe(1);
    expect(header.get(0).props.children).toBe('Register');
  });

  const form = component.find('form');
  it('should have a form', () => {
    expect(form.length).toBe(1);
  });

  it('should have two input fields', () => {
    expect(form.find('input').length).toBe(2);
  });

  it('should have an email label and field', () => {
    expect(form.find('label[htmlFor="email"]').length).toBe(1);
    expect(form.find("input[type='email']").length).toBe(1);
  });

  it('should have a password label and field', () => {
    expect(form.find('label[htmlFor="password"]').length).toBe(1);
    expect(form.find("input[type='password']").length).toBe(1);
  });

  it('should have a submit button', () => {
    const button = form.find('button');
    expect(button.length).toBe(1);
    expect(button.prop('type')).toBe('submit');
    expect(button.prop('children')).toBe('Submit');
  });
});

describe('Successful submittion of Register Form', () => {
  const component = shallow(<RegisterForm />);
  it('should disable submit button', () => {
    submitRegisterForm();
    expect(component.find('button').prop('disabled')).toBe(true);
  });

  // should call a method
});
