import { Sesion } from './../../../@core/data/models/sesion';
import { RolParticipanteSesion } from './../../../@core/data/models/rol_participante_sesion';

import { ParticipanteSesion } from './../../../@core/data/models/participante_sesion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SesionesService } from '../../../@core/data/sesiones.service';
import { FORM_PARTICIPANTE_SESION } from './form-participante_sesion';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-participante-sesion',
  templateUrl: './crud-participante_sesion.component.html',
  styleUrls: ['./crud-participante_sesion.component.scss'],
})
export class CrudParticipanteSesionComponent implements OnInit {
  config: ToasterConfig;
  participante_sesion_id: number;

  @Input('participante_sesion_id')
  set name(participante_sesion_id: number) {
    this.participante_sesion_id = participante_sesion_id;
    this.loadParticipanteSesion();
  }

  @Output() eventChange = new EventEmitter();

  info_participante_sesion: ParticipanteSesion;
  formParticipanteSesion: any;
  regParticipanteSesion: any;
  clean: boolean;

  constructor(private sesionesService: SesionesService, private toasterService: ToasterService) {
    this.formParticipanteSesion = FORM_PARTICIPANTE_SESION;
    this.loadOptionsSesion();
    this.loadOptionsRolParticipanteSesion();
   }

  loadOptionsSesion(): void {
    let sesion: Array<any> = [];
      this.sesionesService.get('sesion/?limit=0')
        .subscribe(res => {
          if (res !== null) {
            sesion = <Array<Sesion>>res;
          }
          this.formParticipanteSesion.campos[ this.getIndexForm('Sesion') ].opciones = sesion;
        });
  }
  loadOptionsRolParticipanteSesion(): void {
    let rolParticipanteSesion: Array<any> = [];
      this.sesionesService.get('rol_participante_sesion/?limit=0')
        .subscribe(res => {
          if (res !== null) {
            rolParticipanteSesion = <Array<RolParticipanteSesion>>res;
          }
          this.formParticipanteSesion.campos[ this.getIndexForm('RolParticipanteSesion') ].opciones = rolParticipanteSesion;
        });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formParticipanteSesion.campos.length; index++) {
      const element = this.formParticipanteSesion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }


  public loadParticipanteSesion(): void {
    if (this.participante_sesion_id !== undefined && this.participante_sesion_id !== 0) {
      this.sesionesService.get('participante_sesion/?query=id:' + this.participante_sesion_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_participante_sesion = <ParticipanteSesion>res[0];
          }
        });
    } else  {
      this.info_participante_sesion = undefined;
      this.clean = !this.clean;
    }
  }

  updateParticipanteSesion(participanteSesion: any): void {

    const opt: any = {
      title: 'Update?',
      text: 'Update ParticipanteSesion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_participante_sesion = <ParticipanteSesion>participanteSesion;
        this.sesionesService.put('participante_sesion', this.info_participante_sesion)
          .subscribe(res => {
            this.loadParticipanteSesion();
            this.eventChange.emit(true);
            this.showToast('info', 'updated', 'ParticipanteSesion updated');
          });
      }
    });
  }

  createParticipanteSesion(participanteSesion: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create ParticipanteSesion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_participante_sesion = <ParticipanteSesion>participanteSesion;
        this.sesionesService.post('participante_sesion', this.info_participante_sesion)
          .subscribe(res => {
            this.info_participante_sesion = <ParticipanteSesion>res;
            this.eventChange.emit(true);
            this.showToast('info', 'created', 'ParticipanteSesion created');
          });
      }
    });
  }

  ngOnInit() {
    this.loadParticipanteSesion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_participante_sesion === undefined) {
        this.createParticipanteSesion(event.data.ParticipanteSesion);
      } else {
        this.updateParticipanteSesion(event.data.ParticipanteSesion);
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
