import './Header.scss';
import logo from '../../assets/img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

// memo is in order to avoid rerendering
export default function Header() {

    return (
        <header className="header">
            <nav className="nav">
                <div className="logo_ctn">
                    <img src={logo} alt="Dimitar Statev" />
                </div>

                <h1 className="title">PGN Player</h1>

                <div className="links_ctn">
                    <button>
                        <FontAwesomeIcon icon={faInfo}/>
                    </button>
                </div>
            </nav>
        </header>
    );
}