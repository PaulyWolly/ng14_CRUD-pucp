import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../_services/api.service';

import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { DataService } from 'src/app/_services/data.service';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';


@Component({
  selector: 'app-header-button',
  templateUrl: './header-button.component.html',
  styleUrls: ['./header-button.component.scss']
})
export class HeaderButtonComponent implements OnInit {

  @Input() buttonLabel: any = 'value';
  @Input() dialogTitle: any = 'Dialog Label';
  isLoggedIn = false;

  //buttonLabel: string = 'value';

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private apiSrvc: ApiService,
    private dataSrvc: DataService
  ) { }

  ngOnInit(): void {
    // this.checkLoggedIn();
  }

  openDialog() {

    let value = localStorage.getItem('buttonValue');

    if (value == 'Login') {

      this.dialog.open(LoginDialogComponent, {
        width: '37%'
      }).afterClosed().subscribe(val => {
        if (val === 'save') {
          this.dialogTitle = 'Add Login form';
          this.apiSrvc.getLogins()
            .subscribe({
              next: (res) => {
                // reload application to see new product
                window.location.reload();
              },
              error: () => {
                alert('Error occured while opening Login dialog');
              }
            });
        }
      });
    } else
    if (value == 'Course') {

      this.dialog.open(CourseDialogComponent, {
        width: '37%'
      }).afterClosed().subscribe(val => {
        if (val === 'save') {
          this.dialogTitle = 'Add Course form';
          this.apiSrvc.getCourses()
            .subscribe({
              next: (res) => {
                this.setLoggedIn();
                // reload application to see new product
                window.location.reload();
              },
              error: () => {
                alert('Error occured while opening Course dialog');
              }
            });
        }
      });
    } else
    if (value == 'User') {
      this.dialog.open(UserDialogComponent, {
        width: '37%'
      }).afterClosed().subscribe(val => {
        if (val === 'save') {
          this.apiSrvc.getUsers()
            .subscribe({
              next: (res) => {
                this.setLoggedIn();
                // reload application to see new product
                window.location.reload();
              },
              error: () => {
                alert('Error occured while opening User dialog');
              }
            });
        }
      });
    } else
    if (value == 'Employee') {
      this.dialog.open(EmployeeDialogComponent, {
        width: '37%'
      }).afterClosed().subscribe(val => {
        if (val === 'save') {
          this.dataSrvc.getEmployees()
            .subscribe({
              next: (res) => {
                this.setLoggedIn();
                // reload application to see new employee
                window.location.reload();
              },
              error: () => {
                alert('Error occured while opening Employee dialog');
              }
            });
        }
      });
    } else
    if (value == 'Product') {
      this.dialog.open(ProductDialogComponent, {
        width: '37%'
      }).afterClosed().subscribe(val => {
        if (val === 'save') {
          this.apiSrvc.getProducts()
            .subscribe({
              next: (res) => {
                this.setLoggedIn();
                // reload application to see new product
                window.location.reload();
              },
              error: () => {
                alert('Error occured while opening Product dialog');
              }
            });
        }
      });
    } else
    if (value == 'Post') {
      this.dialog.open(PostDialogComponent, {
        width: '37%'
      }).afterClosed().subscribe(val => {
        if (val === 'save') {
          this.apiSrvc.getPosts()
            .subscribe({
              next: (res) => {
                this.setLoggedIn();
                // reload application to see new product
                window.location.reload();
              },
              error: () => {
                alert('Error occured while opening Post dialog');
              }
            });
        }
      });
    }
  }

  setNotLoggedIn() {
    const value = localStorage.setItem('isLoggedIn', '')
  }

  setLoggedIn() {
    const value = localStorage.setItem('isLoggedIn', 'true')
  }

  checkLoggedIn() {
    const value = localStorage.getItem('isLoggedIn');
    if (value == '') {
      return false;
    } else {
      return this.isLoggedIn = true;
    }
  }

  setLoginValue() {
    localStorage.setItem('buttonValue', 'Login');
  }

  setPostValue() {
    localStorage.setItem('buttonValue', 'Post');
  }

  setUserValue() {
    localStorage.setItem('buttonValue', 'User');
  }

  setProductValue() {
    localStorage.setItem('buttonValue', 'Product');
  }

  setCourseValue() {
    localStorage.setItem('buttonValue', 'Course');
  }

  getButtonLabel() {
    let value = localStorage.getItem('buttonValue');
    const label = this.buttonLabel = JSON.stringify(value);

    // this.reloadComponent(true, '/' + label);

  }

  reloadComponent(self: boolean, urlToNavigateTo?: string) {


    //skipLocationChange:true means dont update the url to / when navigating
    console.log("Current route I am on:", this.router.url);

    const url = self ? this.router.url : urlToNavigateTo;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/${url}`]).then(() => {
        console.log(`After navigation I am on:${this.router.url}`);
      });
    });
  }

}
