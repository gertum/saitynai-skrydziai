import { useState, createContext, useContext, Fragment } from 'react';
import { Link } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

const HamburgerMenuContext = createContext();

const HamburgerMenu = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <HamburgerMenuContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className="relative">{children}</div>
        </HamburgerMenuContext.Provider>
    );
};

const HamburgerIcon = ({ children }) => {
    const { open, setOpen, toggleOpen } = useContext(HamburgerMenuContext);

    return (
        <>
            <div onClick={toggleOpen}>{children}</div>

            {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>}
        </>
    );
};

const MenuContent = ({ children }) => {
    const { open, setOpen } = useContext(HamburgerMenuContext);

    return (
        <>
            <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div
                    className="fixed inset-0 z-50 bg-white p-4"
                    onClick={() => setOpen(false)}
                >
                    {children}
                </div>
            </Transition>
        </>
    );
};

const HamburgerMenuItem = ({ children, ...props }) => {
    return (
        <Link
            {...props}
            className="block py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
        >
            {children}
        </Link>
    );
};

HamburgerMenu.Icon = HamburgerIcon;
HamburgerMenu.Content = MenuContent;
HamburgerMenu.Item = HamburgerMenuItem;

export default HamburgerMenu;
