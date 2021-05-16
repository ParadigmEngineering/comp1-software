import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { logData } from 'src/app/services/models';
import { DisplayLogService } from 'src/app/services/display-log/display-log.service';
@Component({
	selector: 'app-display-log',
	templateUrl: './display-log.component.html',
	styleUrls: ['./display-log.component.css']
})

export class DisplayLogComponent implements OnInit {

	private telemetrySubscriber: Subscription;

	logArchive: logData;
	logDummy = [];

	// note: assuming machine initialises with neutral state
	constructor(private displayLogService: DisplayLogService) {
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
						this.cutterheadValve(Math.round(Math.random() * 100) / 100)
						this.logDummy.push("$: Cutterhead Needle Valve -> " + this.logArchive.cutterheadValve);
						break;
					case 4:
						this.augerValve(Math.round(Math.random() * 100) / 100);
						this.logDummy.push("$: Auger Needle Valve-> " + this.logArchive.augerValve);
						break;

					default:
						//just dummy text
						this.logDummy.push("$: nothing");
				}
			});
	}

	ngOnDestroy() {
		this.telemetrySubscriber.unsubscribe();
	}


	// function calls to update status of TBM

	// BOOLEAN ONLY STATUSES
	// assuming only one of the three (adv/ret/neu) can be true at a given instance 

	// A/R/N are almost duplicates, they print any changes or lack thereof
	advance() {
		if (this.logArchive.advancing === true) {
			this.logDummy.push("$: already advancing");
		} else {
			let txt = "$: " + this.getStatus() + " -> ";

			this.reset();
			this.logArchive.advancing = true;

			txt += this.getStatus() + "\n";
			this.logDummy.push(txt);
		}
	}

	retract() {
		if (this.logArchive.retracting === true) {
			this.logDummy.push("$: already retracting");
		} else {
			let txt = "$: " + this.getStatus() + " -> ";

			this.reset();
			this.logArchive.retracting = true;

			txt += this.getStatus() + "\n";
			this.logDummy.push(txt);
		}
	}

	neutral() {
		if (this.logArchive.neutral === true) {
			this.logDummy.push("$: already neutral");
		} else {
			let txt = "$: " + this.getStatus() + " -> ";

			this.reset();
			this.logArchive.neutral = true;

			txt += this.getStatus() + "\n";
			this.logDummy.push(txt);
		}
	}

	reset() {
		this.logArchive.advancing = false;
		this.logArchive.retracting = false;
		this.logArchive.neutral = false;
	}

	// checks status (adv/ret/neu)
	getStatus(): string {
		if (this.logArchive.advancing === true) {
			return "Advancing"
		} else if (this.logArchive.retracting === true) {
			return "Retracting"
		} else {
			return "Neutral"
		}
	}


	// NUMBER ONLY STATUSES 
	// not sure if there's a better 'type'(?) to restrict values to 0 and 1 

	cutterheadValve(input: number) {
		this.logArchive.cutterheadValve = input;
	}

	augerValve(input: number) {
		this.logArchive.augerValve = input;
	}
}