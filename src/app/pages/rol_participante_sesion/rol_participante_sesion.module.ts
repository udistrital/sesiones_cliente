import { RolParticipanteSesionRoutingModule, routedComponents } from './rol_participante_sesion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { SesionesService } from '../../@core/data/sesiones.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudRolParticipanteSesionComponent } from './crud-rol_participante_sesion/crud-rol_participante_sesion.component';

@NgModule({
  imports: [
    ThemeModule,
    RolParticipanteSesionRoutingModule,
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
    CrudRolParticipanteSesionComponent,
  ],
})
export class RolParticipanteSesionModule { }
