import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../_services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform!: FormGroup;
  result: any;
  isLoggedIn = false;

  private numberOfSeconds: number = 30;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {
      sessionStorage.clear();
  }

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      id: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.checkIsLoggedIn();

  }

  checkIsLoggedIn() {

    // this.hideButton();

    const username = sessionStorage.getItem('username');
    if (username) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }


  proceedlogin() {

    this.isLoggedIn = true;

    if (this.loginform.valid) {
      this.service.GetUserbyCode(this.loginform.value.id).subscribe(item => {
        this.result = item;
        if (this.result.password === this.loginform.value.password) {
          if (this.result.isactive) {
            sessionStorage.setItem('username',this.result.id);
            sessionStorage.setItem('role',this.result.role);
            this.router.navigate(['loggedIn']);
            this.checkIsLoggedIn();
          } else {
            this.toastr.error('Please contact Admin', 'InActive User');
          }
        } else {
          this.toastr.error('Invalid credentials');
        }
      });
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }
}
