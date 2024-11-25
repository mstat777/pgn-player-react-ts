import './Modal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setShowBoardNotation,
        setShowModal,
        setShowInfoBar,
        setShowStatusPanel,
} from '../../store/slices/settings';
import SwitchBtn from '../buttons/SwitchBtn/Index';

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
                        <h2>Settings</h2>
                        <div className="settings_ctn">
                            <label>Show Info Bar</label>
                            <SwitchBtn
                                state={showInfoBar}
                                onClick={() => dispatch(setShowInfoBar(!showInfoBar))}
                            />
                        </div>

                        <div className="settings_ctn">
                            <label>Show Status Panel</label>
                            <SwitchBtn
                                state={showStatusPanel}
                                onClick={() => dispatch(setShowStatusPanel(!showStatusPanel))}
                            />
                        </div>

                        <div className="settings_ctn">
                            <label>Show Board Notation</label>
                            <SwitchBtn
                                state={showBoardNotation}
                                onClick={() => dispatch(setShowBoardNotation(!showBoardNotation))}
                            />
                        </div>

                    </section>
                }
            </section>
        </div>
    );
}