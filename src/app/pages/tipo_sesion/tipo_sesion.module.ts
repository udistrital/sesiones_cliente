import { TipoSesionRoutingModule, routedComponents } from './tipo_sesion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { SesionesService } from '../../@core/data/sesiones.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTipoSesionComponent } from './crud-tipo_sesion/crud-tipo_sesion.component';

@NgModule({
  imports: [
    ThemeModule,
    TipoSesionRoutingModule,
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
    CrudTipoSesionComponent,
  ],
})
export class TipoSesionModule { }
