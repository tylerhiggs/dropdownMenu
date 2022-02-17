import React, { useState } from "react";
import { ReactComponent as BellIcon } from "./icons/bell.svg";
import { ReactComponent as MessengerIcon } from "./icons/messenger.svg";
import { ReactComponent as CaretIcon } from "./icons/caret.svg";
import { ReactComponent as PlusIcon } from "./icons/plus.svg";
import { ReactComponent as CogIcon } from "./icons/cog.svg";
import { ReactComponent as ChevronIcon } from "./icons/chevron.svg";
import { ReactComponent as ArrowIcon } from "./icons/arrow.svg";
import { ReactComponent as BoltIcon } from "./icons/bolt.svg";
import { CSSTransition } from "react-transition-group";


function App() {
  return (
    <NavBar>
      <NavItem icon={<PlusIcon />} />
      <NavItem icon={<BellIcon />} />
      <NavItem icon={<MessengerIcon />} />

      <NavItem icon={<CaretIcon />}>
        <Dropdown />
      </NavItem>
    </NavBar>
  );
}

function NavBar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => {setOpen(!open)}}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  )
}

function Dropdown() {

  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);

  
  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a href="#" className="dropdown-item" onClick={() => {props.goToMenu && setActiveMenu(props.goToMenu)}}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{height: menuHeight}}>
      <CSSTransition 
        in={activeMenu === 'main'} 
        unmountOnExit timeout={500} 
        classNames = 'menu-primary'
        onEnter={calcHeight}>
          <div className="menu">
            <DropdownItem>My Profile</DropdownItem>
            <DropdownItem
              leftIcon={<CogIcon />}
              rightIcon={<ChevronIcon />}
              goToMenu="settings">
              Settings
            </DropdownItem>
          </div>
      </CSSTransition> 

      <CSSTransition 
        in={activeMenu === 'settings'} 
        unmountOnExit timeout={500} 
        classNames = 'menu-secondary'
        onEnter={calcHeight}>
          <div className="menu">
            <DropdownItem leftIcon={<ArrowIcon />} goToMenu="main"/>
            <DropdownItem>Item 1</DropdownItem>
            <DropdownItem>Item 2</DropdownItem>
            <DropdownItem>Item 3</DropdownItem>
            <DropdownItem>Item 4</DropdownItem>
            <DropdownItem>Item 5</DropdownItem>
            <DropdownItem>Item 6</DropdownItem>
            <DropdownItem>Item 7</DropdownItem>
            <DropdownItem>Item 8</DropdownItem>
            <DropdownItem>Item 9</DropdownItem>
          </div>
      </CSSTransition>
    </div>
  )
}

export default App;
