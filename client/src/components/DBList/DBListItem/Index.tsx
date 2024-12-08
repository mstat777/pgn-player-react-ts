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

   const subItemsState: boolean[] = [];
   itemsArr.forEach(() => subItemsState.push(false));

   const [showSubItems, setShowSubItems] = useState<boolean[]>(subItemsState);

   const dispatch = useAppDispatch();

   const getPgnFileData = async (fileName: string, name: string, subcategory?: string) => {
      //console.log("getPNGFileData called");
      let URL = '';
      switch(name){
         case "Famous Games": URL = `db/famous-games`; break;
         case "Famous Players": URL = `db/famous-players/${subcategory}`; break;
         case "Openings White": URL = `db/openings-white/${subcategory}`; break;
         case "Openings Black": URL = `db/openings-black/${subcategory}`; break;
         default: throw Error("DBList: Error with the type of getPgnFileData");
      }

      //console.log("URL = ", `${URL}/${fileName}.pgn`);
      const data = await (await fetch(`${URL}/${fileName}.pgn`)).text();
      dispatch(setPgnTxt(data));
   }

   const getNestedItems = (item: string[] | string) => {
      if (typeof(item) !== 'string') {
         //console.log(item[1]);
         //console.log(item[0]);
         return (
            <ul className="subsublist">
               {Object.values(item[1]).map((el, i) => 
                  <li key={i}>
                     <button
                        className="subsublist_btn"
                        onClick={() => {
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

   const handleClick = (item: string[] | string, i: number) => {
      if (typeof(item) === 'string') {
         dispatch(setShowModal(false));
         getPgnFileData(item, name);
      } else {
         showSubItems[i] = !showSubItems[i];
         //console.log(showSubItems[i]);
         //console.log([...showSubItems]);
         setShowSubItems([...showSubItems]);
      }
   }

   return (
      <>
         <button
            className="list_btn"
            onClick={() => setShowItems(!showItems)}
         >
            {name}
         </button>

         { showItems && 
            <ul className="sublist">
               {itemsArr.map((item, i) => 
                  <li key={i}>
                     <button
                        className="sublist_btn"
                        onClick={() => handleClick(item, i)}
                     >
                        { typeof(item) === 'string' &&
                           item }
                        { typeof(item) !== 'string' &&
                           item[0] } 
                     </button>
                     
                     {showSubItems[i] &&
                           getNestedItems(item)}
                  </li>
               )}
            </ul>
         }
      </>
   )
}