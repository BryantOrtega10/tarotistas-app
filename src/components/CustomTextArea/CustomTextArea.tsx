import { IonTextarea } from '@ionic/react';
import type { ComponentProps } from 'react';
import './CustomTextArea.css';

type CustomTextAreaProps = ComponentProps<typeof IonTextarea> & {
    label?: string;
};

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
    children,
    className = '',
    label,
    ...props
}) => {
    return (
        <div className='custom-text-area-container'>
            {label && <b>{label}</b>}
            {children}
            <IonTextarea
                className={`custom-text-area ${className}`}
                fill="outline"
                rows={5}
                {...props}
            >
            </IonTextarea>
        </div>
    );
};

export default CustomTextArea;
