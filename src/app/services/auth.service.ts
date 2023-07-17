import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  public apiUrl = environment.API_URL;
  public apiUrlUser = environment.API_URL + 'logged-in-users'

  // public apiUrl = 'http://localhost:3500';
  // public apiUrlUser = 'http://localhost:3500/logged-in-users';


  RegisterUser(inputdata:any){
    return this.http.post(this.apiUrlUser, inputdata)
  }
  GetUserbyCode(id:any){
    return this.http.get(this.apiUrlUser + '/' + id);
  }
  Getall(){
    return this.http.get(this.apiUrlUser);
  }
  updateuser(id:any,inputdata:any){
    return this.http.put(this.apiUrlUser + '/' + id, inputdata);
  }
  getuserrole(){
    return this.http.get(this.apiUrl + '/role');
  }
  isloggedin(){
    return sessionStorage.getItem('username')!=null;
  }
  getrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
  GetAllCustomer(){
    return this.http.get(this.apiUrl + 'customer');
  }
  Getaccessbyrole(role:any,menu:any){
    return this.http.get(this.apiUrl + 'roleaccess?role='+role+'&menu='+menu)
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
