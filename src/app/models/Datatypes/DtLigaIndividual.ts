import { Tipo_Area } from "../enums/Tipo_Area"

export interface DtLigaIndividual{
    id?: number | null
    nombre?: string | null
    topeCompetencias?: number | null
    tipoArea?: Tipo_Area | number
 }