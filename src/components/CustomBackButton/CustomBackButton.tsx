import { IonButton, IonIcon } from '@ionic/react';
import './CustomBackButton.css';
import { chevronBackOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

type CustomBackButtonProps = {
    children: React.ReactNode;
    className?: string
};


const CustomBackButton: React.FC<CustomBackButtonProps> = ({
    children,
    className = ''
}) => {

    const history = useHistory()
    
    return (
        <div className={`custom-back-button-container ${className}`}>
            <IonButton onClick={ () => history.goBack() }><IonIcon icon={chevronBackOutline}/></IonButton>
            <h1 className='custom-back-button-title'>{children}</h1>
        </div>
    );
};

export default CustomBackButton;
