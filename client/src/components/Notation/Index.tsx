import './Notation.scss';
import { useState, forwardRef, MutableRefObject } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardFast, faCaretLeft, faCaretRight, faForwardFast } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { formatPgnData, validatePgnData } from '../../utils/pgnDataFunctions';
//import { setCurrentRound, changePlayer } from '../../store/slices/game';
import { Game } from '../../configs/interfaces';
import { changePlayer } from '../../utils/gameFunctions';
import { movePiece } from '../../utils/movePiece';
import { getX, getY } from '../../utils/gameFunctions';
import { removeCapturedPiece } from '../../utils/removeCapturedPiece';

const Notation = forwardRef((props, ref) => {
    const dispatch = useAppDispatch();
    const pieceRef = ref as MutableRefObject<(HTMLDivElement | null)[]>;

    const { pieces } = useAppSelector((state) => state.chessSet);
    //const { currentMove, currentRound, playerTurn } = useAppSelector((state) => state.game);
    const { whiteMoves, blackMoves } = useAppSelector((state) => state.pgnData);

    const GAME: Game = {
        isGameOver: false,
        piecesLeft: 32, // pieces left of both players
        currentMove: 0,
        currentRound: 0,
        playerTurn: "white",
        playerToWait: "black",
        isValidMove: true,
        errors: []
    }

    const [pgnText, setPgnText] = useState<string>('');
    const pgnTextMaxLength = 2500;

    const handleClear = () => {
        if (pgnText) {
            // first reset Redux pgnData slice:
            dispatch({type: 'RESET_PGN'});
            setPgnText('');
        }
    }

    const handleLoad = () => {
        if (pgnText) {
            // first reset Redux pgnData slice:
            dispatch({type: 'RESET_PGN'});
            validatePgnData(formatPgnData(pgnText));
        } else {
            console.log('Nothing is entered!');
        }
    }

    //console.log("GAME.playerTurn = ",GAME.playerTurn);

    const handleNextMove = () => {
        console.log("GAME.playerTurn = ",GAME.playerTurn);

        GAME.currentRound = Math.floor(GAME.currentMove/2);
        console.log("round = " + (GAME.currentRound+1) + " move = " + (GAME.currentMove+1));

        // get the piece and the new location to be moved to:
        const { pieceId, newLocation, capture } = GAME.playerTurn === "white" ?
            movePiece(whiteMoves[GAME.currentRound], GAME.playerTurn) :
            movePiece(blackMoves[GAME.currentRound], GAME.playerTurn);
        // check if there's a piece to be removed in case of 'capture':
        console.log("capture = ",capture);
        if (capture) {
            const removeFromArray = pieces[`${GAME.playerToWait}`];
            console.log(removeFromArray);
            const removedIndex: number = removeCapturedPiece(newLocation, removeFromArray);
            console.log("removedIndex = ",removedIndex);
            pieceRef.current[removedIndex]?.remove();
        }
        // move the piece's image
        const movingPiece = pieceRef.current[pieceId];
        if (movingPiece) {
            movingPiece.style.left = `${getX(newLocation)}%`;
            movingPiece.style.bottom = `${getY(newLocation)}%`;
        }
        // 
        GAME.playerTurn = changePlayer(GAME.playerTurn);
        GAME.playerToWait = changePlayer(GAME.playerToWait);
        GAME.currentMove++;
    }

    return ( 
        (pieces.white.length && pieces.black.length) &&
        <section className="notation_section">

            <div className="command_panel">
                <div className="functions_btn">
                    <button 
                        id="loadBtn"
                        onClick={handleLoad}
                    >load</button>

                    <button 
                        id="clearBtn"
                        onClick={handleClear}
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
});

export default Notation;