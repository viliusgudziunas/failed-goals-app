import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import Index from "../Index";

describe("Index component", () => {
  it("should match the snapshot", () => {
    const tree = renderer.create(<Index />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  const component = shallow(<Index />);
  it("should have a header", () => {
    const header = component.find("h1");
    expect(header.length).toBe(1);
    expect(header.get(0).props.children).toBe("Goals");
  });
});
