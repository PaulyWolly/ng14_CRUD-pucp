import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  userName = '';
  private routerSub?: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.checkIsLoggedIn();
    this.routerSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.checkIsLoggedIn());
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  checkIsLoggedIn(): void {
    this.isLoggedIn = this.authService.isloggedin();
    this.userName = this.isLoggedIn ? this.authService.getUserName() : '';
  }

  hideButton(): void {
    localStorage.setItem('buttonValue', '');
  }

  setBlankValue(): void {
    this.hideButton();
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userName = '';
    this.hideButton();
    this.router.navigate(['login']);
  }
}
