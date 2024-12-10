import './NavigationPanel.scss';
import { forwardRef, MutableRefObject, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessBoard, faBackwardFast, faCaretLeft, faCaretRight, faForwardFast } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setFlipBoard } from '../../store/slices/settings';
import { setStatusTxt, setIsGameOver, setIsPlayingForward, setCurrentMove, setPlayerTurn, setPlayerToWait } from '../../store/slices/game';
import { changePlayer, getX, getY, getLocationByRoundNb } from '../../utils/commonFunctions';
import { initializePiecesImages } from '../../utils/initializePiecesImages';
import { Color } from '../../configs/types';

const NavigationPanel = forwardRef((_props, ref) => {
   const pieceRef = ref as MutableRefObject<(HTMLDivElement | null)[]>;

   const { moveNb, whiteMoves, blackMoves } = useAppSelector((state) => state.pgnData);
   const pgnErrors = useAppSelector((state) => state.pgnData.errors);
   const { areMovesLoaded, isGameOver, isPlayingForward, currentMove, currentRound, playerTurn, playerToWait } = useAppSelector((state) => state.game);
   const { flipBoard } = useAppSelector((state) => state.settings);
   const pieces = useAppSelector((state) => state.chessSet.pieces);

   const dispatch = useAppDispatch();

   const [isArrowLeftDown, setIsArrowLeftDown] = useState<boolean>(false);
   const [isArrowRightDown, setIsArrowRightDown] = useState<boolean>(false);

   // play the move if Move number changed
   useEffect(() => {
      console.log("currentMove = ", currentMove);
      console.log("playerTurn = ",playerTurn);
      if (currentMove >= 0 && isPlayingForward) {
         for (let i = 0; i < pieceRef.current.length; i++){
            let img = pieceRef.current[i];
            let id = i > 15 ? i-16 : i;
            let side: Color = i > 15 ? 'black' : 'white';
            let correctRound = (playerTurn === "white" && i > 15 ) ? 1 : 0;
            let correctOpacity = (playerTurn === "white" && i <= 16 ) ? 1 : 0;
            //console.log(pieces[side][id].location);
            //console.log("currentMove = ", currentMove);
            if (img) {
               let location = getLocationByRoundNb(pieces[side][id].location, currentRound + 1 - correctRound);
               //console.log("location = ", location);
               img.style.left = `${getX(location)}%`;
               img.style.bottom = `${getY(location)}%`;
               //console.log("y = ",`${getY(location)}%`);
               img.style.opacity = pieces[side][id].deactivated > currentRound + 1 - correctOpacity ? '1' : '0';

               /*if (pieces[side][id].deactivated !== 1000){
                  console.log("side = ",side);
                  console.log("id = ",id);
                  console.log("pieces[side][id].deactivated = ",
                  pieces[side][id].deactivated);
                  console.log("currentRound+1-correctOpacity = ",currentRound+1-correctOpacity);
                  console.log(pieces[side][id].deactivated > currentRound+1-correctOpacity);
                  console.log("opacity = ",img.style.opacity);
               }*/
            }
         }
      // playing backwards
      } else if (!isGameOver && !isPlayingForward) {
         for (let i = 0; i < pieceRef.current.length; i++){
            let img = pieceRef.current[i];
            let id = i > 15 ? i-16 : i;
            let side: Color = i > 15 ? 'black' : 'white';
            let correctRound = (playerTurn === "white" && i > 15 ) ? 1 : 0;
            let correctOpacity = (playerTurn === "white" && i <= 16 ) ? 1 : 0;
            //console.log(pieces[side][id].location);
            //console.log("currentMove = ", currentMove);
            if (img) {
               let location = getLocationByRoundNb(pieces[side][id].location, currentRound + 1 - correctRound);
               //console.log("location = ", location);
               img.style.left = `${getX(location)}%`;
               img.style.bottom = `${getY(location)}%`;
               //console.log("y = ",`${getY(location)}%`);
               img.style.opacity = pieces[side][id].deactivated > currentRound + 1 - correctOpacity ? '1' : '0';
            }
         }
      }
   },[currentMove, isPlayingForward]);

   addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && !isArrowLeftDown) {
         e.stopPropagation();
         handlePreviousMove();
         setIsArrowLeftDown(true);
      }
      if (e.key === "ArrowRight" && !isArrowRightDown) {
         e.stopPropagation();
         handleNextMove();
         setIsArrowRightDown(true);
      }
   });
   addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
         setIsArrowLeftDown(false);
      }
      if (e.key === "ArrowRight") {
         setIsArrowRightDown(false);
      }
   });

   const handleToBeginning = () => {
      dispatch(setIsGameOver(false));
      dispatch(setCurrentMove(-1));
      dispatch(setIsPlayingForward(true));
      dispatch(setPlayerTurn("white"));
      dispatch(setPlayerToWait("black"));
      // reset pieces positions
      initializePiecesImages(pieceRef, pieces);
   }

   const handlePreviousMove = () => {
      if (!whiteMoves.length) {
         dispatch(setStatusTxt("Please press the 'LOAD' button."));
         return;
      } else if (!areMovesLoaded) {
         dispatch(setStatusTxt("Please wait while moves are loading."));
      } else if (!pgnErrors.length && currentMove >= 0) {
         //console.log("isPlayingForward = ", isPlayingForward);
         console.log("currentMove = ",currentMove);
         if (!isPlayingForward) {
            if (currentMove > 0) {
               dispatch(setPlayerTurn(changePlayer(playerTurn)));
               console.log("playerTurn = ", playerTurn);
               dispatch(setPlayerToWait(changePlayer(playerToWait)));
               //console.log("playerToWait = ", playerToWait);
               dispatch(setCurrentMove(currentMove -1)); 
            }
         } else {
            dispatch(setIsPlayingForward(false));
            if (isGameOver){
               dispatch(setIsGameOver(false));
               dispatch(setCurrentMove(currentMove -1)); 
            }
         }
      }
   }

   const handleNextMove = () => {
      //console.log(pgnErrors);
      //console.log("isGameOver = ",isGameOver);
      //console.log("isPlayingForward = ", isPlayingForward);
      //console.log("currentMove = ", currentMove);
      if (!whiteMoves.length) {
         dispatch(setStatusTxt("Please press the 'LOAD' button."));
         return;
      } else if (!areMovesLoaded) {
         dispatch(setStatusTxt("Please wait while moves are loading."));
      } else if (!pgnErrors.length && !isGameOver) {
         if (currentMove >= 0) {
            dispatch(setPlayerTurn(changePlayer(playerTurn)));
            console.log("playerTurn = ", playerTurn);
            dispatch(setPlayerToWait(changePlayer(playerToWait)));
            //console.log("playerToWait = ", playerToWait);
         }
         dispatch(setCurrentMove(currentMove +1)); 
      }
   }

   const handleToEnd = () => {
      if (!whiteMoves.length) {
         dispatch(setStatusTxt("Please press the 'LOAD' button."));
         return;
      } else if (!areMovesLoaded) {
         dispatch(setStatusTxt("Please wait while moves are loading."));
      } else if (!pgnErrors.length) {
         //console.log("isPlayingForward = ", isPlayingForward);
         //console.log("currentMove = ", currentMove);
         //console.log("whiteMoves.length = ", whiteMoves.length);
         //console.log("blackMoves.length = ", blackMoves.length);
         console.log(whiteMoves.length + blackMoves.length - 1);
         dispatch(setCurrentMove(whiteMoves.length + blackMoves.length - 1)); 
      }
   }

   return (
      <section className="navigation">

         <section className="control_panel">
            <div className="functions_btn">
               <button 
                  className="flip_board_btn"
                  onClick={() => dispatch(setFlipBoard(!flipBoard))}
               >
                  <FontAwesomeIcon icon={faChessBoard} />
               </button>
            </div>

            <div className="nav_btn">
               <button onClick={handleToBeginning}>
                  <FontAwesomeIcon icon={faBackwardFast}/>
               </button>

               <button onClick={handlePreviousMove}>
                  <FontAwesomeIcon icon={faCaretLeft}/>
               </button>

               <button onClick={handleNextMove}>
                  <FontAwesomeIcon icon={faCaretRight}/>
               </button>

               <button onClick={handleToEnd}>
                  <FontAwesomeIcon icon={faForwardFast}/>
               </button>
            </div>
         </section>

         <section className="moves_section">
            <div className="move_number">
               {moveNb.map((nb, i) => 
                  <span key={i}>{nb}</span>
               )}
            </div>

            <div className="white_move">
               {whiteMoves.map((move, i) => 
                  <span 
                     key={i}
                     className={`${(playerTurn === 'white' && currentRound === i) ? 'active' : null}`}
                  >
                     {move}
                  </span>
               )}
            </div>

            <div className="black_move">
               {blackMoves.map((move, i) => 
                  <span 
                     key={i}
                     className={`${(playerTurn === 'black' && currentRound === i) ? 'active' : null}`}
                  >
                     {move}
                  </span>
               )}
            </div>
         </section>

      </section>
   )
});

export default NavigationPanel;