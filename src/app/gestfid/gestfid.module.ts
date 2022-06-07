import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestfidAppComponent } from './gestfid-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';

import { RouterModule, Routes} from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClientiService } from './services/clienti.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SalesComponent } from './components/sales/sales.component';
import { NewClienteDialogComponent } from './components/new-cliente-dialog/new-cliente-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CacheInterceptorService } from './services/cache-interceptor.service';
import { ModifyClienteDialogComponent } from './components/modify-cliente-dialog/modify-cliente-dialog.component';

const routes: Routes = [
  { path: '', component: GestfidAppComponent,
    children: [
      { path: '', component: MainContentComponent},
      { path: ':idCliente', component: MainContentComponent}
    ]},
  { path: '**', redirectTo: ''}
];



@NgModule({
  declarations: [
    GestfidAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SideBarComponent,
    SalesComponent,
    NewClienteDialogComponent,
    ModifyClienteDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    ClientiService,
    {provide: HTTP_INTERCEPTORS, useClass: CacheInterceptorService, multi: true}
  ]
})
export class GestfidModule { }
