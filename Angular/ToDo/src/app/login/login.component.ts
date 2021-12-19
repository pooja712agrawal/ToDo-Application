import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //default values for username and password
  username = ''
  password = ''

  //For authentication
  errorMsg = 'Invalid Credentials'
  invalidLogin = false

  //Now we want to route from Login to Welcome, 
  // To do routing, we need Router so we have to use Dependency Injection to access Router here
  // By passing Router as a argument to constructor we can achieve Dependency injection
  // I don't want to use it ouside the class so added private
  constructor(private router: Router, private hardcodedAuthentication: HardcodedAuthenticationService,
    private basicAuthenticationService: BasicAuthenticationService) { }

  ngOnInit(): void {
  }

  //hardcoded authentication
  handleLogin() {

    if (this.hardcodedAuthentication.authenticate(this.username, this.password)) {

      // Redirect to Welcome Component
      this.router.navigate(['welcome', this.username])
      this.invalidLogin = false
    }
    else {
      this.invalidLogin = true
    }
  }


  //basic authentication
  handleBasicAuthLogin() {

    this.basicAuthenticationService.executeBasicAuthentication(this.username, this.password)
      .subscribe(
        data => {
          // Redirect to Welcome Component
          this.router.navigate(['welcome', this.username])
          this.invalidLogin = false
        },
        error => {

          this.invalidLogin = true

        }
      )
  }


}
