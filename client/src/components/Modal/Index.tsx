import './Modal.scss';
import { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { useAppDispatch } from '../../store/hooks';
import { setShowModal } from '../../store/slices/settings';

interface Props {
   children?: ReactNode;
}

export default function Modal({children}: Props) {

   const dispatch = useAppDispatch();

   return (
      <div className="modal_ctn">
         <section className="modal">
            <button 
               className="close_btn"
               onClick={() => dispatch(setShowModal(false))}
            >
               <FontAwesomeIcon icon={faCircleXmark} />
            </button>

            { children }

         </section>
      </div>
   );
}