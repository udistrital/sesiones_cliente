import { Sesion } from './../../../@core/data/models/sesion';

import { RelacionSesiones } from './../../../@core/data/models/relacion_sesiones';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SesionesService } from '../../../@core/data/sesiones.service';
import { FORM_RELACION_SESIONES } from './form-relacion_sesiones';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-relacion-sesiones',
  templateUrl: './crud-relacion_sesiones.component.html',
  styleUrls: ['./crud-relacion_sesiones.component.scss'],
})
export class CrudRelacionSesionesComponent implements OnInit {
  config: ToasterConfig;
  relacion_sesiones_id: number;

  @Input('relacion_sesiones_id')
  set name(relacion_sesiones_id: number) {
    this.relacion_sesiones_id = relacion_sesiones_id;
    this.loadRelacionSesiones();
  }

  @Output() eventChange = new EventEmitter();

  info_relacion_sesiones: RelacionSesiones;
  formRelacionSesiones: any;
  regRelacionSesiones: any;
  clean: boolean;

  constructor(private translate: TranslateService, private sesionesService: SesionesService, private toasterService: ToasterService) {
    this.formRelacionSesiones = FORM_RELACION_SESIONES;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsSesionPadre();
    this.loadOptionsSesionHijo();
   }

  construirForm() {
    this.formRelacionSesiones.titulo = this.translate.instant('GLOBAL.relacion_sesiones');
    this.formRelacionSesiones.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formRelacionSesiones.campos.length; i++) {
      this.formRelacionSesiones.campos[i].label = this.translate.instant('GLOBAL.' + this.formRelacionSesiones.campos[i].label_i18n);
      this.formRelacionSesiones.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formRelacionSesiones.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsSesionPadre(): void {
    let sesionPadre: Array<any> = [];
      this.sesionesService.get('sesion/?limit=0')
        .subscribe(res => {
          if (res !== null) {
            sesionPadre = <Array<Sesion>>res;
          }
          this.formRelacionSesiones.campos[ this.getIndexForm('SesionPadre') ].opciones = sesionPadre;
        });
  }
  loadOptionsSesionHijo(): void {
    let sesionHijo: Array<any> = [];
      this.sesionesService.get('sesion/?limit=0')
        .subscribe(res => {
          if (res !== null) {
            sesionHijo = <Array<Sesion>>res;
          }
          this.formRelacionSesiones.campos[ this.getIndexForm('SesionHijo') ].opciones = sesionHijo;
        });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formRelacionSesiones.campos.length; index++) {
      const element = this.formRelacionSesiones.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }


  public loadRelacionSesiones(): void {
    if (this.relacion_sesiones_id !== undefined && this.relacion_sesiones_id !== 0) {
      this.sesionesService.get('relacion_sesiones/?query=id:' + this.relacion_sesiones_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_relacion_sesiones = <RelacionSesiones>res[0];
          }
        });
    } else  {
      this.info_relacion_sesiones = undefined;
      this.clean = !this.clean;
    }
  }

  updateRelacionSesiones(relacionSesiones: any): void {

    const opt: any = {
      title: 'Update?',
      text: 'Update RelacionSesiones!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_relacion_sesiones = <RelacionSesiones>relacionSesiones;
        this.sesionesService.put('relacion_sesiones', this.info_relacion_sesiones)
          .subscribe(res => {
            this.loadRelacionSesiones();
            this.eventChange.emit(true);
            this.showToast('info', 'updated', 'RelacionSesiones updated');
          });
      }
    });
  }

  createRelacionSesiones(relacionSesiones: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create RelacionSesiones!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_relacion_sesiones = <RelacionSesiones>relacionSesiones;
        this.sesionesService.post('relacion_sesiones', this.info_relacion_sesiones)
          .subscribe(res => {
            this.info_relacion_sesiones = <RelacionSesiones>res;
            this.eventChange.emit(true);
            this.showToast('info', 'created', 'RelacionSesiones created');
          });
      }
    });
  }

  ngOnInit() {
    this.loadRelacionSesiones();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_relacion_sesiones === undefined) {
        this.createRelacionSesiones(event.data.RelacionSesiones);
      } else {
        this.updateRelacionSesiones(event.data.RelacionSesiones);
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
