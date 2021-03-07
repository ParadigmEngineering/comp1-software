import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-advance-retract',
    templateUrl: './advance-retract.component.html',
    styleUrls: ['./advance-retract.component.css']
})
export class AdvanceRetractComponent implements OnInit {

    advanceFlag = false;
    timeoutHandler: any;
    count: number = 0;



    constructor() { }

    ngOnInit(): void {
    }
    toggleFlag() {
        this.advanceFlag = !this.advanceFlag;
    }

    mouseDown() {
        this.timeoutHandler = setInterval(() => {
            this.count ++;
            console.log(`press: ${this.count}`)
        }, 500);
    }

    mouseUp() {
        if (this.timeoutHandler) {
            clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
            this.count = 0;
            console.log(`unpress: ${this.count}`)
        }

    }
}