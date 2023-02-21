import { Tipo_Deporte } from "../enums/Tipo_Deporte"
import { Tipo_Liga } from "../enums/Tipo_Liga"

export interface DtCrearPencasCompartida{
    id?: number,
    nombre: string | null,
    tipoDeporte: Tipo_Deporte | number,
    entrada: number | null,
    pozo?: number,
    idLiga: number,
    tipo_Liga?: Tipo_Liga
    estado?: boolean
 }