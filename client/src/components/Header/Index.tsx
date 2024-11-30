import './Header.scss';
import logo from '../../assets/img/logo.png';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../context/ThemeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import BurgerBtn from '../buttons/BurgerBtn/Index';
import { useAppDispatch } from '../../store/hooks';
import { setShowModal, setShowSettings, setShowDB } from '../../store/slices/settings';

// memo is in order to avoid rerendering
export default function Header() {
    const { darkTheme, toggleTheme } = useContext(ThemeContext);
    const dispatch = useAppDispatch();
    const [showMenu, setShowMenu] = useState<boolean>(false);

    return (
        <header className="header">
            <nav className="nav">
                <div className="logo_ctn">
                    <img src={logo} alt="Dimitar Statev" />
                </div>

                <h1 className="title">PGN Player</h1>

                <button 
                    className="toggle_theme_btn"
                    onClick={toggleTheme}
                >
                    { !darkTheme && 
                    <FontAwesomeIcon icon={faMoon} />}
                    { darkTheme && 
                        <FontAwesomeIcon icon={faSun} />}
                </button>

                <BurgerBtn 
                    showMenu={showMenu} 
                    setShowMenu={setShowMenu} 
                />

                { showMenu &&
                    <ul className={`menu ${showMenu ? 'show_menu' : null}`}>
                        <li>
                            <button
                                onClick={() => {
                                    setShowMenu(false);
                                    dispatch(setShowDB(true));
                                    dispatch(setShowSettings(false));
                                    dispatch(setShowModal(true));
                                }}
                            >database</button>
                        </li>
                        
                        <li>
                            <button
                                onClick={() => {
                                    setShowMenu(false);
                                    dispatch(setShowSettings(true));
                                    dispatch(setShowDB(false));
                                    dispatch(setShowModal(true));
                                }}
                            >settings</button>
                        </li>

                        <li>
                            <button>about</button>
                        </li>
                    </ul>
                }
            </nav>
        </header>
    );
}