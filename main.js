// get all sketch-src paths and put in array?

let sketch = document.querySelector('#scene-01-drive');
let sketch_id = sketch.getAttribute('id');
let sketch_path = sketch.dataset.sketchSrc;

console.log(sketch_id)
console.log(sketch)
console.log(sketch_path)

// sketch.append(
//   "<iframe id='sketchframe-"+sketch_id+"' src='"+sketch_path+
//               "' width='400' height='400' frameborder='0'></iframe>"
// );

let iframe = document.createElement('iframe');
iframe.src = sketch_path;
iframe.height = '400';
iframe.width = '400';
sketch.append(iframe);