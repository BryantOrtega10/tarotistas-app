import { createContext, useState, useEffect, ReactNode, useContext, useRef } from "react";
import { PushNotifications } from "@capacitor/push-notifications";

import { Haptics } from "@capacitor/haptics";
import { CallNotificationData, ChatNotificationData } from "../types/responses/notificationResponse";

// Define el tipo de datos que expone el contexto
interface NotificationContextType {
  tokenFirebase: string | null;                                            // Token de registro en Firebase
  setTokenFirebase: (value: string | null) => void;                        // Setter del token
  chatNotification: ChatNotificationData | null;                                   // Última notificación (tipo reacción)
  setChatNotification: (value: ChatNotificationData | null) => void;               // Setter de la notificación
  callNotification: CallNotificationData | null;           // Notificación de servicio (moto)
  setCallNotification: (value: CallNotificationData | null) => void; // Setter de servicio
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
  /**
   * Estado inicial de notificación:
   * - Carga desde localStorage la última notificación guardada (`ultima-notificacion`)
   * - Verifica si sigue siendo válida (TTL en segundos)
   * - Si está vencida → se elimina
   */
  const [chatNotification, setChatNotification] = useState<ChatNotificationData | null>(null);

  // Estado para notificación de servicios de motocicleta
  const [callNotification, setCallNotification] = useState<CallNotificationData | null>(null);

  // Estado para token de Firebase
  const [tokenFirebase, setTokenFirebase] = useState<string | null>(null);

  // Ref para manejar el intervalo de verificación de TTL
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * useEffect inicial:
   * - Solicita permisos para notificaciones
   * - Escucha eventos de registro y recepción de notificaciones
   * - Guarda token de Firebase
   * - Procesa y guarda notificaciones recibidas
   * - Configura un intervalo para validar TTL
   * - Limpia intervalos y listeners al desmontar
   */
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
        if ("reactionId" in notificationReceived.data) {
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
        if ("reactionId" in action.notification.data) {
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


  // Proveedor del contexto
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