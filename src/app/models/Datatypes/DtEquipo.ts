import { Tipo_Deporte } from "../enums/Tipo_Deporte"

export interface DtEquipo{
    id?: string | null
    name?: string | null
    Deporte?: Tipo_Deporte | number 
    Division?: number | null
    Pais?: string | null
 }