import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { IClienti, IClienti2 } from '../../Models/interfaces';
import { ClientiService } from '../../services/clienti.service';
import { ModifyClienteDialogComponent } from '../modify-cliente-dialog/modify-cliente-dialog.component';
import { NewClienteDialogComponent } from '../new-cliente-dialog/new-cliente-dialog.component';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit {
  idCliente!: string;
  cliente!: IClienti2 | null;

  clienti!: IClienti[];
  primoClienteOrdineAlfabetico!: IClienti2 | IClienti | null
  idPrimoClienteOrdineAlfabetico!: string;
  ultimoInElenco!: string;


  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private clientiService: ClientiService
  ) {}

  ngOnInit(): void {



    if(this.idCliente == undefined) {
      this.getClienti();

    }

    this.route.params.subscribe(
      (params) => {
        this.idCliente = params['idCliente']
        console.log('CodFid: ' + this.idCliente);

        this.cliente = null;

        if (this.idCliente) {
          this.getDatiCliente();
        }
      },
      (error) => {
        console.log(error);
      }
    );

  }

  getDatiCliente() {
    this.clientiService.getById(this.idCliente).subscribe(
      (response) => {
        console.log('Ricerchiamo il cliente');

        this.cliente = response;
        console.log(this.cliente);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  modifica(id: string) {
    console.log('Modifica cliente: ' + id);

    let dialogRef = this.dialog.open(ModifyClienteDialogComponent, {
      width: '450px',
      //height: '450px',
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('il dialog è stato chiuso', result);
      this.getDatiCliente();
    });
  }

  elimina(id: string) {
    console.log('Elimina cliente: ' + id);
    this.clientiService.delCliente(id);

    window.location.reload();
  }

 //sperimentale

 getClienti(){
   this.clientiService.getAll2().subscribe(
      (response) => {
        this.clienti = response;
        //console.log(this.clienti);
        this.primoClienteOrdineAlfabetico = this.clienti[0];
        this.idPrimoClienteOrdineAlfabetico = this.primoClienteOrdineAlfabetico.id;

        var clientiOrdById = this.clienti.sort((a,b) => (a.id > b.id) ? 1 : -1);
        this.ultimoInElenco = clientiOrdById[clientiOrdById.length - 1].id;
        console.log(this.ultimoInElenco);

        this.getDatiClienteDefault();
      })
 }

 getDatiClienteDefault() {
  this.clientiService.getById( this.ultimoInElenco).subscribe(
    (response) => {
      console.log('Ricerchiamo il cliente');

      this.cliente = response;
      console.log(this.cliente);
    },
    (error) => {
      console.log(error);
    }
  );
}

}


