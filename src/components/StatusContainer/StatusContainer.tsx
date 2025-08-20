import { IonToggle } from '@ionic/react';
import './StatusContainer.css';
import { ComponentProps } from 'react';

type StatusContainerProps = ComponentProps<typeof IonToggle> & {
    isActive: boolean;
};

const StatusContainer: React.FC<StatusContainerProps> = ({ isActive = false, ...props }) => {
    return (
        <div className={`status-container`}>
            <div className='status-text'>
                <img src={`/assets/images/status/status.png`} 
                srcSet={`
                    /assets/images/status/status.png 1x,
                    /assets/images/status/status@2x.png 2x,
                    /assets/images/status/status@3x.png 3x
                `} />
                {isActive && <span className='status-online'>En línea</span>}
                {!isActive && <span className='status-offline'>Desconectado</span>}
            </div>
            <IonToggle {...props} checked={isActive} aria-label="Cambiar mi estado de conexión"></IonToggle>
        </div>
    );
};

export default StatusContainer;
