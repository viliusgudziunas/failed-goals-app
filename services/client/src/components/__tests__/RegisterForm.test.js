import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import RegisterForm from "../RegisterForm";

describe("Register Form component", () => {
  it("should match the snapshot", () => {
    const tree = renderer.create(<RegisterForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  const component = shallow(<RegisterForm />);
  it("should have a header", () => {
    const header = component.find("h1");
    expect(header.length).toBe(1);
    expect(header.get(0).props.children).toBe("Register");
  });
});
