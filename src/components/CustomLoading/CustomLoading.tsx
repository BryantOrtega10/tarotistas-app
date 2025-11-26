import React from 'react';
import './CustomLoading.css';


const CustomLoading: React.FC = () => {
    return (
        <div className={`custom-loading-container`} data-testid="custom-loading">
            <div className='custom-loader'></div>
        </div>
    );
};

export default CustomLoading;