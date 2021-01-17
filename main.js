// get all sketch-src paths and put in array?
const all_sketches = document.querySelectorAll('.scene-container');

all_sketches.forEach(sketch => {
  // let sketch_id = sketch.getAttribute('id');
  let sketch_path = sketch.dataset.sketchSrc;

  let iframe = document.createElement('iframe');
  iframe.src = sketch_path;
  iframe.height = '400';
  iframe.width = '400';
  sketch.append(iframe);
});