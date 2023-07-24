import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

// ngx-bootstrap modal handling
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal';
// import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-modal-inactivity',
  templateUrl: './modal-inactivity.component.html',
  styleUrls: ['./modal-inactivity.component.scss']
})
export class ModalInactivityComponent implements OnInit {

  idleState = 'Not started.';
  idleState2 = '';
  timedOut = false;
  // lastPing?: Date = null;
  title = 'angular-idle-timeout';

  private dialogref!: MatDialogRef<ModalInactivityComponent>
  @Inject(MAT_DIALOG_DATA) public data: any


  // @ViewChild('childModal', { static: false }) childModal!: ModalDirective;

  constructor(
    private router: Router,

  ) { }

  ngOnInit(): void {
  }

  hideModal() {

  }

  // stay() {
  //   this.childModal.hide();
  //   this.reset();
  // }

  logout() {
    // this.childModal.hide();
    // this.appService.setUserLoggedIn(false);
    // this.router.navigate(['/']);
  }

}
