import React from 'react';
import logo from '../assets/BilenguaTemporaryLogo.png';
import '../styles/styles.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <img src={logo} alt="Bilengua logo" className="header-logo" />
            <h1>BilenguaAI</h1>
        </header>
    );
};

export default Header;
