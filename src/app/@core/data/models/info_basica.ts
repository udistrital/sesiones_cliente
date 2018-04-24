
import { TipoSesion } from './tipo_sesion';
import { Sesion } from './sesion';

export class InfoBasica {
  Id: Array<number>;
  Nombre: Array<string>;
  Descripcion: string;
  CodigoAbreviacion: string;
  TipoSesion: Array<TipoSesion>;
  Sesion: Sesion;
}
