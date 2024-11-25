import { useRef, MouseEventHandler, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { HTMLInputEvent } from '../../configs/interfaces';

type Props = {
    setPgnTxt: Dispatch<SetStateAction<string>>;
    //handleFile: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function FileUploader({ setPgnTxt/*,handleFile*/ 
}: Props) {
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
                    //console.log(readerEvent.target.result.toString());
                    setPgnTxt(readerEvent.target.result.toString());
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
                open
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