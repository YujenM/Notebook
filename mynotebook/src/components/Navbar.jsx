import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { navbarinfo } from './Navbarinfo';

import './index.css';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div>
            <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
                <div className='topnav'>
                    <div className='logo'>
                        <h4>NoteBook</h4>
                    </div>
                    <div className={`menu ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className={`pages ${menuOpen ? 'open' : ''}`}>
                        <ul>
                            {navbarinfo.map((item, index) => (
                                <li key={index} className='links'>
                                    <Link to={item.path}>{item.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
