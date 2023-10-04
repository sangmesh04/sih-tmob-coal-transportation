import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as CloseMenu } from "../../assets/close.svg";
import { ReactComponent as MenuIcon } from "../../assets/menu.svg";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import "./navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a style={{textAlign: 'center'}} href="/" className="navbar-logo" onClick={closeMobileMenu}>
          <Logo className="logo" />
          <h1 style={{fontSize:'2rem'}}>Coal Bharat</h1>
        </a>
        <div className="menu-icon" onClick={handleClick}>
          {!click ? <MenuIcon className="menu-icon-svg" /> : <CloseMenu className="close-icon-svg" />}
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
  <li className="nav-item" onClick={closeMobileMenu}>
    <Link to="/" className="nav-link">
      MINES
    </Link>
  </li>
  <li className="nav-item" onClick={closeMobileMenu}>
    <Link to="/routes" className="nav-link">
      ROUTES
    </Link>
  </li>
  <li className="nav-item mobile-option" onClick={closeMobileMenu}>
    <Link to="/" className="nav-link sign-up">
      SIGN-UP
    </Link>
  </li>
</ul>
</div>
    </nav>
  );
};

export default Navbar;
