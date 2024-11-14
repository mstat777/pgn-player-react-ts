import './Notation.scss';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardFast, faCaretLeft, faCaretRight, faForwardFast } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { formatData, validateData } from '../../store/slices/pgnData';


export default function Notation(){
    const dispatch = useAppDispatch();
    const { moveNb, whiteMoves, blackMoves, errors, status } = useAppSelector((state) => state.pgnData);

    const [pgnText, setPgnText] = useState<string>('');
    const pgnTextMaxLength = 2500;

    const handleLoad = () => {
        if (pgnText) {
            // first reset Redux pgnData slice:
            dispatch({type: 'RESET_PGN'});
            dispatch(formatData(pgnText));
            
        } else {
            console.log('Nothing is entered!');
        }
    }

    useEffect(() => {
        if (moveNb.length) {
            console.log(moveNb);
            dispatch(validateData());
        }
    },[moveNb.length]);

    return ( 
        <section className="notation_section">

            <div className="command_panel">
                <div className="functions_btn">
                    <button 
                        id="loadBtn"
                        onClick={handleLoad}
                    >load</button>

                    <button 
                        id="clearBtn"
                        onClick={() => setPgnText('')}
                    >clear</button>
                </div>

                <div className="nav_btn">
                    <button id="toStartBtn">
                        <FontAwesomeIcon icon={faBackwardFast}/>
                    </button>

                    <button id="previousMoveBtn">
                        <FontAwesomeIcon icon={faCaretLeft}/>
                    </button>

                    <button id="nextMoveBtn">
                        <FontAwesomeIcon icon={faCaretRight}/>
                    </button>

                    <button id="toEndBtn">
                        <FontAwesomeIcon icon={faForwardFast}/>
                    </button>
                </div>
            </div>

            <div className="notation">
                <textarea
                    value={pgnText}
                    onChange={(e) => setPgnText(e.target.value)}
                    placeholder="put your PGN data here..."
                    rows={8}
                    maxLength={pgnTextMaxLength}
                ></textarea>
            </div>
        </section>
    );
}