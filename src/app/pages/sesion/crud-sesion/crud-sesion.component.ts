import { TipoSesion } from './../../../@core/data/models/tipo_sesion';

import { Sesion } from './../../../@core/data/models/sesion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SesionesService } from '../../../@core/data/sesiones.service';
import { FORM_SESION } from './form-sesion';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-sesion',
  templateUrl: './crud-sesion.component.html',
  styleUrls: ['./crud-sesion.component.scss'],
})
export class CrudSesionComponent implements OnInit {
  config: ToasterConfig;
  sesion_id: number;

  @Input('sesion_id')
  set name(sesion_id: number) {
    this.sesion_id = sesion_id;
    this.loadSesion();
  }

  @Output() eventChange = new EventEmitter();

  info_sesion: Sesion;
  formSesion: any;
  regSesion: any;
  clean: boolean;

  constructor(private translate: TranslateService, private sesionesService: SesionesService, private toasterService: ToasterService) {
    this.formSesion = FORM_SESION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsTipoSesion();
   }

  construirForm() {
    this.formSesion.titulo = this.translate.instant('GLOBAL.sesion');
    this.formSesion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formSesion.campos.length; i++) {
      this.formSesion.campos[i].label = this.translate.instant('GLOBAL.' + this.formSesion.campos[i].label_i18n);
      this.formSesion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formSesion.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsTipoSesion(): void {
    let tipoSesion: Array<any> = [];
      this.sesionesService.get('tipo_sesion/?limit=0')
        .subscribe(res => {
          if (res !== null) {
            tipoSesion = <Array<TipoSesion>>res;
          }
          this.formSesion.campos[ this.getIndexForm('TipoSesion') ].opciones = tipoSesion;
        });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formSesion.campos.length; index++) {
      const element = this.formSesion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }


  public loadSesion(): void {
    if (this.sesion_id !== undefined && this.sesion_id !== 0) {
      this.sesionesService.get('sesion/?query=id:' + this.sesion_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_sesion = <Sesion>res[0];
          }
        });
    } else  {
      this.info_sesion = undefined;
      this.clean = !this.clean;
    }
  }

  updateSesion(sesion: any): void {

    const opt: any = {
      title: 'Update?',
      text: 'Update Sesion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_sesion = <Sesion>sesion;
        this.sesionesService.put('sesion', this.info_sesion)
          .subscribe(res => {
            this.loadSesion();
            this.eventChange.emit(true);
            this.showToast('info', 'updated', 'Sesion updated');
          });
      }
    });
  }

  createSesion(sesion: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create Sesion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_sesion = <Sesion>sesion;
        this.sesionesService.post('sesion', this.info_sesion)
          .subscribe(res => {
            this.info_sesion = <Sesion>res;
            this.eventChange.emit(true);
            this.showToast('info', 'created', 'Sesion created');
          });
      }
    });
  }

  ngOnInit() {
    this.loadSesion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_sesion === undefined) {
        this.createSesion(event.data.Sesion);
      } else {
        this.updateSesion(event.data.Sesion);
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
