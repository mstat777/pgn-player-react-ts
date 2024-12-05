import { getX, getY, getLocationByRoundNb } from './commonFunctions';
import { IChessPiece } from '../configs/interfaces';

export const initializePiecesImages = (
   pieceRef: React.MutableRefObject<(HTMLDivElement | null)[]>,
   pieces: {
      white: IChessPiece[],
      black: IChessPiece[]
   }
) => {

   pieceRef.current.map((pieceImage, i) => {
      const side = i < 16 ? 'white' : 'black';
      const id = side === 'white' ? i : i-16;
      const initLocation = getLocationByRoundNb(pieces[side][id].location, 0);
      //console.log(pieces[side]);
      if (pieceImage) {
         pieceImage.style.left = `${getX(initLocation)}%`;
         pieceImage.style.bottom = `${getY(initLocation)}%`;
      }
   });
}