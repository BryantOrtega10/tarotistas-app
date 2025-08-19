import './CustomProgress.css';

type CustomProgressProps = {
    step: number,
    total: number;
    className?: string,
};

const CustomProgress: React.FC<CustomProgressProps> = ({
    step,
    total,
    className
}) => {
    return (
        <div className={`custom-progress-container ${className}}`}>
            <div className='progress-text'>Paso {step} de {total}</div>
            <div className='progressbar-container'>
                <div style={{ width: `${(step / total)*100}%` }} className='progressbar'></div>
            </div>
        </div>
    );
};

export default CustomProgress;
