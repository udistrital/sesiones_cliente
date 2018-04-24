
import { TipoSesion } from './../../../@core/data/models/tipo_sesion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SesionesService } from '../../../@core/data/sesiones.service';
import { FORM_TIPO_SESION } from './form-tipo_sesion';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-tipo-sesion',
  templateUrl: './crud-tipo_sesion.component.html',
  styleUrls: ['./crud-tipo_sesion.component.scss'],
})
export class CrudTipoSesionComponent implements OnInit {
  config: ToasterConfig;
  tipo_sesion_id: number;

  @Input('tipo_sesion_id')
  set name(tipo_sesion_id: number) {
    this.tipo_sesion_id = tipo_sesion_id;
    this.loadTipoSesion();
  }

  @Output() eventChange = new EventEmitter();

  info_tipo_sesion: TipoSesion;
  formTipoSesion: any;
  regTipoSesion: any;
  clean: boolean;

  constructor(private sesionesService: SesionesService, private toasterService: ToasterService) {
    this.formTipoSesion = FORM_TIPO_SESION;
   }


  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoSesion.campos.length; index++) {
      const element = this.formTipoSesion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }


  public loadTipoSesion(): void {
    if (this.tipo_sesion_id !== undefined && this.tipo_sesion_id !== 0) {
      this.sesionesService.get('tipo_sesion/?query=id:' + this.tipo_sesion_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_tipo_sesion = <TipoSesion>res[0];
          }
        });
    } else  {
      this.info_tipo_sesion = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoSesion(tipoSesion: any): void {

    const opt: any = {
      title: 'Update?',
      text: 'Update TipoSesion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_tipo_sesion = <TipoSesion>tipoSesion;
        this.sesionesService.put('tipo_sesion', this.info_tipo_sesion)
          .subscribe(res => {
            this.loadTipoSesion();
            this.eventChange.emit(true);
            this.showToast('info', 'updated', 'TipoSesion updated');
          });
      }
    });
  }

  createTipoSesion(tipoSesion: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create TipoSesion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_tipo_sesion = <TipoSesion>tipoSesion;
        this.sesionesService.post('tipo_sesion', this.info_tipo_sesion)
          .subscribe(res => {
            this.info_tipo_sesion = <TipoSesion>res;
            this.eventChange.emit(true);
            this.showToast('info', 'created', 'TipoSesion created');
          });
      }
    });
  }

  ngOnInit() {
    this.loadTipoSesion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_sesion === undefined) {
        this.createTipoSesion(event.data.TipoSesion);
      } else {
        this.updateTipoSesion(event.data.TipoSesion);
      }
    }
  }

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      // 'toast-top-full-width', 'toast-bottom-full-width', 'toast-top-left', 'toast-top-center'
      positionClass: 'toast-top-center',
      timeout: 5000,  // ms
      newestOnTop: true,
      tapToDismiss: false, // hide on click
      preventDuplicates: true,
      animation: 'slideDown', // 'fade', 'flyLeft', 'flyRight', 'slideDown', 'slideUp'
      limit: 5,
    });
    const toast: Toast = {
      type: type, // 'default', 'info', 'success', 'warning', 'error'
      title: title,
      body: body,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

}
