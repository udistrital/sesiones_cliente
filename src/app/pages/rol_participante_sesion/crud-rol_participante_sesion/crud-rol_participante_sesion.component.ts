
import { RolParticipanteSesion } from './../../../@core/data/models/rol_participante_sesion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SesionesService } from '../../../@core/data/sesiones.service';
import { FORM_ROL_PARTICIPANTE_SESION } from './form-rol_participante_sesion';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-rol-participante-sesion',
  templateUrl: './crud-rol_participante_sesion.component.html',
  styleUrls: ['./crud-rol_participante_sesion.component.scss'],
})
export class CrudRolParticipanteSesionComponent implements OnInit {
  config: ToasterConfig;
  rol_participante_sesion_id: number;

  @Input('rol_participante_sesion_id')
  set name(rol_participante_sesion_id: number) {
    this.rol_participante_sesion_id = rol_participante_sesion_id;
    this.loadRolParticipanteSesion();
  }

  @Output() eventChange = new EventEmitter();

  info_rol_participante_sesion: RolParticipanteSesion;
  formRolParticipanteSesion: any;
  regRolParticipanteSesion: any;
  clean: boolean;

  constructor(private translate: TranslateService, private sesionesService: SesionesService, private toasterService: ToasterService) {
    this.formRolParticipanteSesion = FORM_ROL_PARTICIPANTE_SESION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
   }

  construirForm() {
    this.formRolParticipanteSesion.titulo = this.translate.instant('GLOBAL.rol_participante_sesion');
    this.formRolParticipanteSesion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formRolParticipanteSesion.campos.length; i++) {
      this.formRolParticipanteSesion.campos[i].label = this.translate.instant('GLOBAL.' + this.formRolParticipanteSesion.campos[i].label_i18n);
      this.formRolParticipanteSesion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
      this.formRolParticipanteSesion.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }


  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formRolParticipanteSesion.campos.length; index++) {
      const element = this.formRolParticipanteSesion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }


  public loadRolParticipanteSesion(): void {
    if (this.rol_participante_sesion_id !== undefined && this.rol_participante_sesion_id !== 0) {
      this.sesionesService.get('rol_participante_sesion/?query=id:' + this.rol_participante_sesion_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_rol_participante_sesion = <RolParticipanteSesion>res[0];
          }
        });
    } else  {
      this.info_rol_participante_sesion = undefined;
      this.clean = !this.clean;
    }
  }

  updateRolParticipanteSesion(rolParticipanteSesion: any): void {

    const opt: any = {
      title: 'Update?',
      text: 'Update RolParticipanteSesion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_rol_participante_sesion = <RolParticipanteSesion>rolParticipanteSesion;
        this.sesionesService.put('rol_participante_sesion', this.info_rol_participante_sesion)
          .subscribe(res => {
            this.loadRolParticipanteSesion();
            this.eventChange.emit(true);
            this.showToast('info', 'updated', 'RolParticipanteSesion updated');
          });
      }
    });
  }

  createRolParticipanteSesion(rolParticipanteSesion: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create RolParticipanteSesion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_rol_participante_sesion = <RolParticipanteSesion>rolParticipanteSesion;
        this.sesionesService.post('rol_participante_sesion', this.info_rol_participante_sesion)
          .subscribe(res => {
            this.info_rol_participante_sesion = <RolParticipanteSesion>res;
            this.eventChange.emit(true);
            this.showToast('info', 'created', 'RolParticipanteSesion created');
          });
      }
    });
  }

  ngOnInit() {
    this.loadRolParticipanteSesion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_rol_participante_sesion === undefined) {
        this.createRolParticipanteSesion(event.data.RolParticipanteSesion);
      } else {
        this.updateRolParticipanteSesion(event.data.RolParticipanteSesion);
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
