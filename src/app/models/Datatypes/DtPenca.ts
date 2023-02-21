import { Tipo_Deporte } from "../enums/Tipo_Deporte"
import { Tipo_Liga } from "../enums/Tipo_Liga"
import { Tipo_Penca } from "../enums/Tipo_Penca"

export interface DtPenca{
    id: number
    nombre?: string
    fecha_Creacion?: Date
    tipo_Deporte: Tipo_Deporte
    tipo_Liga?: Tipo_Liga
    entrada?: number
    pozo?: number
    estado?: boolean
    color?: string
    tipoPenca?: Tipo_Penca | number
    fecha_string?: string
    tieneAdmin?: boolean

 }