import { Square } from "../configs/interfaces";
import { SquareType } from "../configs/types";

export function initializeSquares(): Square[] {
    const squares: Square[] = [];

    for (let i = 0; i < 64; i++) {
        const location: string = (Math.floor((63 - i) / 8) + 1)*10 + i % 8 + 1;
        let color: SquareType;

        if (Math.floor(i / 8) % 2 === 0) { 
            // even row
            color = i % 2 === 0 ? 'light' : 'dark';
        } else {
            // odd row
            color = i % 2 === 0 ? 'dark' : 'light';
        }

        squares.push({
            color: color, 
            location: location
        });
    }

    return squares;
}