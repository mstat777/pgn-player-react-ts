import './Notation.scss';
import { useState, Dispatch, SetStateAction, forwardRef, MutableRefObject, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardFast, faCaretLeft, faCaretRight, faForwardFast } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { formatPgnData, validatePgnData } from '../../utils/pgnDataFunctions';
import { setPieceData } from '../../store/slices/chessSet';
import { Color } from '../../configs/types';
import { Game, IChessPiece } from '../../configs/interfaces';
import { changePlayer } from '../../utils/gameFunctions';
import { movePiece } from '../../utils/movePiece';
import { getX, getY } from '../../utils/gameFunctions';
import { removeCapturedPiece } from '../../utils/removeCapturedPiece';
import { castling } from '../../utils/castling';

type Props = {
    setStatusTxt: Dispatch<SetStateAction<string>>;
}

const Notation = forwardRef(({setStatusTxt}: Props, ref) => {
    const dispatch = useAppDispatch();
    const pieces = useAppSelector((state) => state.chessSet.pieces);
    const pieceRef = ref as MutableRefObject<(HTMLDivElement | null)[]>;

    const pgnErrors = useAppSelector((state) => state.pgnData.errors);

    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [piecesLeft, setPiecesLeft] = useState<number>(32); // pieces left of both players
    const [currentMove, setCurrentMove] = useState<number>(0);
    let currentRound = 0;
    const [playerTurn, setPlayerTurn] = useState<Color>("white");
    const [playerToWait, setPlayerToWait] = useState<Color>("black");
    const [isValidMove, setIsValidMove] = useState<boolean>(true);
    const [errors, setErrors] = useState<string[]>([]);

    const [pgnText, setPgnText] = useState<string>('');
    const pgnTextMaxLength = 2500;

    const { whiteMoves, blackMoves } = useAppSelector((state) => state.pgnData);

    const handleClear = () => {
        if (pgnText) {
            // reset Redux pgnData slice:
            dispatch({type: 'RESET_PGN'});
            //dispatch({type: 'RESET_GAME'});
            setPgnText('');
            // reset to initial pieces positions
            Object.keys(pieces).map((side, indexSide) => 
                pieces[side as keyof typeof pieces].map((piece, i) => {
                    let ref = pieceRef.current[i + (indexSide*16)];
                    if (ref && piece.location) {
                        //console.log(ref);
                        ref.style.left = `${getX(piece.location)}%`;
                        ref.style.bottom = `${getY(piece.location)}%`;
                    }
                })
            )
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

    const handleNextMove = () => {
        console.clear();
        console.log(pieces);
        currentRound = Math.floor(currentMove/2);
        console.log("round = " + (currentRound+1) + " move = " + (currentMove+1));

        // get the piece and the new location to be moved to:
        let { idPiece, newLocation, capture, castlingLong, castlingShort } = playerTurn === "white" ?
            movePiece(whiteMoves[currentRound], playerTurn) :
            movePiece(blackMoves[currentRound], playerTurn);

        if (idPiece) {
            console.log("idPiece = ", idPiece);
            // if CAPTURE, find & desactivate the captured piece in redux store:
            if (capture) {
                for (let i = 0; i < 16; i++) {
                    // captured piece is found on the newLocation
                    if (pieces[playerToWait][i].location === newLocation) {
                        //console.log("pieces[playerToWait][i].location = ", pieces[playerToWait][i].location);
                        //console.log("newLocation = ", newLocation);
                        dispatch(setPieceData({
                            side: playerToWait, 
                            id: i, 
                            active: false
                        }));
                        break;
                    } 
                }

                // REMOVE captured piece's image 
                let idImage = idPiece;
                if (playerToWait === "black") {
                    idImage += 16;
                }
                const removeFromArray = [...pieces[`${playerToWait}`]];
                const removedIndex: number = removeCapturedPiece(newLocation, removeFromArray);
                pieceRef.current[removedIndex]?.remove();
            }

            // if CASTLING
            if (castlingLong || castlingShort) {
                const { kingLocation, rookLocation } = castling(castlingShort, castlingLong, playerTurn);

                console.log({ kingLocation, rookLocation });
                // change king's location
                dispatch(setPieceData({
                    side: playerTurn, 
                    id: 4, 
                    location: kingLocation
                }));
                // change rook's location
                dispatch(setPieceData({
                    side: playerTurn, 
                    id: castlingLong ? 0 : 7, 
                    location: rookLocation
                }));
                
                // move the king's & rook's images
                let idKingImage = 4;
                let idRookImage = castlingLong ? 0 : 7;
                if (playerTurn === "black") {
                    idKingImage += 16;
                    idRookImage += 16;
                }
                const kingImageRef = pieceRef.current[idKingImage];
                const rookImageRef = pieceRef.current[idRookImage];
                if (kingImageRef && rookImageRef) {
                    kingImageRef.style.left = `${getX(kingLocation)}%`;
                    kingImageRef.style.bottom = `${getY(kingLocation)}%`;
                    rookImageRef.style.left = `${getX(rookLocation)}%`;
                    rookImageRef.style.bottom = `${getY(rookLocation)}%`;
                } 
                else {
                    console.log("Error with king's & rook's images!");
                }
            }

            
            console.log("side = ", playerTurn);
            // update Redux Store data (location, active, etc.) & move piece's image, only if NOT CASTLING
            if (!castlingLong && !castlingShort) {
                dispatch(setPieceData({
                    side: playerTurn, 
                    id: idPiece, 
                    location: newLocation
                }));
                // move the piece's image
                let idImage = idPiece;
                if (playerTurn === "black") {
                    idImage += 16;
                }
                const pieceImageRef = pieceRef.current[idImage];
                if (pieceImageRef) {
                    pieceImageRef.style.left = `${getX(newLocation)}%`;
                    pieceImageRef.style.bottom = `${getY(newLocation)}%`;
                }
            }

        } else { // idPiece is 'undefined'
            setStatusTxt("Error: idPiece is 'undefined'!");
        }

        setPlayerTurn(changePlayer(playerTurn));
        //console.log("playerTurn = ", playerTurn);
        setPlayerToWait(changePlayer(playerToWait));
        //console.log("playerToWait = ", playerToWait);
        setCurrentMove(currentMove +1);
        
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
                        onClick={() => {
                            !pgnErrors.length &&
                            handleNextMove();
                        }}
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