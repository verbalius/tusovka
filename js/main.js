function play(id){
  player = document.getElementById(id);
  bg = document.getElementById('video-player');
  player.load();
  player.play();
  bg.play();
}

function pause(id){
  player = document.getElementById(id);
  bg = document.getElementById('video-player');
  player.pause();
  bg.pause();
}

volume_click_counter=0

function volume(id, direction){
  player = document.getElementById(id);
  // volume varies from 0 to 1
  // using 10 steps volume
  steps = 4
  if(player.volume >= 0 && direction == "down"){
  	if (player.volume < 1/steps) {
  		player.volume = 0
  	} else {
  		player.volume = player.volume - 1/steps;
  	}
  } else if(player.volume <= 1 && direction == "up") {
  	if (player.volume + 1/steps >= 1) {
  		player.volume = 1
  		if (volume_click_counter==4){
  			alert("глухий/a?")
  			volume_click_counter=0
  		} else {
  			volume_click_counter++
  		}
  	} else {
  		player.volume = player.volume + 1/steps;
  	}
  }
}

// //Changes the volume up or down a specific number
// function changeVolume(number, direction){
//   //Checks to see if the volume is at zero, if so it doesn't go any further.
//   if(activeSong.volume >= 0 && direction == "down"){
//     activeSong.volume = activeSong.volume - (number / 100);
//   }

//   //Checks to see if the volume is at one, if so it doesn't go any higher.
//     if(activeSong.volume activeSong.volume = activeSong.volume + (number / 100);
//   }

//   //Finds the percentage of the volume and sets the volume meter accordingly.
//   var percentageOfVolume = activeSong.volume / 1;
//   var percentageOfVolumeSlider = document.getElementById('volumeMeter').offsetWidth * percentageOfVolume;

//   document.getElementById('volumeStatus').style.width = Math.round(percentageOfVolumeSlider) + "px";
// }