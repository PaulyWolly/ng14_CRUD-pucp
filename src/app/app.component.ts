import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './_services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';
import { AppService } from './_services/app.service';

//  ng-idle libraries
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { ModalInactivityComponent } from './components/modal-inactivity/modal-inactivity.component';
import { ToastrService } from 'ngx-toastr';

// ngx-bootstrap modal handling
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal';
// import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'ng14 CRUD pucp w/inactivity';
  buttonLabel: any;

  idleState = 'Not started.';
  idleState2 = '';
  timedOut = false;
  lastPing?: Date;

  // public modalRef!: BsModalRef;

  // @ViewChild('childModal', { static: false }) childModal!: ModalDirective;

  private numberOfSeconds: number = 240;
  private idleSeconds: number = 240;
  private timeoutSeconds: number = 240;

  // displayedColumns: string[] = ["id", "productName", "category", "date", "freshness", "price", "comment", "action"];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private _idle: Idle,
    private authService: AuthService,
    private router: Router,
    private keepalive: Keepalive,
    private appService: AppService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // this.getAllProducts();
    this._idle.setIdle(this.idleSeconds);
    this._idle.setTimeout(this.timeoutSeconds);
    this._idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this._idle.onIdleStart.subscribe(() => {
      // show the modal
      this.idleState = "You have been idle."
      console.log(this.idleState);
      this.toastr.error("You have been idle!", "Error Message", {
        timeOut: 5000,
      });

    });

    this._idle.onTimeoutWarning.subscribe((secondsLeft: number) => {
      // Update the warning message
      console.log('Logging out in:', secondsLeft);
      this.toastr.info(`Logging out in ${secondsLeft} seconds`);
    });

    this._idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle. Reseting.'
      console.log(this.idleState);
      this.toastr.success('No longer idle. Resetting.');
      this.reset();
    });

    this._idle.onTimeout.subscribe(() => {
      // Hide the modal, log out, do something else
      this.idleState = 'Logging out!'
      console.log(this.idleState);
      this.toastr.error('Logging out!');
      this.logout();
    });

    this.keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this._idle.watch();

  }

  ngAfterViewInit() {
    localStorage.setItem('buttonLabel', '');
    localStorage.setItem('buttonValue', '');
  }

  openDialog(code: string) {
    const popup = this.dialog.open(ModalInactivityComponent, {
      width: '30%',
      data: {
        usercode: code
      }
    });

    popup.afterClosed()
      .subscribe(res => {
      this.reset();
    });
  }

  reset() {
    this._idle.watch();
    this.timedOut = false;
  }

  logout() {
    this.authService.logout();
    window.location.reload();
    this.router.navigate(['login']);
  }

  /** Announce the change in sort state */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
