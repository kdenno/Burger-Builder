import React from "react";

import { configure, shallow } from "enzyme"; // import enzymes to support isolated/unit tests
import Adapter from "enzyme-adapter-react-16";

// configure enzyme
configure({ adapter: new Adapter() });

import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

describe("<NavigationItems />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });
  it("should render two <NavigationItem /> if not authenticated", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should render three <NavigationItem /> if authenticated", () => {
    // wrapper = shallow(<NavigationItems isAuth />);
    wrapper.setProps({ isAuth: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });


  it("should have a navigation item with logout if authenticated", () => {
    // wrapper = shallow(<NavigationItems isAuth />);
    wrapper.setProps({ isAuth: true });
    expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
  });
});
