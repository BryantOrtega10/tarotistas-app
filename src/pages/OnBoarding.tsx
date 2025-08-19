import { IonButton, IonContent, IonNavLink, IonPage } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Swiper as SwiperInterface } from 'swiper';

import { useState } from 'react';
import { useHistory } from 'react-router';
import PageViewItem from '../components/PageView/PageViewItem';

import './Tutorial.css';
import 'swiper/css';
import 'swiper/css/pagination';
import '@ionic/react/css/ionic-swiper.css';
import PageItemModel from '../interfaces/PageItemModel';


const Tutorial: React.FC = () => {

  const [swiperInstance, setSwiperInstance] = useState<SwiperInterface>();
  const history = useHistory();

  const clickContinue = async () => {
    const isEnd = swiperInstance?.isEnd;
    if (isEnd) {
      localStorage.setItem('showPageView', 'NO');
      history.replace('/login');

    }
    else {
      swiperInstance?.slideNext();
    }
  };

  const clickOmitir = () => {
    localStorage.setItem('showPageView', 'NO');
    history.replace('/login');
  }




  const data: PageItemModel[] = [
    {
      title: "Conductor",
      image: "inicio1.png",
      text: `Si eres conductor o propietario de un vehículo de carga sin importar su categoría, te damos la bienvenida a Viaja Ya.

La aplicación donde te contactamos más fácil y rápido con tus posibles clientes.`,
      clickContinue: clickContinue
    },
    {
      title: "Registrate",
      image: "inicio2.png",
      text: `Regístrate con Nosotros en máximo 3 simple pasos, e incrementa tu número de viajes; así puedas ganar más dinero y ser más productivo.

Alista los documentos del vehículo, tus documentos como conductor y los documentos del propietario del vehículo.

¡Importante!: Si no eres propietario, pídele al dueño del vehículo una carta donde te autoriza a conducirlo.`,
      clickContinue: clickContinue
    },
    {
      title: "Condiciones",
      image: "inicio3.png",
      text: "Lee muy bien nuestro contrato y acepta los términos y condiciones, de esta manera entenderemos que estás de acuerdo con nuestras tarifas, servicios y condiciones de nuestro MANAGEMENT.",
      clickContinue: clickContinue
    },
    {
      title: "Viaja YA",
      image: "inicio4.png",
      text: `Disfruta de tu experiencia con Viaja YA y vuélvete nuestro usuario conductor permanente para que puedas disfrutar de grandes beneficios por el número de viajes que acurdes con nuestros usuarios clientes.

Esperamos ayudarte a aumentar tus ingresos de manera eficiente.`,
      clickContinue: clickContinue
    }
  ];




  return (
    <IonPage>
      <IonContent fullscreen scrollY={false} className="ion-padding">
        <IonButton className='btn-omitir' fill="clear" onClick={clickOmitir} >Omitir</IonButton>
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

export default Tutorial;
