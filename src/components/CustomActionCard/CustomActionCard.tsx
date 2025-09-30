import './CustomActionCard.css';
import { ReactNode } from 'react';
import CustomButton from '../CustomButton/CustomButton';

export type CustomActionCardProps = {
    children: ReactNode | undefined;
    textAction: string;
    handleClick?: () => void;    
};

const CustomActionCard: React.FC<CustomActionCardProps> = ({children, textAction, handleClick}) => {
    return (
        <div className={`custom-action-card-container`}>
            <div className='custom-action-card-text'>{children}</div>
            {handleClick && <div className='custom-action-card-action'><CustomButton variant='transparent' onClick={handleClick}>{textAction}</CustomButton></div>}
            {!handleClick && <div className='custom-action-card-action'>{textAction}</div>}
        </div>
    );
};

export default CustomActionCard;
