import { useAppSelector } from '../../store/hooks';
import './StatusPanel.scss';
import { useEffect, Dispatch, SetStateAction } from 'react';

type Props = {
    statusTxt: string;
    setStatusTxt: Dispatch<SetStateAction<string>>;
}

export default function StatusPanel(props: Props) {
    const { statusTxt, setStatusTxt } = props;

    const { errors, status } = useAppSelector((state) => state.pgnData);

    useEffect(() => {
        if (status) {
            let errorsTxt = '';
            errors.length && errors.forEach(err => errorsTxt += err + '\n');
            setStatusTxt(status+'\n'+errorsTxt);
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