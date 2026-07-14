import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  verifyForm!: FormGroup;
  resetForm!: FormGroup;
  step: 'verify' | 'reset' = 'verify';
  verifiedUser: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.verifyForm = this.formBuilder.group({
      id: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  verifyIdentity(): void {
    if (!this.verifyForm.valid) {
      this.toastr.warning('Please enter a valid username and email.');
      return;
    }

    const { id, email } = this.verifyForm.value;

    this.service.GetUserbyCode(id).subscribe({
      next: (user: any) => {
        if (!user || !user.id) {
          this.toastr.error('No account found for that username.');
          return;
        }

        if ((user.email || '').toLowerCase() !== email.toLowerCase()) {
          this.toastr.error('Username and email do not match.');
          return;
        }

        this.verifiedUser = user;
        this.step = 'reset';
        this.toastr.success('Identity verified. Enter a new password.');
      },
      error: () => {
        this.toastr.error('No account found for that username.');
      }
    });
  }

  resetPassword(): void {
    if (!this.resetForm.valid) {
      this.toastr.warning('Please enter a valid new password.');
      return;
    }

    const { password, confirmPassword } = this.resetForm.value;
    if (password !== confirmPassword) {
      this.toastr.error('Passwords do not match.');
      return;
    }

    if (!this.verifiedUser) {
      this.toastr.error('Please verify your identity first.');
      this.step = 'verify';
      return;
    }

    const updatedUser = { ...this.verifiedUser, password };

    this.service.updateuser(this.verifiedUser.id, updatedUser).subscribe({
      next: () => {
        this.toastr.success('Password updated. You can log in now.');
        this.router.navigate(['login']);
      },
      error: () => {
        this.toastr.error('Could not update password. Please try again.');
      }
    });
  }
}
