import React from "react";
import {BurgerBuilder} from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// configure enzyme
configure({ adapter: new Adapter() });
 
describe("<BurgerBuilder> Tests", ()=>{
    let wrapper;
    beforeEach(() => {
        // shallowly render burgerbuilder
        wrapper = shallow(<BurgerBuilder onInitIngredients = { () => {} } />);
    });
    it("should have <BuildControls /> if ingredients are passed to it", () => {
        wrapper.setProps({ings: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);


    });
});