import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//importo il modulo Material
import { MaterialModule } from './shared/material.module';

//importo il modulo di routing
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  { path: 'demo', loadChildren:() => import('./demo/demo.module').then(m => m.DemoModule) },
  { path: 'gestfid', loadChildren:() => import('./gestfid/gestfid.module').then(m => m.GestfidModule) },

  //qualsiasi altro path viene reindirizzato alla pagina demo
  { path: '**', redirectTo: 'gestfid'},
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    //importo il modulo MaterialModule
    MaterialModule,

    //importo il modulo per le rotte
    RouterModule.forRoot(routes),

    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
