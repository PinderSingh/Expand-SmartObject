# Expand SmartObject.jsx

This is a Photoshop script that allows you to expand a SmartObject in place. All the content of the SmartObject will be placed in its exact location in the parent document. The source SmartObject will become invisible afterwards.

Works with Photoshop CS4 or higher.

## How it works

Effectively what the script does is it opens your SmartObject, trims it, resizes the canvas to fit the size of your parent document, groups everything and duplicates the group to the parent document.

A few things to keep in mind:

* Some placement inaccuracy may be introduced if your SmartObject is not aligned with pixel grid. Say some of bounds have a value like `100,5`.
* No transformation, filters or whatever else applied to the SmartObject itself will be kept

## Installation

Just download the file `Expand SmartObject.jsx` from the root of the repository to your `Scripts` directory and restart Photoshop.

On Windows:

	C:\Program Files\Adobe\Adobe Photoshop CS4 (64 Bit)\Presets\Scripts
	
On Mac:

	/Applications/Adobe Photoshop CS4/Presets/Scripts

## License 

MIT

## Thanks

I want to thank [Kamil Khadeyev](http://blog.kam88.com/) for the inspiration.
