import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-configuration-button',
  templateUrl: './configuration-button.component.html',
  styleUrls: ['./configuration-button.component.css']
})
export class ConfigurationButtonComponent implements OnInit {
  @Input() buttonName;
  constructor() { }

  ngOnInit(): void {
  }

}
