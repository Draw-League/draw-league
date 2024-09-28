import React, { useState, useEffect } from 'react';
import './NavPlayer.css';
import { useHistory } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import logo from '../LandingPage/drawleague.png';

function NavPlayer() {
    const [menuOpen, setMenuOpen] = useState(false);
    const history = useHistory();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const navigate = (path) => {
        history.push(path);
        setMenuOpen(false);
    };

    const handleLogoClick = () => {
        history.push('/home');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuOpen && !event.target.closest('.hamburger-menu') && !event.target.closest('.hamburger-icon')) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <div className="nav-player-container">
            <img src={logo} alt="Draw League Logo" className="nav-logo" onClick={handleLogoClick} />
            <FaBars className="hamburger-icon" onClick={toggleMenu} />
            {menuOpen && (
                <div className="hamburger-menu">
                    <button className="menu-button" onClick={() => navigate('/drawing')}>TAKE PHOTO</button>
                    <button className="menu-button" onClick={() => navigate('/team-gallery')}>TEAM GALLERY</button>
                    <button className="menu-button" onClick={() => navigate('/rules')}>HOW TO PLAY</button>
                </div>
            )}
        </div>
    );
}

export default NavPlayer;
