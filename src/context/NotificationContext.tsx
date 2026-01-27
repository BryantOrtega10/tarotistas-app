import { createContext, useState, useEffect, ReactNode, useContext, useRef } from "react";
import { PushNotifications } from "@capacitor/push-notifications";
import { Haptics } from "@capacitor/haptics";
import { CallNotificationData, ChatNotificationData } from "../types/responses/notificationResponse";

// Define el tipo de datos que expone el contexto
interface NotificationContextType {
  tokenFirebase: string | null;                                            
  setTokenFirebase: (value: string | null) => void;                        
  chatNotification: ChatNotificationData | null;                                   
  setChatNotification: (value: ChatNotificationData | null) => void;               
  callNotification: CallNotificationData | null;           
  setCallNotification: (value: CallNotificationData | null) => void; 
}

// Crea el contexto con valores iniciales vacíos
export const NotificationContext = createContext<NotificationContextType>({
  tokenFirebase: null,
  setTokenFirebase: () => {},
  chatNotification: null,
  setChatNotification: () => {},
  callNotification: null,
  setCallNotification: () => {}
});

// Provider principal de notificaciones
export const NotificationProvider = ({ children }: { children: ReactNode }) => {

  const [chatNotification, setChatNotification] = useState<ChatNotificationData | null>(null);
  const [callNotification, setCallNotification] = useState<CallNotificationData | null>(null);
  const [tokenFirebase, setTokenFirebase] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    const callPermissions = async () => {
      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === "prompt") {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== "granted") {
        console.warn("Permisos denegados para notificaciones push.");
      }

      // Listener: cuando se obtiene token de Firebase
      await PushNotifications.addListener("registration", (token) => {
        console.info("Registration token: ", token.value);
        setTokenFirebase(token.value);
      });

      // Listener: cuando llega una notificación en primer plano
      await PushNotifications.addListener("pushNotificationReceived", (notificationReceived) => {
        if ("chatId" in notificationReceived.data) {
          // Notificación de reacción
          const chatNotification: ChatNotificationData = notificationReceived.data;
          setChatNotification(chatNotification);
        } else {
          // Notificación de servicio
          const notificacionServiceData: CallNotificationData = notificationReceived.data;
          setCallNotification(notificacionServiceData);
        }
      });

      // Listener: cuando el usuario interactúa con la notificación
      PushNotifications.addListener("pushNotificationActionPerformed", (action) => {
        if ("chatId" in action.notification.data) {
          const chatNotification: ChatNotificationData = action.notification.data;
          localStorage.setItem(`ultima-notificacion`, JSON.stringify(chatNotification));
          setChatNotification(chatNotification);
        } else {
          const notificacionServiceData: CallNotificationData = action.notification.data;
          setCallNotification(notificacionServiceData);
        }
      });

      // Registra el dispositivo para recibir notificaciones
      await PushNotifications.register();
    };

    callPermissions();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      PushNotifications.removeAllListeners();
    };
  }, []);



  return (
    <NotificationContext.Provider
      value={{
        tokenFirebase,
        setTokenFirebase,
        chatNotification,
        setChatNotification,
        callNotification,
        setCallNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Hook para acceder fácilmente al contexto
export const useNotificationContext = () => useContext(NotificationContext);