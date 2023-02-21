import { Tipo_Deporte } from "../enums/Tipo_Deporte"
import { Tipo_Liga } from "../enums/Tipo_Liga"
import { Tipo_Plan } from "../enums/Tipo_Plan"

export interface DtPencaEmpresa{
    id?: number,
    nombre: string,
    tipoDeporte: Tipo_Deporte | number,
    entrada: number,
    premioFinal?: number,
    idLiga: number,
    tipo_Liga?: Tipo_Liga,
    tipoPlan: Tipo_Plan | number,
    idEmpresa: number
 }