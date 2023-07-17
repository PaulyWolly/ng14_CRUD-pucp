import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.css']
})
export class NotifierComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  showSuccess() {
    this.toastr.success('Toastr success!')
  }

  showError() {
    this.toastr.error('Toastr error!')
  }

  showWarning() {
    this.toastr.warning('Toastr warning!')
  }

  showInfo() {
    this.toastr.info('Toastr info!')
  }

}
