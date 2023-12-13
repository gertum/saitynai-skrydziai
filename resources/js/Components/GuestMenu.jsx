// Menu.jsx
import React from 'react';
import Dropdown from './Dropdown.jsx';

const Menu = () => {
    return (
        <ul className="menu">
            {/*<li><a href="/">Home</a></li>*/}
            {/*<li><a href="/about">About</a></li>*/}
            {/*<li><a href="/services">Services</a></li>*/}

            {/* Use Dropdown component */}
            <Dropdown>
                <Dropdown.Trigger>
                    <button>Toggle Dropdown</button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                    <Dropdown.Link href="/">Home | view available flights</Dropdown.Link>
                    <Dropdown.Link href="/airports">Airports</Dropdown.Link>
                    {/*<Dropdown.Link href="/">Tickets</Dropdown.Link>*/}
                    {/* Add more Dropdown.Link components for additional menu items */}
                </Dropdown.Content>
            </Dropdown>
        </ul>
    );
}

export default Menu;
