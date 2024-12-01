import { useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { setShowModal } from '../../../store/slices/settings';
import { setPgnTxt } from '../../../store/slices/pgnData';

type Props = {
   name: string;
   itemsArr: any[];
}

export default function DBListItem({name, itemsArr}: Props) {
   const [showItems, setShowItems] = useState<boolean>(false);
   const [showSubItems, setShowSubItems] = useState<boolean>(false);

   const dispatch = useAppDispatch();

   /*const initialize = () => {
      setShowGames(false);
      setShowPlayers(false);
      setShowPlayerGames(false);
   }*/

   const getPgnFileData = async (fileName: string, name: string, subcategory?: string) => {
      console.log("getPNGFileData called");
      let URL = '';
      switch(name){
         case "Famous Games": URL = `db/famous-games`; break;
         case "Famous Players": URL = `db/famous-players/${subcategory}`; break;
         case "openings-white": URL = `db/${name}/${subcategory}`; break;
         case "famous-games": URL = `db/${name}/${subcategory}`; break;
         default: throw Error("DBList: Error with the type of getPgnFileData");
      }

      console.log("URL = ", `${URL}/${fileName}.pgn`);
      const data = await (await fetch(`${URL}/${fileName}.pgn`)).text();
      dispatch(setPgnTxt(data));
   }

   const getNestedItems = (item: string[] | string) => {
      if (typeof(item) !== 'string') {
         console.log(item[1]);
         console.log(item[0]);
         return (
            <ul className="subsublist">
               {Object.values(item[1]).map((el, i) => 
                  <li key={i}>
                     <button
                        onClick={() => {
                           //initialize();
                           dispatch(setShowModal(false));
                           getPgnFileData(el, name, item[0]);
                        }}
                     >
                        {el}
                     </button>
                  </li>
               )}
            </ul>
         )
      }
      return null;
   }

   const handleClick = (item: string[] | string) => {
      if (typeof(item) === 'string') {
         //initialize();
         dispatch(setShowModal(false));
         getPgnFileData(item, name);
      } else {
         setShowSubItems(!showSubItems)
      }
   }

   return (
      <>
         <button
            onClick={() => setShowItems(!showItems)}
         >
            {name}
         </button>

         { showItems && 
            <ul className="sublist">
               {itemsArr.map((item, i) => 
                  <li key={i}>
                     <button
                        onClick={() => handleClick(item)}
                     >
                        { typeof(item) === 'string' &&
                           item }
                        { typeof(item) !== 'string' &&
                           item[0] } 
                     </button>
                     
                     {showSubItems &&
                           getNestedItems(item)}
                  </li>
               )}
            </ul>
         }
      </>
   )
}