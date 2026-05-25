import { AccordionGroupCustomEvent, IonAccordion, IonAccordionGroup, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonPage } from '@ionic/react';

import './HelpPage.css'
import CustomTabBar from '../components/CustomTabBar/CustomTabBar';
import { useState } from 'react';


const HelpPage: React.FC = () => {

    const [selectedAccordeon, setSelectedAccordeon] = useState<string>(`accordion1`)
    const handleChangeAccordeon = (event: AccordionGroupCustomEvent) => {
        const selectedValue = event.detail.value;
        const target = event.target as HTMLElement | null;
        if (target?.tagName === 'ION-ACCORDION-GROUP') {
            setSelectedAccordeon(selectedValue);
        }
    }

    return (
        <IonPage>

            <IonContent fullscreen className='padding-container-all'>
                <h1 className='my-profile-title'>Ayuda y reglas</h1>
                <IonAccordionGroup value={selectedAccordeon} onIonChange={handleChangeAccordeon}>
                    <br />
                    <br />
                    <h2>❓ ¿Cómo funciona Tarot de Sábila?</h2>
                    <div className="como_funciona">
                        <ul>
                            <li>Activar disponibilidad para recibir consultas</li>
                            <li>Atender de forma oportuna a los usuarios</li>
                            <li>Los ingresos se generan según el tiempo de consulta</li>
                            <li>Mantener buena calificación dentro de la plataforma</li>
                        </ul>
                    </div>
                    <h2>🔮 Reglas para Tarotistas</h2>
                    <ul>
                        <li>Brindar un servicio respetuoso y profesional a todos los usuarios.</li>
                        <li>No engañar ni prometer resultados garantizados.</li>
                        <li>No solicitar pagos por fuera de la plataforma.</li>
                        <li>Mantener buena conducta y trato hacia los clientes.</li>
                        <li>Cumplir con los tiempos de consulta establecidos.</li>
                        <li>Tarot de Sábila se reserva el derecho de suspender o eliminar cuentas que incumplan estas reglas.</li>
                        <li>Los ingresos podrán ser retenidos en caso de incumplimientos o quejas comprobadas.</li>

                    </ul>
                </IonAccordionGroup>

            </IonContent>

            <IonFooter className='footer-tab-bar'>
                <CustomTabBar active='help' />
            </IonFooter>
        </IonPage>
    );
};

export default HelpPage;
