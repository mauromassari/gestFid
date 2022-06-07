import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClienti, IClienti2, ITransazioni } from '../Models/interfaces';
import { baseUrl } from '../app.constants';
import { catchError, delay, map, retry, retryWhen, take } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientiService {

  baseUrl: any;

  private _clienti!: BehaviorSubject<IClienti[]>;

  private dataStore!: {
    clienti: IClienti[];
  }


  constructor(private httpClient: HttpClient) {
    this.dataStore = { clienti: [] };
    this._clienti = new BehaviorSubject<IClienti[]>([])

  }

  getAll(){
    const Url = `${baseUrl}/clienti/?_sort=nominativo&_order=asc`;
    return this.httpClient.get<IClienti[]>(Url)
    .pipe(
      retryWhen(errors => errors.pipe(delay(2000), take(3))),
      // prova 3 volte a recuperare i dati dal backend con un intervallo di 2 secondi uno dall'altro

      //retry(3)) //prova 3 volte a recuperare i dati dal backend

      //filtri a cascata
      //map(data => data.filter(a => a.comune === 'Madrid')), // filtra e dammi solo quelli che hanno come comune Madrid
      //map(data => data.filter(a => a.nominativo.includes('Ernesto'))),//filtra e dammi solo quelli che hanno come nominativo Ernesto
      //map(data => data.filter(a => a.transazioni.length < 10)) //filtra e dammi solo quelli che hanno meno di 10 transazioni
      )
    .subscribe(data => {
      this.dataStore.clienti = data;
      console.log(data);
      this._clienti.next(Object.assign({}, this.dataStore).clienti); //riverso i dati al BehaviorSubject
    })
  }

  get clienti(): Observable<IClienti[]> { //riceviamo aggiornamenti in tempo reale dal BehaviorSubject
    return this._clienti.asObservable();
  }

  /*
  getByCodFid(codFid: string){
    const Url = `${baseUrl}/clienti/${codFid}`;
    return this.httpClient.get<IClienti>(Url)
  }
 */


  getById(id: string){
    const Url = `${baseUrl}/clienti/`;
    return this.httpClient.get<IClienti>(Url +  id)
      .pipe(map(data => this.convertDataClienti(data)));
  }

  getById2(id: string){
    const Url = `${baseUrl}/clienti/`;
    return this.httpClient.get<IClienti>(Url +  id);
  }

  getAll2(){
    const Url = `${baseUrl}/clienti/?_sort=nominativo&_order=asc`;
    return this.httpClient.get<IClienti[]>(Url)
    .pipe(
      retryWhen(errors => errors.pipe(delay(2000), take(3))))
  }



  private convertDataClienti(data: IClienti):IClienti2 {
    return {
      id: data.id,
      nominativo: data.nominativo,
      comune: data.comune,
      IdAvatar: data.IdAvatar,
      stato: (data.stato > 0) ? 'Attivo' : 'Non Attivo',

      bollini: (data.transazioni.length > 0) ? data.transazioni.map(a => a.bollini).reduce((a,b)=>a+b) : 0,
      spese: (data.transazioni.length > 0) ? data.transazioni.length : 0,

      /*dataSpesa: (data.transazioni.length > 0) ? new Date(Math.max.apply(null, data.transazioni.map(function(e) {
        return new Date(e.data);}))) : new Date('1900-01-01')*/

      /*dataSpesa: data.transazioni.map(a =>
        console.log(a.data))*/

        transazioni: data.transazioni


    }
  }

  insCliente(cliente: IClienti | null){
    const Url = `${baseUrl}/clienti/`;
    this.httpClient.post<IClienti>(Url, cliente)
    .subscribe(
      response => {
        console.log(response);
        //this.dataStore.clienti.push(cliente);
        //this._clienti.next(Object.assign({}, this.dataStore).clienti);
      },
      error => {
        cliente = null;
        console.log(error);
      }
    )

    return new Promise ((resolver, reject) => {
      if(cliente != null){
        //var removeIndex = this.dataStore.clienti.map(item => item.id).indexOf(cliente.id);
        //~removeIndex && this.dataStore.clienti.splice(removeIndex, 1);

        this.dataStore.clienti.push(cliente);
        this.dataStore.clienti.sort((a,b) => (a.nominativo > b.nominativo) ? 1 : -1);
        this._clienti.next(Object.assign({}, this.dataStore).clienti);
      }
      resolver(cliente);
  })}


  modCliente(cliente: IClienti | null, idCli: string){
    const Url = `${baseUrl}/clienti/${idCli}`;
    this.httpClient.put<IClienti>(Url, cliente)
    .subscribe(
      response => {
        console.log(response);
        //this.dataStore.clienti.push(cliente);
        //this._clienti.next(Object.assign({}, this.dataStore).clienti);
      },
      error => {
        cliente = null;
        console.log(error);
      }
    )

    return new Promise ((resolver, reject) => {
      if(cliente != null){
        //var removeIndex = this.dataStore.clienti.map(item => item.id).indexOf(cliente.id);
        //~removeIndex && this.dataStore.clienti.splice(removeIndex, 1);

        this.dataStore.clienti.push(cliente);
        this.dataStore.clienti.sort((a,b) => (a.nominativo > b.nominativo) ? 1 : -1);
        this._clienti.next(Object.assign({}, this.dataStore).clienti);
      }
      resolver(cliente);
  })}

  delCliente(id: string){
    const Url = `${baseUrl}/clienti/`;
    this.httpClient.delete<IClienti>(Url + id)
    .pipe(catchError(this.handleError))
    .subscribe(
      response => {
        console.log(response);
        this.getAll();
      })
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Errore sconosciuto';
    console.log(error.message);
    window.alert(errorMessage);
    return throwError('Error! something went wrong.');
  }

}
