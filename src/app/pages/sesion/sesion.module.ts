import { SesionRoutingModule, routedComponents } from './sesion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { SesionesService } from '../../@core/data/sesiones.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudSesionComponent } from './crud-sesion/crud-sesion.component';

@NgModule({
  imports: [
    ThemeModule,
    SesionRoutingModule,
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
    CrudSesionComponent,
  ],
})
export class SesionModule { }
