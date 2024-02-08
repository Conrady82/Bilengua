import React from 'react';
import logo from '../assets/BilenguaTemporaryLogo.png';
import '../styles/styles.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <img src={logo} alt="Bilengua logo" className="header-logo" />
            <h1>Bilengua</h1>
            <img src={logo} alt="Bilengua logo" className="header-logo" />
        </header>
    );
};

export default Header;
