import { Tipo_Deporte } from "../enums/Tipo_Deporte"

export interface DtLigaEquipo{
    id?: number | null
    nombreLiga?: string | null
    tope?: number | null
    tipoDeporte?: Tipo_Deporte | number
 }