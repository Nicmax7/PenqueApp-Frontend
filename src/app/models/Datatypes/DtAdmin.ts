import { Tipo_Rol } from "../enums/Tipo_Rol"

export class DtAdmin{
    name?: string | null
    email?: string | null
    password?: string | null
    billetera?: number
    id?: number 
    tipo_Rol?: Tipo_Rol
 }