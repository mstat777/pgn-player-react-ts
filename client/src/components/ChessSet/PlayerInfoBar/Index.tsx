import './PlayerInfoBar.scss';
import { Color } from "../../../configs/types";
import { useAppSelector } from "../../../store/hooks";
import { capitalize, formatPlayerName } from '../../../utils/commonFunctions';

type Props = {
   position: string;
}

export default function PlayerInfoBar({position}: Props){
   const tags = useAppSelector((state) => state.pgnData.tags);
   const flipBoard = useAppSelector((state) => state.settings.flipBoard);

   console.log(tags);

   let color: Color = 'white';

   if (position === 'top'){
      color = !flipBoard ? 'black' : 'white';
   } else if (position === 'bottom'){
      color = !flipBoard ? 'white' : 'black';
   }

   return (
      (tags?.white && tags?.black) &&
         <div className={`player_info ${color}`}>
            <div>
               <span>{capitalize(color)}:&nbsp;</span>
               <span className="value">{formatPlayerName(tags[color])}</span>
            </div>

            { tags[`${color}elo`].length >= 3 && tags[`${color}elo`].length <= 4 &&
            <div>
               <span>ELO:&nbsp;</span>
               <span className="value">{tags[`${color}elo`]}</span>
            </div> }
         </div>
   )
}