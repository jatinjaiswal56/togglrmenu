import React from 'react';
import Dropdown from './Dropdown';
function Parent(props) {
    const dropdownItems = ["HTML", "CSS", "JS"];
    return (
        <div>
            <h1>Simple Dropdown Component</h1>
            <Dropdown items={dropdownItems} />
        </div>
    );
}

export default Parent;