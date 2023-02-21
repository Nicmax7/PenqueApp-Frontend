import { Tipo_Area } from "../enums/Tipo_Area"

export interface DtCompetencia{
    id?: number
    area?: Tipo_Area | number
    fecha_competencia?: Date
    nombre?: string | null
    topeParticipantes?: number | null
    estado?: boolean | null
    fecha_string?: string
 }