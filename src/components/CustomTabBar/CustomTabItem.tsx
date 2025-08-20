import { IonIcon, IonRippleEffect } from '@ionic/react';
import './CustomTabBar.css';

type CustomTabItemProps = {
    isActive: boolean;
    icon: string;
    text: string;
    onClick: () => void;

};

const CustomTabItem: React.FC<CustomTabItemProps> = ({ isActive = false, icon, text, onClick }) => {
    return (
        <div className={`custom-tab-item-container ion-activatable ripple-parent ${isActive ? 'tab-active' : ''}`} onClick={onClick}>
            <IonRippleEffect></IonRippleEffect>
            <div className='custom-tab-item'>
                <div className='custon-tab-item-icon-container'><IonIcon icon={icon}></IonIcon></div>
                {text}
            </div>
        </div>
    );
};

export default CustomTabItem;
