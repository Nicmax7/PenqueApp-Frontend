import { Tipo_Deporte } from "../enums/Tipo_Deporte"
import { Tipo_Resultado } from "../enums/Tipo_Resultado"

export interface DtPartidoCreacion{
    id: number,
    fecha?: Date,
    idlocal?: number,
    idvisitante?: number,
    local?: string,
    visitante?: string,
    resultado: Tipo_Resultado | number,
    deporte?: Tipo_Deporte | number
 }