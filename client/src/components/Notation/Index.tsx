import './Notation.scss';
import { forwardRef, MutableRefObject, useEffect } from 'react';
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { initializePieces, initializeSquares } from '../../store/slices/chessSet';
import { setPgnTxt } from '../../store/slices/pgnData';
import { setStatusTxt } from '../../store/slices/game';
import { formatPgnData, validatePgnData } from '../../utils/pgnDataFunctions';
import { initializeGame } from '../../utils/commonFunctions';
import FileUploader from '../FileUploader/Index';
import { initializePiecesImages } from '../../utils/initializePiecesImages';
import { loadMoves } from '../../utils/loadMoves';

const Notation = forwardRef((_props, ref) => {
   const dispatch = useAppDispatch();

   const pieceRef = ref as MutableRefObject<(HTMLDivElement | null)[]>;

   const { pgnTxt, whiteMoves ,blackMoves } = useAppSelector((state) => state.pgnData);
   const pieces = useAppSelector((state) => state.chessSet.pieces);

   const isMobile = useMediaQuery({query: '(max-width: 767px)'});

   const pgnTxtMaxLength = 2500;

   useEffect(() => {
      if (whiteMoves.length) {
         const movesLength = whiteMoves.length + blackMoves.length;
         console.log(movesLength);
         loadMoves(movesLength);
      }
   },[whiteMoves.length, blackMoves.length]);

   const initializeAll = () => {
      initializeGame();
      dispatch(initializeSquares());
      dispatch(initializePieces());
      initializePiecesImages(pieceRef, pieces); // reset pieces positions
   }

   const handleLoad = () => {
      if (pgnTxt) {
         initializeAll();
         validatePgnData(formatPgnData(pgnTxt));
      } else {
         dispatch(setStatusTxt('No PGN data is entered!'));
      }
   }

   const handleClear = () => {
      if (pgnTxt) {
         initializeAll();
         dispatch(setStatusTxt("PGN data cleared."));
         dispatch(setPgnTxt('')); // clear input data
      }
   }

   return ( 
      (pieces.white.length && pieces.black.length) &&
      <section className="notation_section">
         <div className="control_panel">

            <div className="control_ctn">
               <div className="functions_btn">
                  <FileUploader />

                  <button 
                     className="load_btn"
                     onClick={handleLoad}
                  >
                     {!isMobile ? 
                        'load' :
                        <FontAwesomeIcon icon={faCirclePlay} />}
                  </button>

                  <button 
                     className="clear_btn"
                     onClick={handleClear}
                  >
                     {!isMobile ? 
                        'clear' :
                        <FontAwesomeIcon icon={faTrashCan} />}
                  </button>
               </div>
            </div>
         </div>

         <div className="notation">
            <textarea
               value={pgnTxt}
               onChange={(e) => dispatch(setPgnTxt(e.target.value))}
               placeholder={`put your PGN data here...\n1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 b5 5. Bb3`}
               rows={4}
               maxLength={pgnTxtMaxLength}
            ></textarea>
         </div>
      </section>
   );
});

export default Notation;