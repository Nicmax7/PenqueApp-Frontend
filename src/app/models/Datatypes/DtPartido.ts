import { Tipo_Deporte } from "../enums/Tipo_Deporte"
import { Tipo_Resultado } from "../enums/Tipo_Resultado"

export interface DtPartido{
    id: number,
    fecha?: Date,
    idlocal?: number,
    idvisitante?: number,
    local?: string,
    visitante?: string,
    resultado: Tipo_Resultado,
    deporte?: Tipo_Deporte,
    fecha_string?: string
 }