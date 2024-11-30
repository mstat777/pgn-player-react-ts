import { useAppSelector, useAppDispatch } from "../../store/hooks";
import SwitchBtn from "../buttons/SwitchBtn/Index";
import { setShowBoardNotation,
        setShowInfoBar,
        setShowStatusPanel,
        } from '../../store/slices/settings';

export default function SettingsList() {
    const { 
        showBoardNotation,
        showInfoBar,
        showStatusPanel
    } = useAppSelector((state) => state.settings);

    const dispatch = useAppDispatch();

    return (
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
    )
}