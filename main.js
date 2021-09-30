// get all sketch-src paths and put in array
const all_sketches = document.querySelectorAll('.scene-container');

all_sketches.forEach(sketch => {
  let sketch_path = sketch.dataset.sketchSrc;

  let iframe = document.createElement('iframe');
  iframe.src = sketch_path;
  iframe.width = '800';
  iframe.height = '550';
  sketch.append(iframe);
});

// 550/225 - x / 550