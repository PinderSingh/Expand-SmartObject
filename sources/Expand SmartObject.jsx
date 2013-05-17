/**
 * ------------------------------------------------------------
 * Copyright (c) 2013 Artem Matevosyan
 * ------------------------------------------------------------
 */

#target photoshop

//=============================================================================
// Expand SmartObject
//=============================================================================


// @include 'include/stdlib.js'

main();

function main(){

	var doc;
	var activeLayer;

	// Check if there is a document
	try {
		doc = app.activeDocument;
	} catch(e){
		alert("No documents found");
		return 'cancel';
	}

	// Check if the layer is selected
	activeLayer = doc.activeLayer;

	// Check if the selected layer is a smart objects
	if ( activeLayer.kind != LayerKind.SMARTOBJECT ){
		alert('Currently selected layer is not a Smart Object');
		return 'cancel';
	}

	// Get the boundaries of the current layer
	var bounds = Stdlib.getLayerBounds(doc, activeLayer);

	// Open smart object
	var smartObjectDoc = Stdlib.editSmartObject(doc, activeLayer);

	// Resize smart object doc to the size of the parent doc considering the boundaries
	smartObjectDoc.trim(TrimType.TRANSPARENT);

	var desc;

	desc = new ActionDescriptor();
	desc.putBoolean(cTID('Rltv'), true);
	desc.putUnitDouble( cTID('Wdth'), cTID('#Pxl'), bounds[0]);
	desc.putUnitDouble( cTID('Hght'), cTID('#Pxl'), bounds[1]);
	desc.putEnumerated( cTID('Hrzn'), cTID('HrzL'), cTID('Rght') );
	desc.putEnumerated( cTID('Vrtc'), cTID('VrtL'), cTID('Btom') );
	executeAction( cTID('CnvS'), desc, DialogModes.NO );

	desc = new ActionDescriptor();
	desc.putBoolean(cTID('Rltv'), true);
	desc.putUnitDouble( cTID('Wdth'), cTID('#Pxl'), doc.width.as('px') - bounds[2] );
	desc.putUnitDouble( cTID('Hght'), cTID('#Pxl'), doc.height.as('px') - bounds[3] );
	desc.putEnumerated( cTID('Hrzn'), cTID('HrzL'), cTID('Left') );
	desc.putEnumerated( cTID('Vrtc'), cTID('VrtL'), cTID('Top ') );
	executeAction( cTID('CnvS'), desc, DialogModes.NO );

	// Select all layers
	smartObjectDoc.activeLayer = smartObjectDoc.layers[0];
	var top = smartObjectDoc.layers[0];
	var bottom = smartObjectDoc.layers[smartObjectDoc.layers.length-1];
	var bidx = Stdlib.getLayerIndex(smartObjectDoc, bottom);
	extendLayerSelectionToIndex(bidx);

	// Duplicate to the parent document
	var transportLayerSet = Stdlib.newGroupFromLayers(smartObjectDoc);
	transportLayerSet.duplicate(activeLayer, ElementPlacement.PLACEBEFORE);

	// Close the smart object doc without saving
	smartObjectDoc.close(SaveOptions.DONOTSAVECHANGES);

	// Hide the smart object layer
	activeLayer.visible = false;

	// Ungroup the transporter group
	var transportLayerSet = doc.activeLayer;
	Stdlib.ungroupLayers(doc, transportLayerSet);

	return;

}

function extendLayerSelectionToIndex(index) {
	var desc = new ActionDescriptor();
	var ref = new ActionReference();
	ref.putIndex(cTID('Lyr '), index);
	desc.putReference(cTID('null'), ref);
	desc.putEnumerated(sTID('selectionModifier'),
	               sTID('selectionModifierType'),
	               sTID('addToSelectionContinuous'));
	desc.putBoolean(cTID('MkVs'), false);
	executeAction(cTID('slct'), desc, DialogModes.NO);
}
