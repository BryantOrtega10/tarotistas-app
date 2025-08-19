import { IonSelect, IonSelectOption } from '@ionic/react';
import type { ComponentProps } from 'react';
import './CustomSelect.css';


type CustomSelectProps = ComponentProps<typeof IonSelect> & {
    className?: string;
    label: string;
    options?: {
        value: number,
        text: string
    }[],
    onChange?: (value: string) => void;
};



const CustomSelect: React.FC<CustomSelectProps> = ({
    className = '',
    label,
    options = [],
    onChange = (value: string) => { },
    ...props
}) => {
    return (
        <div className='custom-select-container'>
            <b>{label}</b>
            <IonSelect className={`custom-select ${className}`} fill="outline" {...props} onIonChange={(event) => onChange(JSON.stringify(event.detail.value))}>
                {options.map((option, index) => (
                    <IonSelectOption key={`option_${index}`} value={option.value}>
                        {option.text}
                    </IonSelectOption>
                ))}
            </IonSelect>
        </div>
    );
};

export default CustomSelect;
