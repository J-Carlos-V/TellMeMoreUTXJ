import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { UserResponse, User, Roles } from '@shared/models/user.interfaces';
import { catchError, map } from 'rxjs/operators'
import { error } from '@angular/compiler/src/util';
import { JwtHelperService} from '@auth0/angular-jwt'
import { Router } from '@angular/router';



const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private role = new BehaviorSubject<Roles>(null);
  constructor(private http: HttpClient, private router: Router) { 
    this.readToken();
  } 

  get isLogged(): Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  login(authData: User): Observable<UserResponse | void> {
     return this.http
     .post<UserResponse>(`${environment.API_URL}auth/login`, authData)
     .pipe( 
       map((res: UserResponse) =>{
       this.saveToken(res);
       this.loggedIn.next(true);
       return res;
     }),
     catchError( (err) => this.handlerError(err))
     );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
  private readToken(): void {
    const userToken = localStorage.getItem('token');
    const isExpired = helper.isTokenExpired(userToken);
    console.log('isExpired =>', isExpired );
    // set userIsLogged = isExpired 
    isExpired ? this.logout() : this.loggedIn.next(true);
  }
  private saveToken(user: UserResponse): void {
    //localStorage.setItem('token', token);
    console.log(user)
  }
  private handlerError(err): Observable<never>{
    let errorMessage = 'Error al recivir los datos';
    if (err) {
      errorMessage = `Error: code ${err.message}`
    }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }
}
