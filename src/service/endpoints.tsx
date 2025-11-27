export const AUTH_ENDPOINTS = {
    REGISTRO_TAROTISTA: 'api/tarotista/registro',
    COMPLETAR_REGISTRO_TAROTISTA: 'api/tarotista/completar-perfil',
    COMPLETAR_CUENTA_TAROTISTA: 'api/tarotista/completar-cuenta',
    LOGIN_TAROTISTA: 'api/tarotista/login',
};

export const LISTAS_ENDPOINTS = {
    PAISES: 'api/paises',
    ESPECIALIDADES: 'api/especialidades',
    BANCOS: 'api/tarotista/bancos',
};


export const PERFIL_ENDPOINTS  = {
    MI_PERFIL: 'api/tarotista/mi-perfil',
    MI_CUENTA: 'api/tarotista/mi-perfil/cuenta',
    ESTADO_CONEXION: 'api/tarotista/conexion',
    CAMBIAR_ESTADO_CONEXION: 'api/tarotista/conexion/{status}'
};

export const CHAT_ENDPOINTS  = {
    OBTENER_CHATS: 'api/tarotista/chats',
};


export const COMENTARIO_ENDPOINTS  = {
    OBTENER_COMENTARIO: 'api/tarotista/comentarios',
    RESPONDER_COMENTARIO: 'api/tarotista/comentarios/{id}/responder',
    
};
