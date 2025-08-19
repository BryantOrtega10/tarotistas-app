import { IonInput } from '@ionic/react';
import type { ComponentProps } from 'react';
import './CustomTextInput.css';

type CustomTextInputProps = ComponentProps<typeof IonInput> & {
    label: string;
};

const CustomTextInput: React.FC<CustomTextInputProps> = ({
    children,
    className = '',
    label,
    ...props
}) => {
    return (
        <div className='custom-text-input-container'>
            <b>{label}</b>
            {children}
            <IonInput
                className={`custom-text-input ${className}`}
                fill="outline"
                {...props}
            >                
            </IonInput>
        </div>
    );
};

export default CustomTextInput;
