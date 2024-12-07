import './NavigationPanel.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setFlipBoard } from '../../store/slices/settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessBoard, faBackwardFast, faCaretLeft, faCaretRight, faForwardFast } from '@fortawesome/free-solid-svg-icons';

export default function NavigationPanel() {
   const { moveNb, whiteMoves, blackMoves} = useAppSelector((state) => state.pgnData);
   const { currentRound, playerTurn } = useAppSelector((state) => state.game);
   const { flipBoard } = useAppSelector((state) => state.settings);
   const dispatch = useAppDispatch();

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
               <button>
                  <FontAwesomeIcon icon={faBackwardFast}/>
               </button>

               <button>
                  <FontAwesomeIcon icon={faCaretLeft}/>
               </button>

               <button>
                  <FontAwesomeIcon icon={faCaretRight}/>
               </button>

               <button>
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
}