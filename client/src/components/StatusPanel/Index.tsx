import './StatusPanel.scss';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setStatusTxt } from '../../store/slices/game';

export default function StatusPanel() {
   const dispatch = useAppDispatch();
   const { statusTxt } = useAppSelector((state) => state.game);
   const { errors, status } = useAppSelector((state) => state.pgnData);

   useEffect(() => {
      if (status) {
         let errorsTxt = '';
         errors.length && errors.forEach(err => errorsTxt += err + '\n');
         dispatch(setStatusTxt(status+'\n'+errorsTxt));
      }
   },[errors.length, status]);

   return (
      <section className="status_section">
         <div className="status_txt_ctn">
            <textarea
               className="status_txt"
               value={statusTxt}
               rows={3}
               disabled={true}
            ></textarea>
         </div>
      </section>
   );
}