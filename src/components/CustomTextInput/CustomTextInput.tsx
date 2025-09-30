import { IonInput } from '@ionic/react';
import type { ComponentProps } from 'react';
import './CustomTextInput.css';

type CustomTextInputProps = ComponentProps<typeof IonInput> & {
    label: string;
    readonly?: boolean;
};

const CustomTextInput: React.FC<CustomTextInputProps> = ({
    children,
    className = '',
    label,
    readonly = false,
    ...props
}) => {
    return (
        <>
            {(!readonly && <div className='custom-text-input-container'>
                <b>{label}</b>
                {children}
                <IonInput
                    className={`custom-text-input ${className}`}
                    fill="outline"
                    {...props}
                >
                </IonInput>
            </div>)}
            {(readonly && <div className={`custom-text-input-container is-readonly ${className}`}>
                <b>{label}</b>
                <span>{children}</span>
            </div>)}
        </>
    );
};

export default CustomTextInput;
