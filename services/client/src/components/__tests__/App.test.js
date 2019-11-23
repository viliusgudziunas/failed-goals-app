import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import App from "../App";

describe("Index component", () => {
  it("should match the snapshot", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  const component = shallow(<App />);
  it("should have a header", () => {
    const header = component.find("h1");
    expect(header.length).toBe(1);
    expect(header.get(0).props.children).toBe("Goals");
  });
});
