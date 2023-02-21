import { Tipo_Rol } from "../enums/Tipo_Rol"

export interface DtMensaje{
    id?: number | null
    mensaje: string 
    rol: Tipo_Rol
 }