import { Tipo_Area } from "../enums/Tipo_Area"

export interface DtParticipante{
    id?: number | null
    nombre?: string | null
    Area?: Tipo_Area | number

 }