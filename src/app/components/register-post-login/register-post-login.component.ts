import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-register-post-login',
  templateUrl: './register-post-login.component.html',
  styleUrls: ['./register-post-login.component.css']
})
export class RegisterPostLoginComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      id: this.formBuilder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
      name: this.formBuilder.control('', Validators.required),
      // password: this.formBuilder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
      password: this.formBuilder.control('', Validators.compose([Validators.required])),
      email: this.formBuilder.control('', Validators.compose([Validators.required, Validators.email])),
      gender: this.formBuilder.control('male'),
      role: this.formBuilder.control(''),
      isactive: this.formBuilder.control(false)
    });
  }

  goBack() {
    history.back();
  }


  proceedregister() {
    if (this.registerForm.valid) {
      this.service.RegisterUser(this.registerForm.value).subscribe(result => {
        this.toastr.success('Please contact admin to enable access.','Registered successfully')
        this.router.navigate(['login'])
      });
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }

}
