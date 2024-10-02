import React, { useState, useEffect } from 'react';
import './NavPlayer.css';
import { useHistory } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import logo from '../LandingPage/drawleague.png';
import howToPlayImage from './howtoplay.png';

function NavPlayer() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showHowToPlay, setShowHowToPlay] = useState(false);
    const history = useHistory();
    const [reload, setReload] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const navigate = (path, state = {}) => {
        if (history.location.pathname === path) {
            setReload(!reload);
        } else {
            history.push(path, state);
        }
        setMenuOpen(false);
    };

    const handleLogoClick = () => {
        history.push('/home');
    };

    const openHowToPlayModal = () => {
        setShowHowToPlay(true);
        setMenuOpen(false);
    };

    const closeHowToPlayModal = () => {
        setShowHowToPlay(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuOpen && !event.target.closest('.hamburger-menu') && !event.target.closest('.hamburger-icon')) {
                setMenuOpen(false);
            }
            if (showHowToPlay && !event.target.closest('.modal-content')) {
                closeHowToPlayModal();
            }
        };

        if (menuOpen || showHowToPlay) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen, showHowToPlay]);

    return (
        <div className="nav-player-container">
            <img src={logo} alt="Draw League Logo" className="nav-player-logo" onClick={handleLogoClick} />
            <FaBars className="hamburger-icon" onClick={toggleMenu} />
            {menuOpen && (
                <div className="hamburger-menu">
                    <button className="menu-button" onClick={openHowToPlayModal}>HOW TO PLAY</button>
                </div>
            )}

            {showHowToPlay && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <img src={howToPlayImage} alt="How to Play" className="how-to-play-image" />
                        <button className="action-button" onClick={closeHowToPlayModal}>CLOSE</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NavPlayer;
