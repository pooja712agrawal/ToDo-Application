import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constants';

export class WelcomeBean{
  constructor(public message : String){

  }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  //Added HttpClient to call backend REST API
  constructor(private http : HttpClient) { }

  getWelcomeMsgFromSpring(name : string){

    return this.http.get<WelcomeBean>(`${API_URL}/welcome/${name}`)
   
    }

}
