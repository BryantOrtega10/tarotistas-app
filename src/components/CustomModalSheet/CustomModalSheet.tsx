import React, { ComponentProps } from 'react';
import './CustomModalSheet.css';
import { IonModal } from '@ionic/react';


type CustomModalSheetProps = ComponentProps<typeof IonModal> & {
    children: React.ReactNode;
    icon?: 'error' | 'urgent' | 'warning'
};

const CustomModalSheet: React.FC<CustomModalSheetProps> = ({
    children,
    icon,
    ...props
}) => {
    return (
        <IonModal role="dialog" className='custom-modal'   {...props}>
            <div className={`custom-modal-content-container ${icon}`}>
                {(icon && <div className='custom-modal-icon-container'>
                    <img src={`/assets/images/modal-${icon}-icon/modal-${icon}-icon.png`} alt={icon}
                            srcSet={`
                                    /assets/images/modal-${icon}-icon/modal-${icon}-icon.png 1x,
                                    /assets/images/modal-${icon}-icon/modal-${icon}-icon@2x.png 2x,
                                    /assets/images/modal-${icon}-icon/modal-${icon}-icon@3x.png 3x
                                `}
                            className='custom-modal-icon' />
                </div>)}
                {children}
            </div>
        </IonModal>
    );
};

export default CustomModalSheet;