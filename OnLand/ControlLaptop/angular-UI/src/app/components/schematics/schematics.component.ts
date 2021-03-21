import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as go from 'gojs';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';

@Component({
	selector: 'app-schematics',
	templateUrl: './schematics.component.html',
	styleUrls: ['./schematics.component.css'],
	encapsulation: ViewEncapsulation.ShadowDom
})
export class SchematicsComponent implements OnInit {
	@ViewChild('myDiagram', { static: true }) public myDiagramComponent: DiagramComponent;
	rapidPageValue;
	showText: boolean = false;
	public diagramNodeData: Array<go.ObjectData> = [
		{ key: 'auger', group: "auger_group", scale: 2.5, img: '../../../assets/Auger.svg', color: "red", loc: "643.50 -54.17" },
		{ key: 'P1_1', group: "auger_group", scale: 2.5, img: '../../../assets/P1.svg', loc: "696.50 -11.77" },
		{ key: 'P1_2', group: "auger_group", scale: 2.5, img: '../../../assets/P1.svg', loc: "696.50 41.83" },
		{ key: 'Relief_Valve_1', group: "auger_group", scale: 2.5, img: '../../../assets/Relief_Valve_Straight.svg', loc: "756.54 41.83" },
		{ key: 'Motor_small_1', group: "auger_group", scale: 2.5, img: '../../../assets/Motor_small.svg', loc: "822.50 -19.17" },
		{ key: 'auger_group', isGroup: true },
		{ key: 'Delta' }
	];

	public diagramLinkData: Array<go.ObjectData> = [
		{ from: 'Motor_small_1', to: 'P1_1', color: 'red', fromPort: "Left", toPort: "Right" },
		{ from: 'Relief_Valve_1', to: 'Motor_small_1', color: 'green', fromPort: "Right", toPort: "Right" },
		{ from: 'P1_2', to: 'Relief_Valve_1', color: 'green', fromPort: "Right", toPort: "Right" },
		{ from: 'P1_1', to: 'Relief_Valve_1', color: 'red', fromPort: "Right", toPort: "Top", "points": [511, 280] },
	];
	public observedDiagram = null;

	// currently selected node; for inspector
	public selectedNode: go.Node | null = null;
	constructor(private cdr: ChangeDetectorRef) { }
	ngOnInit(): void {
	}

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
		// listener for inspector
		this.myDiagramComponent.diagram.addDiagramListener('ChangedSelection', (e) => {
			console.log(e.diagram.model.toJson())
			this.rapidPageValue = e.diagram.model.toJson();
			console.log(this.rapidPageValue)

			if (e.diagram.selection.count === 0) {
				appComp.selectedNode = null;
				console.log('x')
			}
			const node = e.diagram.selection.first();
			if (node instanceof go.Node) {
				appComp.selectedNode = node;
				console.log(node)
			} else {
				appComp.selectedNode = null;
				console.log('x2')
			}
		});

	} 

	public handleInspectorChange(newNodeData) {
		const key = newNodeData.key;
		// find the entry in nodeDataArray with this key, replace it with newNodeData
		let index = null;
		for (let i = 0; i < this.diagramNodeData.length; i++) {
			const entry = this.diagramNodeData[i];
			if (entry.key && entry.key === key) {
				index = i;
			}
		}

		if (index >= 0) {
			// here, we set skipsDiagramUpdate to false, since GoJS does not yet have this update
			this.skipsDiagramUpdate = false;
			this.diagramNodeData[index] = _.cloneDeep(newNodeData);
			// this.diagramNodeData[index] = _.cloneDeep(newNodeData);
		}

	}
}