import { useEffect, useRef, useState } from "react";
import { Channel } from "pusher-js";
import { useIonViewWillLeave } from "@ionic/react";
import { CallService } from "../service/CallService";
import { Llamada } from "../models/Llamada.model";
import { useHistory } from "react-router";

type CallStatus = "idle" | "ringing" | "connected" | "ended";


export function useCallPage(call_id: number) {
    const history = useHistory();
    const [canal, setCanal] = useState<Channel>()
    const [status, setStatus] = useState<CallStatus>("idle");
    const pcRef = useRef<RTCPeerConnection | null>(null);
    const localStreamRef = useRef<MediaStream | null>(null);
    const remoteAudioRef = useRef<HTMLAudioElement | null>(null);
    const pendingIceCandidates = useRef<RTCIceCandidateInit[]>([]);


    const [currentCall, setCurrentCall] = useState<Llamada | null>(null)
    const [receiverBorder, setReceiverBorder] = useState<number>(0) //max: 25
    const [transmitterBorder, setTransmitterBorder] = useState<number>(0)
    const [showStartCall, setShowStartCall] = useState<boolean>(true);
    const [isMuted, setIsMuted] = useState(false);

    const [showReconnect, setShowReconnect] = useState<boolean>(false);
    


    useEffect(() => {
        remoteAudioRef.current = document.createElement("audio");
        remoteAudioRef.current.autoplay = true; // importante
        remoteAudioRef.current.volume = 1;
        remoteAudioRef.current.setAttribute("playsinline", "true");
        console.log("Audio ref creado")
    }, []);



    /* =========================
     Inicializar canal Pusher
    ==========================*/
    useEffect(() => {
        if (call_id) {
            subscribeChannel()
            obtenerInfoLlamada()
            console.log("Call ID nuevo ", call_id);
        }
    }, [call_id])

    const obtenerInfoLlamada = async () => {
        try {
            const { success, data } = await CallService.getLlamada(call_id);
            if (success) {
                setCurrentCall(data.llamada)
                console.log("Llamada consultada correcta", data.llamada);
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    const subscribeChannel = async () => {
        const channel = await CallService.connectToCallChannel(call_id);
        setCanal(channel)
        console.log("Se conecto al canal ", channel);
    }

    useIonViewWillLeave(() => {
        if (canal) {
            canal.unbind_all()
            endCall()
        }
    }, [canal])


    /* =========================
     Configurar eventos Pusher
  ==========================*/
    useEffect(() => {
        if (!canal) return;

        //canal.unbind_all();

        canal.bind("llamada.change", async (data: any) => {
            console.log("Canal cambio de data ", data);
            const llamada = data.llamada as Llamada
            switch (data.type) {
                case "call-start":
                    setStatus("ringing");
                    break;

                // case "webrtc-offer":
                //     await onReceiveOffer(data.offer);
                //     break;

                case "webrtc-answer":
                    await onReceiveAnswer(data.answer);
                    break;

                case "webrtc-ice":
                    if (pcRef.current && pcRef.current.remoteDescription) {
                        await pcRef.current.addIceCandidate(data.candidate);
                        console.log("ice recibido y agregado porque ya tengo descripcion", data.candidate)
                    } else {
                        pendingIceCandidates.current.push(data.candidate);
                        console.log("ice recibido y dejado en cola aun no tengo descripcion", data.candidate)
                    }
                    break;

                case "call-end":
                    endCall();
                    break;
            }
        });
    }, [canal]);


    /* =========================
     Iniciar llamada (caller)
    ==========================*/
    const handleStartCall = async () => {


        await createPeerConnection();

        const offer = await pcRef.current!.createOffer();
        await pcRef.current!.setLocalDescription(offer);
        try {
            await CallService.postSendOffer(call_id, offer);
            console.log("Se ha enviado este offer ", offer);
        }
        catch (e) {
            console.log("Error al enviar el offer al servidor", e)
        }
        setShowStartCall(false)
        if (remoteAudioRef.current) {
            remoteAudioRef.current.play();
        }
        else {
            console.log("no existe audio")
        }

    };


    /* =========================
        Crear PeerConnection
    ==========================*/
    const createPeerConnection = async () => {
        console.log("Se ha iniciado una creacion de conexion");
        const pc = new RTCPeerConnection({
            iceServers: [{
                urls: ["stun:us-turn4.xirsys.com"]
            }, {
                username: "MGQuEZ0TIHSYhrUEy-ZbVZyd0NaL8m-YwYc69sBprVSi4t-Y7u0IO8EzIu1-un4DAAAAAGlOv11icnlhbnRtZGNjb2xvbWJpYQ==",
                credential: "7eb9a6de-e27c-11f0-b496-0242ac140004",
                urls: [
                    "turn:us-turn4.xirsys.com:80?transport=udp",
                    "turn:us-turn4.xirsys.com:3478?transport=udp",
                    "turn:us-turn4.xirsys.com:80?transport=tcp",
                    "turn:us-turn4.xirsys.com:3478?transport=tcp",
                    "turns:us-turn4.xirsys.com:443?transport=tcp",
                    "turns:us-turn4.xirsys.com:5349?transport=tcp"
                ]
            }]
        });

        pc.onicecandidate = (event) => {
            if (event.candidate && canal) {
                CallService.postIce(call_id, event.candidate)
                console.log("Se ha enviado este ice candidate ", event.candidate);
            }
        };
        pc.oniceconnectionstatechange = () => {
            console.log("ICE state:", pc.iceConnectionState);
        };

        pc.onicegatheringstatechange = () => {
            console.log("ICE gathering:", pc.iceGatheringState);
        };

        pc.onconnectionstatechange = () => {
            console.log("Conexion cambio", pc.connectionState);
            if(pc.connectionState === "connected"){
                setShowReconnect(false)
                console.log("--------------------CONEXION CREADA-------------------------- ");
                console.log("--------------------CONEXION CREADA-------------------------- ");
                console.log("--------------------CONEXION CREADA-------------------------- ");
                console.log("--------------------CONEXION CREADA-------------------------- ");
                console.log("--------------------CONEXION CREADA-------------------------- ");
            }
            if(pc.connectionState === "disconnected"){
                setShowReconnect(true)
                CallService.postTerminarSegmento(call_id)
                console.log("--------------------CONEXION PERDIDA-------------------------- ");
                console.log("--------------------CONEXION PERDIDA-------------------------- ");
                console.log("--------------------CONEXION PERDIDA-------------------------- ");
                console.log("--------------------CONEXION PERDIDA-------------------------- ");
                console.log("--------------------CONEXION PERDIDA-------------------------- ");
            }
        };
        pc.onsignalingstatechange = () => {
            console.log("Signaling:", pc.signalingState);
        };

        pc.onicecandidateerror = (e) => {
            console.error("ICE ERROR con texto: ", e.errorText);
        };

        pc.ontrack = (event) => {
            console.log("audio recibido", event.streams[0])
            if (remoteAudioRef.current) {
                remoteAudioRef.current.srcObject = event.streams[0];
                startRemoteLevelMonitor(event.streams[0]);
            }
        };

        localStreamRef.current = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
        });

        startMicLevelMonitor();

        localStreamRef.current.getTracks().forEach((track) => {

            console.log("audio enviado")
            pc.addTrack(track, localStreamRef.current!)
        });

        pcRef.current = pc;
    };



    /* =========================
         Aceptar llamada (callee)
      ==========================*/

    //Esta funcion no se llama en el flujo actual.
    const onReceiveOffer = async (offer: RTCSessionDescriptionInit) => {
        await createPeerConnection();
        if (!pcRef.current) return;

        await pcRef.current!.setRemoteDescription(new RTCSessionDescription(offer));
        for (const candidate of pendingIceCandidates.current) {
            await pcRef.current.addIceCandidate(candidate);
        }
        pendingIceCandidates.current = [];

        //setShowAnswer(true)
    };


    const onReceiveAnswer = async (answer: RTCSessionDescriptionInit) => {
        await pcRef.current!.setRemoteDescription({
            type: "answer",
            sdp: `${answer.sdp!.trim()}\r\n`
        });

        for (const candidate of pendingIceCandidates.current) {
            await pcRef.current!.addIceCandidate(candidate);
            console.log("Se agregan ICE cuando cree la remote desc ", candidate)
        }
        pendingIceCandidates.current = [];
        console.log("Respuesta recibida", answer)
        setStatus("connected");
    };

    /* =========================
       Finalizar llamada
    ==========================*/
    const endCall = () => {
        pcRef.current?.close();
        pcRef.current = null;

        localStreamRef.current?.getTracks().forEach((t) => t.stop());
        localStreamRef.current = null;

        setStatus("ended");
        history.replace('/home')
    };

    const colgar = async () => {
        pcRef.current?.close();
        pcRef.current = null;

        localStreamRef.current?.getTracks().forEach((t) => t.stop());
        localStreamRef.current = null;

        setStatus("ended");
        setShowReconnect(false)

        await CallService.postFinalizar(call_id)
        history.replace('/home')
    }


    const muteMic = () => {
        if (!localStreamRef.current) return;

        localStreamRef.current.getAudioTracks().forEach(track => {
            track.enabled = false;
        });

        setIsMuted(true);
        console.log("Microfono desactivado")
    };

    const unmuteMic = () => {
        if (!localStreamRef.current) return;

        localStreamRef.current.getAudioTracks().forEach(track => {
            track.enabled = true;
        });
        console.log("Microfono activado")

        setIsMuted(false);
    };


    const startMicLevelMonitor = () => {
        if (!localStreamRef.current) return;

        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;

        const source = audioContext.createMediaStreamSource(localStreamRef.current);
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.fftSize);

        const updateLevel = () => {
            analyser.getByteTimeDomainData(dataArray);

            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
                const value = (dataArray[i] - 128) / 128;
                sum += value * value;
            }

            const rms = Math.sqrt(sum / dataArray.length);
            const level = Math.min(25, Math.floor(rms * 120));

            setTransmitterBorder(level);
            requestAnimationFrame(updateLevel);
        };

        updateLevel();
    };

    const startRemoteLevelMonitor = (stream: MediaStream) => {
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;

        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.fftSize);

        const updateLevel = () => {
            analyser.getByteTimeDomainData(dataArray);

            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
                const value = (dataArray[i] - 128) / 128;
                sum += value * value;
            }

            const rms = Math.sqrt(sum / dataArray.length);
            const level = Math.min(25, Math.floor(rms * 120));

            setReceiverBorder(level);
            requestAnimationFrame(updateLevel);
        };

        updateLevel();
    };

    return {
        status,
        currentCall,
        receiverBorder,
        transmitterBorder,
        showStartCall,
        showReconnect,
        isMuted,
        muteMic,
        unmuteMic,
        handleStartCall,
        colgar,
    }

}