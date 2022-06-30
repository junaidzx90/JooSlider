$(document).ready(function () {
    "no_strict"
    const slider = new JooSlider({
      warpper: '#slider', 
      slider: '.slider_inner', 
      next: '.slider_next', 
      prev: '.slider_prev',
      thumbnails: '.thumbnails',
      thumb: '.thumb',
      speed: 500,
      thumbSize: 5,
      zoomClass: 'zoom',
      closeZoom: '.closeFullscreen'
    });
});