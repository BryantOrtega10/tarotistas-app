import { IonContent, IonFooter, IonHeader, IonIcon, IonPage } from '@ionic/react';
import CustomBackButton from '../../components/CustomBackButton/CustomBackButton';
import './PaymentsPage.css'
import { usePaymentsPage } from '../../hooks/usePaymentsPage';
import CustomButton from '../../components/CustomButton/CustomButton';
import { information } from 'ionicons/icons';
import CustomActionCard from '../../components/CustomActionCard/CustomActionCard';


const PaymentsPage: React.FC = () => {

    const { accountData, handleGoToAccount, summaryData, handleGoToHistory } = usePaymentsPage()

    return (
        <IonPage>
            <IonHeader class='ion-no-border padding-header'>
                <CustomBackButton>Pagos</CustomBackButton>
            </IonHeader>
            <IonContent className='padding-container-all'>
                {(!accountData || !accountData?.cuenta) && <div className='no-account'>
                    <h2>Aún no tienes configurada una cuenta bancaria</h2>
                    <p>No tienes registrada una cuenta bancaria en la cual se te envie el dinero de tu trabajo </p>
                </div>}
                {accountData && accountData?.cuenta && <div className='account-exist'>
                    <div className='next-payment'>
                        <b className='title'>Mi próximo pago</b>
                        <div className='table-row'>
                            <span>Total ganancias</span>
                            <span>${summaryData.ganancias.toLocaleString('es-CO')}/COP</span>
                        </div>
                        <div className='table-row'>
                            <span>Total pagos</span>
                            <span>${summaryData.pagos.toLocaleString('es-CO')}/COP</span>
                        </div>
                        <div className='table-row bold-row'>
                            <span>Saldo pendiente</span>
                            <span>${summaryData.saldo.toLocaleString('es-CO')}/COP</span>
                        </div>
                    </div>
                    <CustomActionCard textAction='Ver más' handleClick={handleGoToHistory}>Ver historial completo</CustomActionCard>
                    <div className='message'>
                        <div className='icon-container'><IonIcon icon={information} /></div>
                        <div className='message-container'>
                            <b>Ten en cuenta</b>
                            <p>Los pagos se realizarán periódicamente</p>
                        </div>

                    </div>
                </div>}

            </IonContent>
            <IonFooter className='footer-buttons'>
                <CustomButton variant='purple' onClick={handleGoToAccount}>{accountData?.cuenta ? 'Modificar cuenta' : 'Agregar cuenta'}</CustomButton>
            </IonFooter>
        </IonPage>
    );
};

export default PaymentsPage;
