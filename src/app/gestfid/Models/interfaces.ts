import { Data } from "@angular/router";


export interface IClienti {
  id: string;
  nominativo: string;
  comune: string;
  IdAvatar: string;
  stato: number;
  transazioni: Array<ITransazioni>;

}

export interface ITransazioni {
  id: number;
  data: Date;
  puntoVendita: string;
  bollini: number;
}


export interface IClienti2 {
  id: string;
  nominativo: string;
  comune: string;
  IdAvatar: string;
  stato: string;

  bollini: number;
  spese: number;
  //dataSpesa: any
  transazioni: Array<ITransazioni>
}

export interface IStatoCliente{
  value: number;
  viewValue: string;
}
