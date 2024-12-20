import './ChessSet.scss';
import { useEffect, useState, forwardRef, MutableRefObject } from 'react';
import { useAppSelector } from '../../store/hooks';
import { Color } from '../../configs/types';
import { getX, getY } from '../../utils/commonFunctions';
import Loading from '../Loading/Index';
import ChessPiece from './ChessPiece/Index';
import BoardNotationCtn from './BoardNotationCtn';
import PlayerInfoBar from './PlayerInfoBar/Index';

const ChessSet = forwardRef((_props, ref) => {
   const { squares, pieces } = useAppSelector((state) => state.chessSet);
   const { flipBoard, showBoardNotation, showPlayerInfoBar } = useAppSelector((state) => state.settings);
   const { tags } = useAppSelector((state) => state.pgnData);
   const { areMovesLoaded } = useAppSelector((state) => state.game);

   const piecesLength = pieces.white.length + pieces.black.length;

   const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

   const pieceRef = ref as MutableRefObject<(HTMLDivElement | null)[]>;

   useEffect(() => {
      if (squares.length && piecesLength ) {
         setIsDataLoaded(true);
      }
   },[squares.length, piecesLength]);

   return ( 
      !isDataLoaded ? 
         <Loading /> :

         <section className={`chess_section ${Object.keys(tags as Object).length && showPlayerInfoBar ? '' : 'no_player_info'}`}>
            
            { Object.keys(tags as Object).length && showPlayerInfoBar ?
               <PlayerInfoBar position="top"/> : null }

            <section className={`chess_set ${flipBoard ? 'flipped' : ''}`}>
               <div className="chessboard">
                  {squares?.map((square, i) => 
                     <div 
                        className={`square ${square.color}`}
                        key={i}
                     >
                     </div>
                  )}
               </div>

               <div className="pieces_ctn">
                  <div className="pieces">
                     {/* create piece images */}
                     { areMovesLoaded && Object.keys(pieces).map((color, indexSide) => 
                        pieces[color as keyof typeof pieces].map((piece, i) => 
                           piece.location &&
                              <ChessPiece 
                                 ref={(el) => //{
                                    pieceRef.current[i + (indexSide*16)] = el
                                    //console.log(el); }
                                 }
                                 color={color as Color}
                                 type={piece.type} 
                                 left={`${getX(piece.location[0][0])}%`}
                                 bottom={`${getY(piece.location[0][0])}%`}
                                 opacity='1'
                                 key={i}
                              />
                           )
                        )
                     }
                  </div>
               </div>
               
               { showBoardNotation &&
                  <div className="board_notation">
                     <BoardNotationCtn type="files" />
                     <BoardNotationCtn type="ranks" />
                     <BoardNotationCtn type="ranks" />
                     <BoardNotationCtn type="files" />
                  </div>
               }
            </section>

            { Object.keys(tags as Object).length && showPlayerInfoBar ?
               <PlayerInfoBar position="bottom"/> : null }
         </section>
   );
});

export default ChessSet;