import { IonContent, IonFooter, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonPage, IonRefresher, IonRefresherContent } from '@ionic/react';
import CustomBackButton from '../../components/CustomBackButton/CustomBackButton';
import './PaymentsPage.css'
import { useHistoryPaymentsPage } from '../../hooks/useHistoryPaymentsPage';
import { formatShortSpanishDateHour, formatSpanishDate } from '../../utils/formatDate';


const HistoryPaymentsPage: React.FC = () => {

    const { historyItems, handleRefresh, isInfiniteDisabled, loadMoreData } = useHistoryPaymentsPage()


    return (
        <IonPage>
            <IonHeader class='ion-no-border padding-header'>
                <CustomBackButton>Historial de pagos</CustomBackButton>
            </IonHeader>
            <IonContent className='padding-container-all'>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh} data-testid="refresher">
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                {historyItems.map((item, index) =>
                    <div className='item-history' key={`history-item-${index}`}>
                        <h2>Pago mes {item.mes} - {item.anio}</h2>

                        <div className='next-payment'>
                            <b className='title'>Ganancias</b>
                            <div className='table-row'>
                                <span>Subtotal</span>
                                <span>${item.ganancias.subtotal.toLocaleString('es-CO')}/COP</span>
                            </div>
                            <div className='table-row'>
                                <span>Comision</span>
                                <span>- ${item.ganancias.comision.toLocaleString('es-CO')}/COP</span>
                            </div>
                            <div className='table-row bold-row'>
                                <span>Total</span>
                                <span>${item.ganancias.total.toLocaleString('es-CO')}/COP</span>
                            </div>
                        </div>
                        <div className='next-payment'>
                            <b className='title'>Pagos</b>
                            <div className='table-row bold-row'>
                                <span>Total Pagos:</span>
                                <span>${item.pagosTotales.toLocaleString('es-CO')}/COP</span>
                            </div>
                        </div>
                        {item.pagos.map((subItem, subIndex) => <div className='sub-item-history' key={`history-item-${index}-${subIndex}`}>
                            <div>
                                <b>Pago</b>
                                <p>{formatShortSpanishDateHour(subItem.created_at)}</p>
                                <p>{subItem.descripcion}</p>
                            </div>
                            <span>${(typeof subItem.valor === 'string' ? parseInt(subItem.valor) : subItem.valor).toLocaleString('es-CO')}/COP</span>

                        </div>)}

                    </div>)}
                    <IonInfiniteScroll
                        disabled={isInfiniteDisabled}
                        onIonInfinite={loadMoreData}
                        data-testid="infinite-scroll">
                    <IonInfiniteScrollContent loadingText="Cargando..." loadingSpinner="bubbles"></IonInfiniteScrollContent>
                </IonInfiniteScroll>

            </IonContent>
        </IonPage>
    );
};

export default HistoryPaymentsPage;
