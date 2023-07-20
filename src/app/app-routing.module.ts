import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
// import { ApplicationComponent } from './components/application/application.component';
import { AboutComponent } from './components/about/about.component';
import { CoursesComponent } from './components/courses/courses.component';
import { InitComponent } from './components/init/init.component';
import { PostsComponent } from './components/posts/posts.component';
import { UsersComponent } from './components/users/users.component';
import { ProductsComponent } from './components/products/products.component';
import { ContextMenuComponent } from './components/contextmenu/contextmenu.component';
import { SidenavAutosizeExample } from './components/sidenav-autosize-example/sidenav-autosize-example';
import { ModalComponent } from './components/modal/modal.component';
import { MatComponentsComponent } from './components/mat-components/mat-components.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { Breadcrumb2Component } from './components/breadcrumb2/breadcrumb2.component';
import { CountriesComponent } from './components/countries/countries.component';
import { LoginComponent } from './components/login/login.component';
// import { LoginUserComponent } from './components/login-user/login-user.component';

import { AuthGuard } from './components/guard/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginsComponent } from './components/logins/logins.component';
import { LoggedInComponent } from './components/logged-in/logged-in.component';
import { RegisterPostLoginComponent } from './components/register-post-login/register-post-login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'init',
    component: InitComponent
  },
  {
    path: 'loggedIn',
    component: LoggedInComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'About'
    }
  },
  {
    path: 'breadcrumb',
    component: BreadcrumbComponent
  },
  {
    path: 'breadcrumb2',
    component: Breadcrumb2Component
  },
  {
    path: 'right-click',
    component: ContextMenuComponent
  },
  {
    path: 'sidenav',
    component: SidenavAutosizeExample
  },
  {
    path: 'modal',
    component: ModalComponent
  },
  {
    path: 'mat-components',
    component: MatComponentsComponent
  },
  {
    path: 'courses',
    component: CoursesComponent,
    // canActivate: [AuthGuard],
    // data: {
    //   title: 'Courses'
    // }
  },
  {
    path: 'posts',
    component: PostsComponent,
    // canActivate: [AuthGuard],
    // data: {
    //   title: 'Posts'
    // }
  },
  {
    path: 'users',
    component: UsersComponent,
    // canActivate: [AuthGuard],
    // data: {
    //   title: 'Users'
    // }
  },
  {
    path: 'products',
    component: ProductsComponent,
    // canActivate: [AuthGuard],
    // data: {
    //   title: 'Products'
    // }
  },
  {
    path: 'countries',
    component: CountriesComponent,
    // canActivate: [AuthGuard],
    // data: {
    //   title: 'Countries'
    // }
  },
  {
    path: 'logins',
    component: LoginsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Logins'
    }
  },

  {component:RegisterComponent,path:'register'},
  {component:RegisterPostLoginComponent,path:'register-post-login'},
  {component:UserComponent,path:'user',canActivate:[AuthGuard]},
  {component:CustomerComponent,path:'customer',canActivate:[AuthGuard]},
  {
    path: "**",
    component: NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
