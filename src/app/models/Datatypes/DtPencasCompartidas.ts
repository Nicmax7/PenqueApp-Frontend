import { Tipo_Deporte } from "../enums/Tipo_Deporte"
import { Tipo_Liga } from "../enums/Tipo_Liga"
import { Tipo_Penca } from "../enums/Tipo_Penca"

export interface DtPencasCompartida{
    id: number,
    nombre: string,
    tipoDeporte: Tipo_Deporte,
    entrada: number,
    pozo: number,
    idLiga: number,
    tipo_Liga: Tipo_Liga
    estado: boolean
    fecha_string: string
    tieneAdmin: boolean
    tipoPenca: Tipo_Penca
 }