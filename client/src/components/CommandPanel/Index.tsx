import './CommandPanel.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardFast, faCaretLeft, faCaretRight, faForwardFast } from '@fortawesome/free-solid-svg-icons';


export default function CommandPanel(){

    return ( 
        <div className="command_panel">
            <div className="functions_btn">
                <button type="button" id="loadBtn">load</button>
                <button type="button" id="clearBtn">clear</button>
            </div>

            <div className="nav_btn">
                <button type="button" id="toStartBtn">
                    <FontAwesomeIcon icon={faBackwardFast}/>
                </button>

                <button type="button" id="previousMoveBtn">
                    <FontAwesomeIcon icon={faCaretLeft}/>
                </button>

                <button type="button" id="nextMoveBtn">
                    <FontAwesomeIcon icon={faCaretRight}/>
                </button>

                <button type="button" id="toEndBtn">
                    <FontAwesomeIcon icon={faForwardFast}/>
                </button>
            </div>
        </div>
    );
}