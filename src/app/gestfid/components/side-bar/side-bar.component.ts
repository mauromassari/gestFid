import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild, Output } from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import { IClienti } from '../../Models/interfaces';
import { ClientiService } from '../../services/clienti.service';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  //clienti!: IClienti[];
  clienti!: Observable<IClienti[]>;

  public isScreenSmall!: boolean;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private clientiService: ClientiService,
    private router: Router
  ) {}

  // fa riferimenteo al Mat-Drawer nell'HTML
  @ViewChild(MatDrawer) drawer! : MatDrawer;

  ngOnInit(): void {
    this.breakpointObserver
      //.observe([Breakpoints.XSmall, Breakpoints.Small])
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        console.log(state.matches);
        this.isScreenSmall = state.matches;
      });

    this.getClienti();

    this.router.events.subscribe(() => {
      if(this.isScreenSmall){
        this.drawer.close();
      }});
  }

  public getClienti() {
    this.clienti = this.clientiService.clienti;
    this.clientiService.getAll();


    /*this.clientiService.getAll().subscribe(
      (response) => {
        console.log('Ricerchiamo tutti i clienti');

        this.clienti = response;
        console.log(this.clienti);

        if(this.clienti.length > 0) {
          this.router.navigate(['/gestfid', this.clienti[0].id]);
        }
      },
      (error) => {
        console.log(error);
      }
    );*/
  }
}
