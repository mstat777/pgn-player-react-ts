import { useAppSelector } from '../../store/hooks';
import './StatusPanel.scss';
import { useEffect, useState } from 'react';

export default function StatusPanel() {
    const { errors, status } = useAppSelector((state) => state.pgnData);
    const [statusTxt, setStatusTxt] = useState<string>('');

    useEffect(() => {
        if (status) {
            setStatusTxt(status);
        }
    },[errors.length, status]);

    return (
        <section className="status_section">
            <div className="status_txt_ctn">
                <textarea
                    className="status_txt"
                    value={statusTxt}
                    disabled={true}
                ></textarea>
            </div>
        </section>
    );
}