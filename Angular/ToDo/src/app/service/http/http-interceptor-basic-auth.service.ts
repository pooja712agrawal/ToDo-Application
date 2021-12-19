import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor{

  constructor(private basicAuthenticationService: BasicAuthenticationService) { }

  //overided method
  intercept(request : HttpRequest<any>, next : HttpHandler){


    //window.btoa - used for encoding
    // let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    let basicAuthHeaderString = this.basicAuthenticationService.getAuthenticationToken();
    let validUser  = this.basicAuthenticationService.getAuthenticatedUser();

    if(basicAuthHeaderString && validUser){
    request = request.clone({

      setHeaders : {
        Authorization : basicAuthHeaderString
      }
    })
  }

    return next.handle(request);
  }
}
