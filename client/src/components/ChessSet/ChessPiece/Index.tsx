import { Color, PieceType } from "../../../configs/types";
import './ChessPiece.scss';
import PieceImage from "../../../configs/piecesImages";
import { capitalize } from "../../../utils/generalFunctions";

type Props = {
    color: Color;
    type: PieceType;
    left: string;
    top: string;
}

export default function ChessPiece(props: Props) {
    const { color, type, left, top } = props;

    const pieceImageName = color + capitalize(type);

    return (
        <div 
            className="piece" 
            id={type}
            style={{
                left: left,
                top: top
            }}
        >
            <img 
                src={PieceImage[pieceImageName as keyof typeof PieceImage]}
                alt={`${type} chess piece`}
            />
        </div>
    );
}