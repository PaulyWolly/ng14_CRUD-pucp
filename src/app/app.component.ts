import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AuthService } from './_services/auth.service';
import { ApiService } from './_services/api.service';
import { AppService } from './_services/app.service';

import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { ModalInactivityComponent } from './components/modal-inactivity/modal-inactivity.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'ng14 CRUD pucp w/inactivity';
  buttonLabel: any;

  idleState = 'Not started.';
  idleState2 = '';
  timedOut = false;
  lastPing?: Date;

  private numberOfSeconds: number = 240;
  private idleSeconds: number = 240;
  private timeoutSeconds: number = 240;
  private routerSub?: Subscription;

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
    this._idle.setIdle(this.idleSeconds);
    this._idle.setTimeout(this.timeoutSeconds);
    this._idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this._idle.onIdleStart.subscribe(() => {
      if (!this.authService.isloggedin()) {
        return;
      }
      this.idleState = 'You have been idle.';
      console.log(this.idleState);
      this.toastr.error('You have been idle!', 'Error Message', {
        timeOut: 5000,
      });
    });

    this._idle.onTimeoutWarning.subscribe((secondsLeft: number) => {
      if (!this.authService.isloggedin()) {
        return;
      }
      console.log('Logging out in:', secondsLeft);
      this.toastr.info(`Logging out in ${secondsLeft} seconds`);
    });

    this._idle.onIdleEnd.subscribe(() => {
      if (!this.authService.isloggedin()) {
        return;
      }
      this.idleState = 'No longer idle. Resetting.';
      console.log(this.idleState);
      this.toastr.success('No longer idle. Resetting.');
      this.reset();
    });

    this._idle.onTimeout.subscribe(() => {
      if (!this.authService.isloggedin()) {
        this.stopIdleWatch();
        return;
      }
      this.idleState = 'Logging out!';
      console.log(this.idleState);
      this.toastr.error('Logging out!');
      this.logout();
    });

    this.keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.syncIdleWatch();
    this.routerSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.syncIdleWatch());
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
    this.stopIdleWatch();
  }

  ngAfterViewInit() {
    localStorage.setItem('buttonLabel', '');
    localStorage.setItem('buttonValue', '');
  }

  /** Only watch for inactivity when a user is logged in. */
  syncIdleWatch(): void {
    if (this.authService.isloggedin()) {
      this.reset();
    } else {
      this.stopIdleWatch();
    }
  }

  stopIdleWatch(): void {
    this._idle.stop();
    this.timedOut = false;
    this.idleState = 'Not started.';
  }

  openDialog(code: string) {
    const popup = this.dialog.open(ModalInactivityComponent, {
      width: '30%',
      data: {
        usercode: code
      }
    });

    popup.afterClosed()
      .subscribe(() => {
        this.reset();
      });
  }

  reset() {
    if (!this.authService.isloggedin()) {
      this.stopIdleWatch();
      return;
    }
    this._idle.watch();
    this.timedOut = false;
  }

  logout() {
    this.stopIdleWatch();
    this.authService.logout();
    window.location.reload();
    this.router.navigate(['login']);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
