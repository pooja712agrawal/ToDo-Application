import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'
import { API_URL } from '../app.constants';

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticatedUser'

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http : HttpClient) { }


  // Basic Authentication
  executeBasicAuthentication(username: string, password: string){
    
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);

    let header = new HttpHeaders({
      Authorization : basicAuthHeaderString
    })

    return this.http.get<AuthenticationBean>(`${API_URL}/auth`,
    {headers : header}).pipe(
      map(
        data => {
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            //console.log(sessionStorage.getItem(AUTHENTICATED_USER));
            //setting token in session
            sessionStorage.setItem(TOKEN, basicAuthHeaderString);
            return data;
        }
      )
    );

    }

    //To get Authenticated user
    getAuthenticatedUser(){
      return sessionStorage.getItem(AUTHENTICATED_USER);
    }

    // To get Authentication Token
    getAuthenticationToken(){

      if(this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN);
      else
      return " "
    }

    isUserLoggedIn() {
      let user = sessionStorage.getItem(AUTHENTICATED_USER);
      return !(user === null)
    }
  
    //Logout method
    loggedOut() {
      sessionStorage.removeItem(AUTHENTICATED_USER)
      sessionStorage.removeItem(TOKEN)
    }
  
}


export class AuthenticationBean{

  costructor(){

  }
}