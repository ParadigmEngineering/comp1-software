import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { logData } from 'src/app/services/models';
import { DisplayLogService } from 'src/app/services/display-log/display-log.service';
import { stringify } from '@angular/compiler/src/util';
@Component({
  selector: 'app-display-log',
  templateUrl: './display-log.component.html',
  styleUrls: ['./display-log.component.css']
})

export class DisplayLogComponent implements OnInit {

  private telemetrySubscriber: Subscription;

  dollarSpacer: string = "$:\n"
  logOutput: string = "";
  logArchive: logData;

  // note: assuming machine initialises with neutral state
  constructor(private displayLogService:DisplayLogService) { 
    this.logArchive = {
      advancing: false,
      retracting: false,
      neutral: true,
      cutterheadValve: 0,
      augerValve: 0
    }
  }

  ngOnInit(): void {
    this.telemetrySubscriber = this.displayLogService.getLogs().subscribe
    ((msg: { message: string }) => {
      console.log('beep boop server says ' + JSON.stringify(msg));

      switch (parseInt(msg.message)) {

        // cases 0-2 is the status of the TBM (boolean only)
        case 0:
          this.advance();
          break;
          
        case 1:
          this.retract();
          break;
        case 2:
          this.neutral();
          break;

        // cases 3-4 are the valves (0-1), math round and random is passing a fake 2-decimal value 
        case 3:
          this.cutterheadValve( Math.round( Math.random() *100 )/100 ) 
          this.logOutput += "Cutterhead Needle Valve -> " + this.logArchive.cutterheadValve  + "%\n";
          break;
        case 4:
          this.augerValve( Math.round( Math.random() *100 )/100 );
          this.logOutput += "Auger Needle Valve -> " + this.logArchive.augerValve  + "%\n";
          break;

        default:
          //just dummy text
          this.addDollar();
          this.logOutput += "nothing\n";
      }
    });
  }

  ngOnDestroy() {
    this.telemetrySubscriber.unsubscribe();
  }


  // function calls to update status of TBM

  // BOOLEAN ONLY STATUSES
  // assuming only one of the three (adv/ret/neu) can be true at a given instance 
  advance() {
    this.addDollar();
    if (this.logArchive.advancing == true){
      this.logOutput += "already advancing\n"
    }else{
      this.logOutput += this.getStatus() + " -> ";
      this.reset();
      this.logArchive.advancing = true;
      this.logOutput += this.getStatus() +"\n";
    }    
  }

  retract() {
    this.addDollar();
    if (this.logArchive.retracting == true){
      this.logOutput += "already retracting\n"
    }else{
      this.logOutput += this.getStatus() + " -> ";
      this.reset();
      this.logArchive.retracting = true;
      this.logOutput += this.getStatus() +"\n";
    }    
  }

  neutral() {
    this.addDollar();
    if (this.logArchive.neutral == true){
      this.logOutput += "already neutral\n"
    }else{
      this.logOutput += this.getStatus() + " -> ";
      this.reset();
      this.logArchive.neutral = true;
      this.logOutput += this.getStatus() +"\n";
    }    
  }

  reset(){
    this.logArchive.advancing = false;
    this.logArchive.retracting = false;
    this.logArchive.neutral = false;
  }

  // checks status (adv/ret/neu)
  getStatus():string{
    if (this.logArchive.advancing == true){
      return "Advancing"
    }else if (this.logArchive.retracting == true){
      return "Retracting"
    }else{
      return "Neutral"
    }
  }


  // NUMBER ONLY STATUSES 
  // not sure if there's a better 'type'(?) to restrict values to 0 and 1 

  cutterheadValve(input:number){
    this.addDollar();
    this.logArchive.cutterheadValve = input;
  }

  augerValve(input:number){
    this.addDollar();
    this.logArchive.augerValve = input;
  }


  // SPACER 
  addDollar(){
    this.dollarSpacer += "$:\n"
  }
}