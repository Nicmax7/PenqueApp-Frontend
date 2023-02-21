import { Tipo_Rol } from "../enums/Tipo_Rol"

export class DtUser{
    id?: number
    nombre?: string | null
    email?: string | null
    billetera?: number
    tipo_rol?: Tipo_Rol    
 }