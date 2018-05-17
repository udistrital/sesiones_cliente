import { ParticipanteSesionRoutingModule, routedComponents } from './participante_sesion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { SesionesService } from '../../@core/data/sesiones.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudParticipanteSesionComponent } from './crud-participante_sesion/crud-participante_sesion.component';

@NgModule({
  imports: [
    ThemeModule,
    ParticipanteSesionRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    SesionesService,
  ],
  exports: [
    CrudParticipanteSesionComponent,
  ],
})
export class ParticipanteSesionModule { }
