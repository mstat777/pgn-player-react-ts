import './Notation.scss';
import { useState, Dispatch, SetStateAction, forwardRef, MutableRefObject, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardFast, faCaretLeft, faCaretRight, faForwardFast } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { formatPgnData, validatePgnData } from '../../utils/pgnDataFunctions';
import { initializePieces, initializeSquares, setPieceData } from '../../store/slices/chessSet';
import { Color } from '../../configs/types';
import { MoveNbWithLocation, Game, IChessPiece } from '../../configs/interfaces';
import { changePlayer } from '../../utils/commonFunctions';
import { movePiece } from '../../utils/movePiece';
import { getX, getY } from '../../utils/commonFunctions';
import { removeCapturedPiece } from '../../utils/removeCapturedPiece';
import { castling } from '../../utils/castling';

type Props = {
    setStatusTxt: Dispatch<SetStateAction<string>>;
}

const Notation = forwardRef(({setStatusTxt}: Props, ref) => {
    const dispatch = useAppDispatch();

    const { whiteMoves, blackMoves } = useAppSelector((state) => state.pgnData);

    const pieces = useAppSelector((state) => state.chessSet.pieces);
    const pieceRef = ref as MutableRefObject<(HTMLDivElement | null)[]>;
    console.log(pieces);
    const pgnErrors = useAppSelector((state) => state.pgnData.errors);

    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [piecesLeft, setPiecesLeft] = useState<number>(32); // pieces left of both players
    const [currentMove, setCurrentMove] = useState<number>(-1);
    //const [currentRound, setCurrentRound] = useState<number>(0);
    const [playerTurn, setPlayerTurn] = useState<Color>("white");
    const [playerToWait, setPlayerToWait] = useState<Color>("black");
    const [isValidMove, setIsValidMove] = useState<boolean>(true);
    const [errors, setErrors] = useState<string[]>([]);

    const [pgnTxt, setPgnTxt] = useState<string>('');
    const pgnTxtMaxLength = 2500;

    // change Round number if Move number is changed
    useEffect(() => {
        if (currentMove >= 0) {
            //setCurrentRound(Math.floor((currentMove+1)/2));
            handleNextMove();
        }
    },[currentMove]);

    const initialize = () => {
        setCurrentMove(-1);
        dispatch({type: 'RESET_GAME'}); // reset Redux pgnData slice
        dispatch(initializeSquares());
        dispatch(initializePieces());
    }

    const handleClear = () => {
        if (pgnTxt) {
            initialize();
            setPgnTxt(''); // clear input data
            // reset to initial piece's IMAGE positions
            Object.keys(pieces).map((side, indexSide) => 
                pieces[side as keyof typeof pieces].map((piece, i) => {
                    let ref = pieceRef.current[i + (indexSide*16)];
                    if (ref && piece.location) {
                        ref.style.left = `${getX(piece.location[0][0])}%`;
                        ref.style.bottom = `${getY(piece.location[0][0])}%`;
                    }
                })
            )
        }
    }

    const handleLoad = () => {
        if (pgnTxt) {
            console.clear();
            initialize();
            validatePgnData(formatPgnData(pgnTxt));
        } else {
            setStatusTxt('Nothing is entered!');
            console.log('Nothing is entered!');
        }
    }

    const handleNextMove = () => {
        console.clear();
        //console.log(pieces);
        //console.log(whiteMoves);
        //console.log("currentRound will be ", Math.floor((currentMove+1)/2)+1);

        //setCurrentMove(currentMove +1);
        //console.log("currentMove will be ", currentMove+2);
        
        if (!whiteMoves.length) {
            setStatusTxt("Please press the 'LOAD' button.");
            return;
        }
        
        console.log("round = " + Math.floor(currentMove/2) + " move = " + currentMove);

        let currentRound = Math.floor(currentMove/2);

        // check for GAME OVER
        if ((playerTurn === "white" && 
            !whiteMoves[currentRound]) || 
            (playerTurn === "black" && 
            !blackMoves[currentRound]))
        {
            setStatusTxt("Game is over.");
            setIsGameOver(true);
            return;
        }

        // get the piece and the new location to be moved to:
        let { idPiece, newLocation, capture, castlingLong, castlingShort } = playerTurn === "white" ?
            movePiece(whiteMoves[currentRound], playerTurn) :
            movePiece(blackMoves[currentRound], playerTurn);
        
        if (idPiece) {
            console.log("idPiece = ", idPiece);
            // if CAPTURE, find & desactivate the captured piece in redux store:
            if (capture) {
                for (let i = 0; i < 16; i++) {
                    // get the last location of the piece
                    const lastLocation: MoveNbWithLocation = Object.values(pieces[playerToWait][i].location.slice(-1)[0])[0];
                    console.log("lastLocation = ",lastLocation);
                    // captured piece is found on the newLocation
                    if (lastLocation === newLocation) {
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
                console.log(castling);
                const { kingLocation, rookLocation } = castling(castlingShort, castlingLong, playerTurn);

                console.log({ kingLocation, rookLocation });
                let kingMoveAndLocation: MoveNbWithLocation = {};
                kingMoveAndLocation[currentRound+1] = kingLocation;
                let rookMoveAndLocation: MoveNbWithLocation = {};
                rookMoveAndLocation[currentRound+1] = rookLocation;
                // change king's location
                dispatch(setPieceData({
                    side: playerTurn, 
                    id: 4, 
                    location: [kingMoveAndLocation]
                }));
                // change rook's location
                dispatch(setPieceData({
                    side: playerTurn, 
                    id: castlingLong ? 0 : 7, 
                    location: [rookMoveAndLocation]
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

            // update Redux Store data (location, active, etc.) & move piece's image, only if NOT CASTLING
            if (!castlingLong && !castlingShort) {
                let pieceMoveAndLocation: MoveNbWithLocation = {};
                pieceMoveAndLocation[currentRound+1] = newLocation;

                dispatch(setPieceData({
                    side: playerTurn, 
                    id: idPiece, 
                    location: [pieceMoveAndLocation]
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
    }

    const handlePreviousMove = () => {
        console.clear();
        //console.log(pieces);
        //console.log(whiteMoves);
        //console.log("currentRound will be ", Math.floor((currentMove-1)/2)+1);
        //setCurrentMove(currentMove -1);

        if (!whiteMoves.length) {
            setStatusTxt("Please press the 'LOAD' button.");
            return;
        }

        console.log("round = " + Math.floor(currentMove/2) + " move = " + currentMove);

        // check if the beggining reached
        if (currentMove < 0) {
            setStatusTxt("The very beginning reached.");
            return;
        }

        let currentRound = Math.floor(currentMove/2);
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
                    let lastLocation = pieces[playerToWait][i].location.slice(-1)[0];
                    console.log(lastLocation);
                    console.log(Object.values(lastLocation));
                    if (lastLocation === newLocation) {
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
                console.log(castling);
                const { kingLocation, rookLocation } = castling(castlingShort, castlingLong, playerTurn);

                console.log({ kingLocation, rookLocation });
                let kingMoveAndLocation: MoveNbWithLocation = {};
                kingMoveAndLocation[currentRound] = kingLocation;
                let rookMoveAndLocation: MoveNbWithLocation = {};
                rookMoveAndLocation[currentRound] = rookLocation;
                // change king's location
                dispatch(setPieceData({
                    side: playerTurn, 
                    id: 4, 
                    location: [kingMoveAndLocation]
                }));
                // change rook's location
                dispatch(setPieceData({
                    side: playerTurn, 
                    id: castlingLong ? 0 : 7, 
                    location: [rookMoveAndLocation]
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

            // update Redux Store data (location, active, etc.) & move piece's image, only if NOT CASTLING
            if (!castlingLong && !castlingShort) {
                let pieceMoveAndLocation: MoveNbWithLocation = {};
                pieceMoveAndLocation[currentRound] = newLocation;

                dispatch(setPieceData({
                    side: playerTurn, 
                    id: idPiece, 
                    location: [pieceMoveAndLocation]
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

                    <button 
                        id="previousMoveBtn"
                        onClick={() => {
                            !pgnErrors.length && currentMove > 0 &&
                            setCurrentMove(currentMove -1);
                        }}
                    >
                        <FontAwesomeIcon icon={faCaretLeft}/>
                    </button>

                    <button 
                        id="nextMoveBtn"
                        onClick={() => {
                            console.log("pgnErrors.length = "+pgnErrors.length);
                            console.log("isGameOver = ",isGameOver);
                            !pgnErrors.length && !isGameOver &&
                            setCurrentMove(currentMove +1);
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
                    value={pgnTxt}
                    onChange={(e) => setPgnTxt(e.target.value)}
                    placeholder="put your PGN data here..."
                    rows={8}
                    maxLength={pgnTxtMaxLength}
                ></textarea>
            </div>
        </section>
    );
});

export default Notation;