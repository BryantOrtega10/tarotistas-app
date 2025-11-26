import { IonRippleEffect } from '@ionic/react';
import './CustomTopTabItem.css';

export type CustomTopTabItemProps = {
    label: string,
    isActive?: boolean
    handleClick: () => void
} 

const CustomTopTabItem: React.FC<CustomTopTabItemProps> = ({label, isActive = false, handleClick}) => {

    return (
        <div className={`custom-top-bar-item ion-activatable ripple-parent ${isActive ? 'custom-top-bar-active' : ''}`} onClick={handleClick}>
            <IonRippleEffect></IonRippleEffect>
            <span>{label}</span>
            <div className='custom-top-bar-underline'></div>
        </div>
    );
};

export default CustomTopTabItem;
