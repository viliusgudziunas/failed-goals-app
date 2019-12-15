import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';
import { submitRegisterForm } from './Utilities';

jest.mock(`react-redux`, () => ({
  useDispatch: jest.fn()
}));

describe('Register Form component', () => {
  beforeEach(() => {
    useDispatch.mockClear();
  });

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
  beforeEach(() => {
    useDispatch.mockClear();
  });

  const component = shallow(<RegisterForm />);
  it('should disable submit button', () => {
    submitRegisterForm(component);
    expect(component.find('button').prop('disabled')).toBe(true);
  });

  // should call a method
});
