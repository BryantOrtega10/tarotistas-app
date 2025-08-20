import { IonButton } from '@ionic/react';
import type { ComponentProps } from 'react';
import './CustomButton.css';

type CustomButtonProps = ComponentProps<typeof IonButton> & {
    variant?: 'purple' | 'transparent' | 'white';
};

const CustomButton: React.FC<CustomButtonProps> = ({
    children,
    className = '',
    variant = 'purple',
    ...props
}) => {
    return (
        <div className='custom-button-container'>
            <IonButton
                className={`custom-button ${variant} ${className}`}
                expand='full'
                {...props}
            >
                {children}
            </IonButton>
        </div>
    );
};

export default CustomButton;
