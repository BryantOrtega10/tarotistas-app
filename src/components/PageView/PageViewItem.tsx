import PageItemModel from '../../interfaces/PageItemModel';
import CustomButton from '../CustomButton/CustomButton';
import './PageViewItem.css';

const PageViewItem: React.FC<PageItemModel> = ({ title, image, text, clickContinue }) => {
    return (
        <div className='pageview-container'>
            <img src={`/assets/images/${image}/${image}.png`} className='pageview-image'
                srcSet={`
                    /assets/images/${image}/${image}.png 1x,
                    /assets/images/${image}/${image}@2x.png 2x,
                    /assets/images/${image}/${image}@3x.png 3x
                `} />
            <h1 className='pageview-title'>{title}</h1>
            <p className='pageview-text'>{text}</p>
            <div className='pageview-container-button'>
                <CustomButton onClick={clickContinue}>Siguiente</CustomButton>
            </div>
        </div>
    );
}
export default PageViewItem;