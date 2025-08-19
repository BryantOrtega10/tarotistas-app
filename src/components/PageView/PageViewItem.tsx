import PageItemModel from '../../interfaces/PageItemModel';
import './PageViewItem.css';
import { IonButton, IonImg } from '@ionic/react';



const PageViewItem: React.FC<PageItemModel> = ({title, image, text, clickContinue}) => {
    return (
        <div className='pageview-container'>
            <img src={`/assets/images/${image}`} alt={`${title}`} className='pageview-image'></img>
            <h1 className='pageview-title'>{title}</h1>
            <p className='pageview-text'>{text}</p>
            <div className='pageview-container-button'>
            <IonButton 
                expand="block"
                shape='round'
                onClick={clickContinue}>
                    Siguiente
            </IonButton>
            </div>
            
        </div>
        
    );

}
export default PageViewItem;