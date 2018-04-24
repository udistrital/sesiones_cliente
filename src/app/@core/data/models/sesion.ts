
import { TipoSesion } from './tipo_sesion';

export class Sesion {
  Id: number;
  Descripcion: string;
  FechaCreacion: Date;
  FechaModificacion: Date;
  FechaInicio: Date;
  FechaFin: Date;
  Periodo: number;
  Recurrente: boolean;
  NumeroRecurrencias: number;
  TipoSesion: TipoSesion;
}
