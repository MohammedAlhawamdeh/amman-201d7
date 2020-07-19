'use strict';

var randomizerButton = document.getElementById('randomizer');

randomizerButton.addEventListener('click', randomize);

function randomize(){
  var levees = document.getElementById('levees');
  levees.volume = Math.random();
  levees.autoplay = true;
}



var doggoVideo = document.getElementById('doggoVideo');

doggoVideo.volume = 0.2;
doggoVideo.volume = 0.0;