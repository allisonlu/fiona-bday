/*
  Scene object

  Every scene will have the following:
    - background image property
    
    - start() function to start scene

*/

class Scene {
  constructor(img) {
    this.img = img;
  }

  start() {
    background(this.img);
  }
}