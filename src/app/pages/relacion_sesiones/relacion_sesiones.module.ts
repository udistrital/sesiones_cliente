import { RelacionSesionesRoutingModule, routedComponents } from './relacion_sesiones-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { SesionesService } from '../../@core/data/sesiones.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudRelacionSesionesComponent } from './crud-relacion_sesiones/crud-relacion_sesiones.component';

@NgModule({
  imports: [
    ThemeModule,
    RelacionSesionesRoutingModule,
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
    CrudRelacionSesionesComponent,
  ],
})
export class RelacionSesionesModule { }
