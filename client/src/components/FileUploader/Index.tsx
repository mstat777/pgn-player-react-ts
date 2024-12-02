import { useRef, MouseEventHandler, ChangeEvent } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { setPgnTxt } from '../../store/slices/pgnData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from "react-responsive";

export default function FileUploader() {
   const dispatch = useAppDispatch();

   const isMobile = useMediaQuery({query: '(max-width: 767px)'});

   const hiddenFileInput = useRef<HTMLInputElement>(null);

   const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
      hiddenFileInput.current?.click();
   }
/*
   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
         const fileUploaded = e.target.files[0];
         handleFile(fileUploaded); 
      }
   };*/
   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
         const reader = new FileReader();
         reader.readAsText(e.target.files[0], 'UTF-8');
         reader.onloadend = (readerEvent: ProgressEvent<FileReader>) => {
            if (readerEvent.target?.result) {
               dispatch(setPgnTxt(readerEvent.target.result.toString()));
            }
         };
      }
   }

   return (
      <>
         <button 
            className="open_btn"
            onClick={handleClick}
         >
            {!isMobile ? 
               'open' :
               <FontAwesomeIcon icon={faFolderOpen} />}
         </button>

         <input 
            type="file" 
            accept=".pgn"
            onChange={handleChange}
            ref={hiddenFileInput}  
            style={{display:'none'}}
         />
      </>
   )
}