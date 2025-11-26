import { IonContent, IonPage } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Swiper as SwiperInterface } from 'swiper';

import { useState } from 'react';
import { useHistory } from 'react-router';
import PageViewItem from '../components/PageView/PageViewItem';

import './Onboarding.css';
import 'swiper/css';
import 'swiper/css/pagination';
import '@ionic/react/css/ionic-swiper.css';
import PageItemModel from '../interfaces/PageItemModel';
import CustomButton from '../components/CustomButton/CustomButton';


const Onboarding: React.FC = () => {

  const [swiperInstance, setSwiperInstance] = useState<SwiperInterface>();
  const history = useHistory();

  const clickContinue = async () => {
    const isEnd = swiperInstance?.isEnd;
    if (isEnd) {
      localStorage.setItem('onBoardingDone', 'true');
      history.replace('/login');
    }
    else {
      swiperInstance?.slideNext();
    }
  };

  const clickOmitir = () => {
    localStorage.setItem('onBoardingDone', 'true');
    history.replace('/login');
  }

  const data: PageItemModel[] = [
    {
      title: "Titulo1 Lorem",
      image: "onBoarding1",
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere eros elit, a fermentum velit hendrerit sit amet`,
      clickContinue: clickContinue
    },
    {
      title: "Titulo2 Lorem",
      image: "onBoarding2",
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere eros elit, a fermentum velit hendrerit sit amet`,
      clickContinue: clickContinue
    },
    {
      title: "Titulo3 Lorem",
      image: "onBoarding3",
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere eros elit, a fermentum velit hendrerit sit amet`,
      clickContinue: clickContinue
    },
  ];

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false} className="onboarding">
        <div className='omitir-container'><CustomButton variant='transparent' onClick={clickOmitir}>Omitir</CustomButton></div>
        <Swiper modules={[Pagination]} pagination={true} onSwiper={(swiper) => setSwiperInstance(swiper)}>
          {
            data.map((item, index) => {
              return (
                <SwiperSlide key={`slide_${index}`}>
                  <PageViewItem
                    title={item.title}
                    image={item.image}
                    text={item.text}
                    clickContinue={item.clickContinue} />
                </SwiperSlide>
              );
            })
          }
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default Onboarding;
