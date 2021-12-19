import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  name : any
  welcomeMsgFromSpring = ''
  errorMsgFromSpring = ''
  //Use to access the parameter from route
  //ActivatedRoute
  constructor(
    private route: ActivatedRoute,
    private welcomeDataService: WelcomeDataService) { }

  ngOnInit(): void {
    //params - is a Map and name is a key
    //this.name = this.route.snapshot.params[`name`];
    this.name =  sessionStorage.getItem('authenticatedUser');
    this.getWelcomeMsg();
    
  }

  getWelcomeMsg() {

    this.welcomeDataService.getWelcomeMsgFromSpring(this.name).subscribe(
      //once response get will run below line
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorMessage(error)
    );
  }

  //If response is successful
  handleSuccessfulResponse(response: any) {
    this.welcomeMsgFromSpring = response.message
  }

  //If error occur
  handleErrorMessage(error: any) {
    this.errorMsgFromSpring = error.error.message;
  }

}
