import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as go from 'gojs';
import { DataSyncService, DiagramComponent } from 'gojs-angular';
import { Subscription } from 'rxjs';
import { NaturalGasService } from 'src/app/services/natural-gas/natural-gas.service';

@Component({
	selector: 'app-schematics',
	templateUrl: './schematics.component.html',
	styleUrls: ['./schematics.component.css'],
	encapsulation: ViewEncapsulation.ShadowDom
})

export class SchematicsComponent implements OnInit {
	private telemetrySubscriber: Subscription; // telemetry socketio subscriber
	@ViewChild('myDiagram', { static: true }) public myDiagramComponent: DiagramComponent;
	diagramJsonData: string; // json data for modified diagram
	showText: boolean = false;
	public diagramNodeData: Array<go.ObjectData> = [
		{ "key": "auger", "group": "auger_group", "scale": 2.5, "img": "../../../assets/schematic-icon/Auger.svg", "color": "red", "loc": "643.50 -54.17" },
		{ "key": "P1_1", "group": "auger_group", "scale": 2.5, "img": "../../../assets/schematic-icon/P1.svg", "loc": "696.50 -11.77" },
		{ "key": "P1_2", "group": "auger_group", "scale": 2.5, "img": "../../../assets/schematic-icon/P1.svg", "loc": "696.50 41.83" },
		{ "key": "Relief_Valve_1", "group": "auger_group", "scale": 2.5, "img": "../../../assets/schematic-icon/Relief_Valve_Straight.svg", "loc": "748.54 22.83" },
		{ "key": "Motor_small_1", "group": "auger_group", "scale": 2.5, "img": "../../../assets/schematic-icon/Motor_small.svg", "loc": "822.50 -19.17" },
		{ "key": "auger_group", "isGroup": true },
		{ "key": "Delta" }
	];

	public diagramLinkData: Array<go.ObjectData> = [
		{ "from": "Motor_small_1", "to": "P1_1", "color": "red", "fromPort": "Left", "toPort": "Right", "key": -1, "points": [822.5, -2.7950000000000017, 812.5, -2.7950000000000017, 762.726127329298, -2.7950000000000017, 762.726127329298, 2.1050000000000004, 734, 2.1050000000000004, 724, 2.1050000000000004] },
		{ "from": "Relief_Valve_1", "to": "Motor_small_1", "color": "green", "fromPort": "Right", "toPort": "Right", "key": -2, "points": [775.7417040671694, 37.8541479664153, 785.7417040671694, 37.8541479664153, 859.5572240640107, 37.8541479664153, 859.5572240640107, -2.7950000000000017, 845, -2.7950000000000017, 855, -2.7950000000000017] },
		{ "from": "P1_2", "to": "Relief_Valve_1", "color": "green", "fromPort": "Right", "toPort": "Right", "key": -3, "points": [724, 55.705, 734, 55.705, 782.6970382104381, 55.705, 782.6970382104381, 37.8541479664153, 763.2417040671694, 37.8541479664153, 773.2417040671694, 37.8541479664153] },
		{ "from": "P1_1", "to": "Relief_Valve_1", "color": "red", "fromPort": "Right", "toPort": "Top", "points": [724, 2.1050000000000004, 734, 2.1050000000000004, 763.2954378978858, 2.1050000000000004, 763.2954378978858, 25.354147966415297, 750.6167040671694, 25.354147966415297, 760.6167040671694, 25.354147966415297], "key": -4 }
	];
	public observedDiagram = null;

	constructor(private cdr: ChangeDetectorRef, private naturalGas: NaturalGasService /* temporary listen to natural gas service to test real time links color changes */) {
	}
	ngOnInit(): void { }

	// initiatae gojs diagram 
	public initDiagram(): go.Diagram {

		const $ = go.GraphObject.make;
		const dia = $(go.Diagram, {
			'undoManager.isEnabled': true, // must be set to allow for model change listening
			// 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
			initialContentAlignment: go.Spot.None,
			model: $(go.GraphLinksModel,
				{
					linkFromPortIdProperty: "fromPort",  // required information:
					linkToPortIdProperty: "toPort",
					linkKeyProperty: 'key' // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
				}
			)
		});
		dia.commandHandler.archetypeGroupData = { key: 'Group', isGroup: true };

		// define the Node template
		dia.nodeTemplate =
			$(go.Node, 'Auto',
				{
					toLinkable: false, fromLinkable: false,
					click: (e, obj) => {
						let loc = obj.part.location;
						var docloc = dia.transformDocToView(loc);
						console.log("Selected node location,\ndocument coordinates: " + loc.x.toFixed(2) + " " + loc.y.toFixed(2) + "\nview coordinates: " + docloc.x.toFixed(2) + " " + docloc.y.toFixed(2));
					}
				},
				new go.Binding("location", "loc", go.Point.parse),
				new go.Binding('fill', 'color'),
				new go.Binding('scale', 'scale'),
				$(go.Panel, "Spot",
					$(go.Picture, new go.Binding("source", "img"), new go.Binding("desiredSize", "size"),
					), $(go.Shape,
						{
							width: 0.1, height: 0.1, portId: "Top",
							fromLinkable: false, stroke: null, fill: "pink", alignment: go.Spot.Top,
						}),
					$(go.Shape,
						{
							width: 0, height: 0, portId: "Bottom",
							fromLinkable: false, stroke: null, fill: "transparent", alignment: go.Spot.Bottom,
						}),
					$(go.Shape,
						{
							width: 0, height: 0, portId: "Left",
							fromLinkable: false, stroke: null, fill: "transparent", alignment: go.Spot.Left,
						}),
					$(go.Shape,
						{
							width: 0, height: 0, portId: "Right",
							fromLinkable: false, stroke: null, fill: "transparent", alignment: go.Spot.Right,
						})

				)
			);

		dia.linkTemplate =
			$(go.Link,
				{ routing: go.Link.AvoidsNodes, reshapable: true },
				new go.Binding("points").makeTwoWay(),
				$(go.Shape,
					new go.Binding("stroke", "color"),  // shape.stroke = data.color
					new go.Binding("strokeWidth", "thick")));

		return dia;
	}


	public diagramDivClassName: string = 'myDiagramDiv';
	public diagramModelData = { prop: 'value' };
	public skipsDiagramUpdate = false;

	// When the diagram model changes, update app data to reflect those changes
	public diagramModelChange(changes: go.IncrementalData) {
		// when setting state here, be sure to set skipsDiagramUpdate: true since GoJS already has this update
		// (since this is a GoJS model changed listener event function)
		// this way, we don't log an unneeded transaction in the Diagram's undoManager history
		this.skipsDiagramUpdate = true;

		this.diagramNodeData = DataSyncService.syncNodeData(changes, this.diagramNodeData);
		this.diagramLinkData = DataSyncService.syncLinkData(changes, this.diagramLinkData);
		this.diagramModelData = DataSyncService.syncModelData(changes, this.diagramModelData);
	};

	public ngAfterViewInit() {

		if (this.observedDiagram) return;
		this.observedDiagram = this.myDiagramComponent.diagram;
		this.cdr.detectChanges(); // IMPORTANT: without this, Angular will throw ExpressionChangedAfterItHasBeenCheckedError (dev mode only)

		const appComp: SchematicsComponent = this;

		// subscribe to socketio response to test if the diagram link changes color in realtime
		this.telemetrySubscriber = this.naturalGas.onNatural().subscribe((msg: { message: string }) => {
			// if get a message equal to 6, than change P1 to Relief valve link to yellow		
			if (parseInt(msg.message) === 6) {
				console.log('got a msg from server that is 6 ');
				this.myDiagramComponent.diagram.commit(dia => {
					const from = dia.findNodeForKey('P1_1');
					const to = dia.findNodeForKey('Relief_Valve_1');
					if (from !== null && to !== null) {
						from.findLinksTo(to).each(l => {
							dia.model.set(l.data, "color", "yellow");
						})
					}
					else {
						console.log('Error finding nodes')
					}
				});
			}
			// if get a message equal to 1, than change P1 to Relief valve link to blue
			else if (parseInt(msg.message) === 1) {
				this.myDiagramComponent.diagram.commit(dia => {
					const from = dia.findNodeForKey('P1_1');
					const to = dia.findNodeForKey('Relief_Valve_1');
					if (from !== null && to !== null) {
						from.findLinksTo(to).each(l => {
							dia.model.set(l.data, "color", "blue");
						})
					}
					else {
						console.log('Error finding nodes')
					}
				});
			}
			else {
				this.myDiagramComponent.diagram.commit(dia => {
					const from = dia.findNodeForKey('P1_1');
					const to = dia.findNodeForKey('Relief_Valve_1');
					if (from !== null && to !== null) {
						from.findLinksTo(to).each(l => {
							dia.model.set(l.data, "color", "red");
						})
					}
				});
			}
		});

		// listen to changes from user draging the nodes and links, then append the data to show Json
		this.myDiagramComponent.diagram.addDiagramListener('ChangedSelection', (e) => {
			this.diagramJsonData = e.diagram.model.toJson();
		});
	}

	ngOnDestroy() {
		this.telemetrySubscriber.unsubscribe();
	}
}
