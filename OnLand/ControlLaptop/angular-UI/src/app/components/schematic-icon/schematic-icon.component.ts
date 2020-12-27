import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schematic-icon',
  templateUrl: './schematic-icon.component.html',
  styleUrls: ['./schematic-icon.component.css']
})
export class SchematicIconComponent implements OnInit {

  private DCV_Neutral = "../../../assets//schematic_icons/DCV_Neutral.png"
  constructor() { }

  ngOnInit(): void {
  }

}
