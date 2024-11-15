import './Notation.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardFast, faCaretLeft, faCaretRight, faForwardFast } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { formatPgnData, validatePgnData } from '../../utils/pgnDataFunctions';
//import { setCurrentRound, setPlayerTurn } from '../../store/slices/game';
import { Game } from '../../configs/interfaces';
import { setPlayerTurn } from '../../utils/gameFunctions';
import { movePiece } from '../../utils/movePiece';

export default function Notation(){
    //const dispatch = useAppDispatch();
    const { white, black } = useAppSelector((state) => state.chessSet.pieces);
    //const { currentMove, currentRound, playerTurn } = useAppSelector((state) => state.game);
    const { whiteMoves, blackMoves } = useAppSelector((state) => state.pgnData);

    const GAME: Game = {
        isGameOver: false,
        piecesLeft: 32, // pieces left of both players
        currentMove: 0,
        currentRound: 0,
        playerTurn: "white",
        isValidMove: true,
        errors: []
    }

    const [pgnText, setPgnText] = useState<string>('');
    const pgnTextMaxLength = 2500;

    const handleLoad = () => {
        if (pgnText) {
            // first reset Redux pgnData slice:
            //dispatch({type: 'RESET_PGN'});
            validatePgnData(formatPgnData(pgnText));
        } else {
            console.log('Nothing is entered!');
        }
    }

    const handleNextMove = () => {
        GAME.currentRound = Math.floor(GAME.currentMove/2);
        console.log("round = " + (GAME.currentRound+1) + " move = " + (GAME.currentMove+1));
        GAME.playerTurn === "white" ?
            movePiece(whiteMoves[GAME.currentRound], GAME.playerTurn) :
            movePiece(blackMoves[GAME.currentRound], GAME.playerTurn);
        GAME.playerTurn = setPlayerTurn(GAME.playerTurn);
        GAME.currentMove++;
    }

    return ( 
        (white.length && black.length) &&
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

                    <button 
                        id="nextMoveBtn"
                        onClick={handleNextMove}
                    >
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