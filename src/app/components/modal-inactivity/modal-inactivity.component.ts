import { Component, OnInit, ViewChild } from '@angular/core';

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

  // public modalRef!: BsModalRef;

  // @ViewChild('childModal', { static: false }) childModal!: ModalDirective;

  constructor() { }

  ngOnInit(): void {
  }

  hideModal() {

  }

}
