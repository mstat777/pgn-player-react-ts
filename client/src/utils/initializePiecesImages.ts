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
      const color = i < 16 ? 'white' : 'black';
      const id = color === 'white' ? i : i-16;
      const initLocation = getLocationByRoundNb(pieces[color][id].location, 0);
      //console.log(pieces[color]);
      if (pieceImage) {
         pieceImage.style.left = `${getX(initLocation)}%`;
         pieceImage.style.bottom = `${getY(initLocation)}%`;
         pieceImage.style.opacity = '1';
      }
   });
}