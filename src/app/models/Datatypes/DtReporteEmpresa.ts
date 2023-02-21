import { DtPenca } from "./DtPenca";

export class DtReporteEmpresa{
    
    numeroDeUsuarios?: number | null
    numeroDePencas?: number | null
    premiosRepartidos?: number | null
    pencasActivas?: number | null
    pencasPremium?: number | null
    pencasIndividuales?: number | null
    pencasDeEquipo?: number | null
    mensajesEnForos?: number
    pencas?: [DtPenca]
 }