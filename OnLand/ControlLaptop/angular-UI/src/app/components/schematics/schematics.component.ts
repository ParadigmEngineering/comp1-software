import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as go from 'gojs';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';

@Component({
	selector: 'app-schematics',
	templateUrl: './schematics.component.html',
	styleUrls: ['./schematics.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class SchematicsComponent implements OnInit {

	constructor() { }
	dia: go.Diagram;
	ngOnInit(): void {
	}

	public initDiagram(): go.Diagram {

		const $ = go.GraphObject.make;
		this.dia = $(go.Diagram, {
			'undoManager.isEnabled': false, // must be set to allow for model change listening
			// 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
			model: $(go.GraphLinksModel,
				{
					linkKeyProperty: 'key' // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
				}
			)
		});

		// define the Node template
		this.dia.nodeTemplate =
			$(go.Node, 'Auto',
				{
					toLinkable: false, fromLinkable: false
				},
				new go.Binding("location", "loc", go.Point.parse),
          new go.Binding('fill', 'color'),
				$(go.Picture, new go.Binding("source", "img"), new go.Binding("desiredSize", "size")),
			);
		this.dia.linkTemplate = $(go.Link, $(go.Shape,
			new go.Binding("stroke", "color"),  // shape.stroke = data.color
			new go.Binding("strokeWidth", "thick")));

		this.dia.isReadOnly = true;
		return this.dia;
	}

	public diagramNodeData = [
		{ key: 'DCV_1', img: '../../../assets/machine.svg', color: "red",size: new go.Size(159, 83), loc: "500 500" },
		{ key: 'temperature_1', img: '../../../assets/HPU.svg', size: new go.Size(79, 64), loc: "0 0" },
		{ key: 'Gamma' },
		{ key: 'Delta' }
	];
	public diagramLinkData = [
		{ key: -1, from: 'DCV_1', to: 'temperature_1', color: 'red' }
	];
	public diagramDivClassName: string = 'myDiagramDiv';
	public diagramModelData = { prop: 'value' };
	public skipsDiagramUpdate = false;

	// When the diagram model changes, update app data to reflect those changes
	public diagramModelChange = function (changes: go.IncrementalData) {
		// when setting state here, be sure to set skipsDiagramUpdate: true since GoJS already has this update
		// (since this is a GoJS model changed listener event function)
		// this way, we don't log an unneeded transaction in the Diagram's undoManager history
		this.skipsDiagramUpdate = true;

		this.diagramNodeData = DataSyncService.syncNodeData(changes, this.diagramNodeData);
		this.diagramLinkData = DataSyncService.syncLinkData(changes, this.diagramLinkData);
		this.diagramModelData = DataSyncService.syncModelData(changes, this.diagramModelData);
	};/* dia.commit(m => {
		let link1=m.findLinkForKey('x')
		link1.setProperties({color:"blue"})
	}) */
	
}
