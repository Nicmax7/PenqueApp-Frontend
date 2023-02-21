import { Tipo_Resultado } from "../enums/Tipo_Resultado"

export interface DtPredicciones{
    idPartido: number
    idUsuario: number
    idPenca: number
    tipo: Tipo_Resultado | number
 }