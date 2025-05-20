import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Header.css';

const Header = () => {
    const { t, i18n } = useTranslation();
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [showAboutDropdown, setShowAboutDropdown] = useState(false);

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setShowLanguageDropdown(false);
    };

    const toggleDropdown = (e, dropdownType) => {
        e.preventDefault();
        if (dropdownType === 'language') {
            setShowLanguageDropdown(!showLanguageDropdown);
            setShowAboutDropdown(false);
        } else {
            setShowAboutDropdown(!showAboutDropdown);
            setShowLanguageDropdown(false);
        }
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src="/images/cflogobordas.png" alt={t('logoAlt')} className="logo-image" />
                </Link>
            </div>
            <nav className="nav-menu">
                <ul>
                    <li className="nav-item"><Link to="/dono-da-carga">{t('donoDaCarga')}</Link></li>
                    <li className="nav-item"><Link to="/motorista">{t('motorista')}</Link></li>
                    <li className="nav-item"><Link to="/cidades">{t('cidades')}</Link></li>
                    
                    {/* Dropdown Sobre - Posição Corrigida */}
                    <li 
                        className="dropdown nav-item"
                        onMouseEnter={() => setShowAboutDropdown(true)}
                        onMouseLeave={() => setShowAboutDropdown(false)}
                    >
                        <span 
                            onClick={(e) => toggleDropdown(e, 'about')}
                            className="dropdown-trigger"
                        >
                            Sobre CF
                        </span>
                        <div className={`dropdown-container about-dropdown ${showAboutDropdown ? 'visible' : ''}`}>
                            <ul className="dropdown-menu">
                                <li className="dropdown-item">
                                    <Link to="/sobre" onClick={() => setShowAboutDropdown(false)}>
                                        {t('sobreCargaFacil')}
                                    </Link>
                                </li>
                                <li className="dropdown-item">
                                    <Link to="/carreiras" onClick={() => setShowAboutDropdown(false)}>
                                        {t('carreiras')}
                                    </Link>
                                </li>
                                <li className="dropdown-item">
                                    <Link to="/parceiros" onClick={() => setShowAboutDropdown(false)}>
                                        {t('parceiros')}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>

                    {/* Dropdown Idiomas - Posição Corrigida */}
                    <li 
                        className="language-selector nav-item"
                        onMouseEnter={() => setShowLanguageDropdown(true)}
                        onMouseLeave={() => setShowLanguageDropdown(false)}
                    >
                        <div
                            className="language-current"
                            onClick={(e) => toggleDropdown(e, 'language')}
                        >
                            <span role="img" aria-label="Globo">🌐</span> {i18n.language.toUpperCase()}
                        </div>
                        <div className={`dropdown-container language-dropdown-container ${showLanguageDropdown ? 'visible' : ''}`}>
                            <ul className="language-dropdown">
                                <li className="dropdown-item" onClick={() => changeLanguage('pt')}>Português</li>
                                <li className="dropdown-item" onClick={() => changeLanguage('en')}>English</li>
                                <li className="dropdown-item" onClick={() => changeLanguage('it')}>Italiano</li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;