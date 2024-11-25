import './Modal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setShowBoardNotation,
        setShowModal,
        setShowInfoBar,
        setShowStatusPanel,
} from '../../store/slices/settings';

export default function Modal() {
    const { 
        showBoardNotation,
        showInfoBar,
        showSettings,
        showStatusPanel
    } = useAppSelector((state) => state.settings);

    const dispatch = useAppDispatch();

    return (
        <div className="modal_ctn">
            <section className="modal">
                <button 
                    className="close_btn"
                    onClick={() => dispatch(setShowModal(false
                    ))}
                >
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>

                { showSettings &&
                    <section className="settings">
                        <div className="settings_ctn">
                            <label>Show Info Bar</label>
                            <button
                                onClick={() => dispatch(setShowInfoBar(!showInfoBar))}
                            >
                                {showInfoBar ? "ON" : "OFF"}
                            </button>
                        </div>

                        <div className="settings_ctn">
                            <label>Show Status Panel</label>
                            <button
                                onClick={() => dispatch(setShowStatusPanel(!showStatusPanel))}
                            >
                                {showStatusPanel ? "ON" : "OFF"}
                            </button>
                        </div>

                        <div className="settings_ctn">
                            <label>Show Board Notation</label>
                            <button
                                onClick={() => dispatch(setShowBoardNotation(!showBoardNotation))}
                            >
                                {showBoardNotation ? "ON" : "OFF"}
                            </button>
                        </div>

                    </section>
                }
            </section>
        </div>
    );
}