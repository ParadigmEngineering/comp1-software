import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
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
		{ "key": "auger", "group": "auger_group", "scale": 2.5, "img": "../../../assets/schematic-icon/Auger.svg", "color": "red", "loc": "700.50 90.50" },
		{ "key": "P1_11", "group": "auger_group", "scale": 2.5, "img": "../../../assets/schematic-icon/P1.svg", "loc": "765.50 140.50" },
		{ "key": "P1_12", "group": "auger_group", "scale": 2.5, "img": "../../../assets/schematic-icon/P1.svg", "loc": "750.50 190.50" },
		{ "key": "Relief_Valve_9", "group": "auger_group", "scale": 2.0, "img": "../../../assets/schematic-icon/Relief_Valve_Straight.svg", "loc": "800.50 175.50" },
		{ "key": "Motor_small_1", "group": "auger_group", "scale": 2.0, "img": "../../../assets/schematic-icon/Motor_small.svg", "loc": "880.50 130.17" },
		{ "key": "auger_group", "isGroup": true },
		{ "key": "Delta" }

        // templating
        // { "key": "auger", 
        // "group": "auger_group", 
        // "scale": 2.5, 
        // "img": "../../../assets/schematic-icon/Auger.svg", 
        // "color": "red", 
        // "loc": "643.50 -54.17" },
	];

	public diagramLinkData: Array<go.ObjectData> = [
        {"from":"Motor_small_1","to":"P1_11","color":"red","fromPort":"Left","toPort":"Right","key":-1,"points":[880.5,143.26999999999998,870.5,143.26999999999998,811.6511811679179,143.26999999999998,811.6511811679179,153.875,807.5,153.875,797.5,153.875]},
        {"from":"Relief_Valve_9","to":"Motor_small_1","color":"green","fromPort":"Right","toPort":"Right","key":-2,"points":[822.5,186.6,832.5,186.6,838.220608719719,186.6,838.220608719719,204.32770194879322,917.8716286829019,204.32770194879322,917.8716286829019,143.26999999999998,896.5,143.26999999999998,906.5,143.26999999999998]},
        {"from":"P1_12","to":"Relief_Valve_1","color":"green","fromPort":"Right","toPort":"Right","key":-3,"points":[778,204.375,788,204.375,788,204.375,788,204.32770194879322,838.5624585908057,204.32770194879322,838.5624585908057,186.6,810.5,186.6,820.5,186.6]},
        {"from":"P1_11","to":"Relief_Valve_1","color":"red","fromPort":"Right","toPort":"Top","key":-4,"points":[796.25,155.125,796.25,165.125,796.25,154.46135778366812,811.5,154.46135778366812,811.5,165.5,811.5,175.5]}
    ];
	public observedDiagram = null;

	constructor(private cdr: ChangeDetectorRef,
		/* temporary listen to natural gas service to test real time links color changes */
		private naturalGas: NaturalGasService) {
	}
    
    ngOnInit(): void {}

    // getting width/height of schematics 
    @ViewChild('dummy') 
    dummy: ElementRef; 
    private width:Number;
    private height:Number;

    // initiate gojs diagram 
	public initDiagram(): go.Diagram {
		const $ = go.GraphObject.make;
		const dia = $(go.Diagram, {
			'undoManager.isEnabled': true, // must be set to allow for model change listening
			// 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
            padding:0,
            scrollMode: go.Diagram.InfiniteScroll,
			initialContentAlignment: go.Spot.None,
			model: $(go.GraphLinksModel,
				{
					linkFromPortIdProperty: "fromPort",  // required information:
					linkToPortIdProperty: "toPort",
					linkKeyProperty: 'key' // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
				}
			)
		});
    	dia.isReadOnly = false; // change to true to disable user to insert or delete or drag or modify parts.
		dia.commandHandler.archetypeGroupData = { key: 'Group', isGroup: true };
		// define the Node template
		dia.nodeTemplate =
			$(go.Node, 'Auto',
				{
					/* 
					 * toLinkable and fromLinkable is false, 
					 * if turn to true, user will be able to add new link between different node					
					 */
					toLinkable: false, fromLinkable: false,
					/* when click a node, system will print out the location of the node  */
					click: (e, obj) => {
						let loc = obj.part.location;
						var docloc = dia.transformDocToView(loc);
						console.log("Selected node location,\ndocument coordinates: " + loc.x.toFixed(2) + " " + loc.y.toFixed(2) + "\nview coordinates: " + docloc.x.toFixed(2) + " " + docloc.y.toFixed(2));
					}
				},
				
				new go.Binding("location", "loc", go.Point.parse), // loc indicate the location (coordinates) of the node, with this properties, you can put your node in specified location
				new go.Binding('fill', 'color'),
				new go.Binding('scale', 'scale'), // scale the size of the node
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
        
        
        // ---GRID START---  
        dia.grid.visible = true; 
        dia.toolManager.draggingTool.isGridSnapEnabled = true; // snappy snap
        // dia.toolManager.resizingTool.isGridSnapEnabled = true;
        dia.grid =
            $(go.Panel, "Grid",
            { gridCellSize: new go.Size(10, 10) }, // width x height of the grid system

            // XY lines at specified interval
            $(go.Shape, "LineH", { stroke: "grey", interval: 10 }), 
            $(go.Shape, "LineH", { stroke: "lightgrey", interval: 20 }), 
            $(go.Shape, "LineV", { stroke: "grey", interval: 10 }),
            $(go.Shape, "LineV", { stroke: "lightgrey", interval: 20 }),

            // XY lines for entire grid 
            // $(go.Shape, "LineH", { stroke: "pink" }),
            // $(go.Shape, "LineV", { stroke: "pink" }),
            );
        // ---GRID END---
        
        // ---RULER & INDICATORS START---
        var gradScaleHoriz = 
            $(go.Part, "Graduated", { graduatedTickUnit: 10, pickable:false, layerName: "Foreground"  },
            $(go.Shape, { geometryString: "M0 0 H500" }),
            $(go.Shape, { geometryString: "M0 0 V3", interval: 1 }),
            $(go.Shape, { geometryString: "M0 0 V15", interval: 5 }),
            $(go.TextBlock,
            {
              font: "12px verdana",
              interval: 5,
              alignmentFocus: go.Spot.TopLeft,
              segmentOffset: new go.Point(0, 20)
            })
        );
        
        
        var gradScaleVert =
            $(go.Part, "Graduated", { graduatedTickUnit: 10, pickable: false, layerName: "Foreground" },
            $(go.Shape, { geometryString: "M0 0 V400" }),
            $(go.Shape, { geometryString: "M0 0 V3", interval: 1, alignmentFocus: go.Spot.Bottom }),
            $(go.Shape, { geometryString: "M0 0 V15", interval: 5, alignmentFocus: go.Spot.Bottom }),
            $(go.TextBlock,
                {
                font: "12px verdana",
                // note: I have no idea how to rotate the text 90d ccw, flip is not the answer 
                //flip: go.GraphObject.FlipHorizontal,
                segmentOrientation: go.Link.OrientOpposite,
                interval: 5,
                alignmentFocus: go.Spot.BottomLeft,
                segmentOffset: new go.Point(0, -20)
                })
            );

        // var posiIndicator = 
        //     $(go.Part,
        //         {   pickable: false, layerName:"Foreground", visible: true, alignment: new go.Spot(1,1)  },
        //     $(go.TextBlock,
        //         {
        //             font: "12px verdana",
        //             text: "monkey",
        //         })
        //     );

        var gradIndicatorHoriz =
            $(go.Part,
            {
                pickable: false, layerName: "Grid", visible: false,
                isAnimated: false, locationSpot: go.Spot.Top
            },
            $(go.Shape, { geometryString: "M0 0 V15", strokeWidth: 2, stroke: "red" })
            );

        var gradIndicatorVert =
            $(go.Part,
                {
                pickable: false, layerName: "Grid", visible: false,
                isAnimated: false, locationSpot: go.Spot.Left
                },
                $(go.Shape, { geometryString: "M0 0 H15", strokeWidth: 2, stroke: "red" })
            );

        function updateScales() {
            var vb = dia.viewportBounds;
            if (!vb.isReal()) return;
            dia.commit(function(diag) {
              // Update properties of horizontal scale to reflect viewport
                gradScaleHoriz.elt(0).width = diag.viewportBounds.width * diag.scale;
                gradScaleHoriz.location = new go.Point(vb.x, vb.y);

                console.log("VIEWPORT X IS " + vb.x+ " and " + vb.right);
                console.log("VIEWPORT Y IS " + vb.y +" and "+ vb.bottom); //why the hell are you not zero
                console.log(dia.position);
                gradScaleHoriz.graduatedMin = vb.x;
                gradScaleHoriz.graduatedMax = vb.right;
                gradScaleHoriz.scale = 1 / diag.scale;
                // Update properties of vertical scale to reflect viewport
                gradScaleVert.elt(0).height = diag.viewportBounds.height * diag.scale;
                gradScaleVert.location = new go.Point(vb.x, vb.y);
                gradScaleVert.graduatedMin = vb.y;
                gradScaleVert.graduatedMax = vb.bottom;
                gradScaleVert.scale = 1 / diag.scale;
            }, null);
          }

          function updateIndicators() {
            var vb = dia.viewportBounds;
            if (!vb.isReal()) return;
            dia.commit(function(diag) {
              var mouseCoords = diag.lastInput.documentPoint;
              console.log(diag.lastInput.documentPoint);
              console.log(diag.scale);
                console.log(gradIndicatorHoriz.text)
              // Keep the indicators in line with the mouse as viewport changes or mouse moves
              gradIndicatorHoriz.location = new go.Point(Math.max(mouseCoords.x, vb.x), vb.y);
              gradIndicatorHoriz.scale = 1 / diag.scale;
              gradIndicatorVert.location = new go.Point(vb.x, Math.max(mouseCoords.y, vb.y));
              gradIndicatorVert.scale = 1 / diag.scale;
            }, null);
          }
          function showIndicators(show) {
            dia.commit(function(diag) {
              gradIndicatorHoriz.visible = show;
              gradIndicatorVert.visible = show;
            }, null);
          }

        // Override mousemove Tools such that doMouseMove will keep indicators in sync
        dia.toolManager.doMouseMove = function() {
            go.ToolManager.prototype.doMouseMove.call(this);
            updateIndicators();
        }
        dia.toolManager.linkingTool.doMouseMove = function() {
            go.LinkingTool.prototype.doMouseMove.call(this);
            updateIndicators();
        }
        dia.toolManager.draggingTool.doMouseMove = function() {
            go.DraggingTool.prototype.doMouseMove.call(this);
            updateIndicators();
        }
        dia.toolManager.dragSelectingTool.doMouseMove = function() {
            go.DragSelectingTool.prototype.doMouseMove.call(this);
            updateIndicators();
        }

        // ---RULER & INDICATORS END ---
        function setupScalesAndIndicators(){
            dia.commit(function(d){
                d.add(gradScaleHoriz);
                d.add(gradScaleVert);
                d.add(gradIndicatorHoriz);
                d.add(gradIndicatorVert);
                // d.add(posiIndicator);
                
                // initialising 
                updateScales();
                updateIndicators();
            }, null);  // null says to skip UndoManager recording of changes
        }
        

        dia.addDiagramListener("InitialLayoutCompleted",setupScalesAndIndicators);
        dia.addDiagramListener("InitialLayoutCompleted", updateScales);
        dia.addDiagramListener("InitialLayoutCompleted", updateIndicators);
        dia.addDiagramListener("ViewportBoundsChanged", updateScales);
        dia.addDiagramListener("ViewportBoundsChanged", updateIndicators);
        dia.mouseEnter= function(){showIndicators(true);};
        dia.mouseLeave= function(){showIndicators(false);};
        return dia;
	}

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
