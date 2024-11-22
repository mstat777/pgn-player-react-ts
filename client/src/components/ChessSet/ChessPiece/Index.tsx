import './ChessPiece.scss';
import { Color, PieceType } from "../../../configs/types";
import { LegacyRef, forwardRef } from "react";
import PieceImage from "../../../configs/piecesImages";
import { capitalize } from "../../../utils/commonFunctions";

type Props = {
    color: Color;
    type: PieceType;
    left: string;
    bottom: string;
    opacity: string;
}

const ChessPiece = forwardRef((props: Props, ref: LegacyRef<HTMLDivElement> | undefined) => {
    const { color, type, left, bottom, opacity } = props;

    const pieceImageName = color + capitalize(type);

    return (
        
        <div 
            ref={ref}
            className="piece" 
            style={{
                left: left,
                bottom: bottom,
                opacity: opacity
            }}
        >
            <img 
                src={PieceImage[pieceImageName as keyof typeof PieceImage]}
                alt={`${type} chess piece`}
            />
        </div>
        
    );
});

export default ChessPiece;