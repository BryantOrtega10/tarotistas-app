import { IonRippleEffect } from '@ionic/react';
import './CustomLink.css';

type CustomLinkProps = {
    children: React.ReactNode;
    className?: string;
    variant?: 'purple' | 'violet';
    underline?: boolean,
    onClick?: () => void;
};

const CustomLink: React.FC<CustomLinkProps> = ({
    children,
    className = '',
    variant = 'purple',
    underline = false,
    onClick = () => {}
}) => {
    return (
        <div className={`custom-link-container ion-activatable ripple-parent ${className} link-${variant} ${underline ? 'link-underline' : ''}`} onClick={onClick}>
            <IonRippleEffect></IonRippleEffect>
            <span>{children}</span>
        </div>
    );
};

export default CustomLink;
