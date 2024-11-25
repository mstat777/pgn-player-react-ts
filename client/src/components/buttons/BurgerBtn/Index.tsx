import './BurgerBtn.scss';
import { Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

type Props = {
    showMenu: boolean;
    setShowMenu: Dispatch<SetStateAction<boolean>>;
}

export default function BurgerBtn(props: Props) {
    const { showMenu, setShowMenu } = props;

    return (
        <button 
            onClick={() => setShowMenu(!showMenu)}
            className="burger_btn"
            title="Menu"
        >      
            <FontAwesomeIcon icon={faBars} />
        </button>
    )
}