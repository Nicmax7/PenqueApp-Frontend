import { Tipo_Rol } from "../enums/Tipo_Rol"

export interface DtEmpresa{
    id?: string | null
    name?: string | null
    billetera?: number | null
    password?: string | null
    email?: string | null
    tipo_rol?: Tipo_Rol | null

 }