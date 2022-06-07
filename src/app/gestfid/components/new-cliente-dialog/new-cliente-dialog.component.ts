import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { IClienti, IStatoCliente } from '../../Models/interfaces';
import { ClientiService } from '../../services/clienti.service';

@Component({
  selector: 'app-new-cliente-dialog',
  templateUrl: './new-cliente-dialog.component.html',
  styleUrls: ['./new-cliente-dialog.component.scss'],
})
export class NewClienteDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<NewClienteDialogComponent>,
    private clientiService: ClientiService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}



  cliente: IClienti = {
    id: '',
    nominativo: '',
    comune: '',
    IdAvatar: '',
    stato: 0,
    transazioni: [],
  };

  avatars = [
    'svg-1',
    'svg-2',
    'svg-3',
    'svg-4',
    'svg-5',
    'svg-6',
    'svg-7',
    'svg-8',
    'svg-9',
    'svg-10',
    'svg-11',
    'svg-12',
    'svg-13',
    'svg-14',
    'svg-15',
    'svg-16',
  ];

  statoCliente: IStatoCliente[] =
  [
    {value: 0, viewValue: 'Non attivo'},
    {value: 1, viewValue: 'Attivo'},
  ]

  ngDetroy$ = new Subject();

  nome = new FormControl('', [
    Validators.required,
    Validators.maxLength(50),
    Validators.minLength(6),
  ]);

  stato = new FormControl(1);



  getErrorMessage() {
    if (this.nome.hasError('maxlength')) {
      return 'Il nominativo deve essere al massimo 50 caratteri!';
    }

    if (this.nome.hasError('minlength')) {
      return 'Il nominativo deve essere almeno 6 caratteri!';
    }

    return this.nome.hasError('required') ? 'Devi inserire un nominativo!' : '';
  }

  ngOnInit(): void {
    if(this.data){
      console.log(this.data.id);

      this.clientiService.getById2(this.data.id)
      .pipe(takeUntil(this.ngDetroy$))
      .subscribe(
        response => {
          this.cliente = response;
          this.nome.setValue(this.cliente.nominativo);
          this.stato.setValue(this.cliente.stato);
          console.log(this.cliente);
        },
        error => {
          console.log(error);
        });
    }
  }

  dismiss() {
    this.dialogRef.close(null);
  }

  save() {
    this.cliente.nominativo = this.nome.value;
    this.cliente.stato = this.stato.value;

    console.log(this.cliente.id)

    this.dialogRef.close(this.clientiService.insCliente(this.cliente));

    //window.location.reload();

    /*
    this.clientiService.insCliente(this.cliente).subscribe(
      response => {
        console.log(response);
        this.dialogRef.close(this.cliente);
      },
      error => {
        console.log(error);
      });*/
  }

  ngOnDestroy(): void {
    this.ngDetroy$.next(true);
    this.ngDetroy$.complete();

  }
}
