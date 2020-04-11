whats_cookin();

function play(id){
  clearTimeout(whats_cookin);
  whats_cookin();
  player = document.getElementById(id);
  bg = document.getElementById('video-player');
  player.load();
  player.play();
  bg.play();
}

function pause(id){
  whats_cookin("stop");
  player = document.getElementById(id);
  bg = document.getElementById('video-player');
  player.pause();
  bg.pause();
}

volume_click_counter = 0;

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

function whats_cookin(mode) {
  if (mode == "stop") {
    clearTimeout(whats_cookin);
    document.getElementById("whos_playin").innerHTML = "";
    document.getElementById("whats_playin").innerHTML = "Paused";
    return;
  }
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange=function() {
    if (this.readyState == 4 && this.status == 200) {
      parse_who_and_what(this.responseText);
    }
  };
  xhttp.open("GET", "whats_playin", true);
  xhttp.send();

  // checking who is playing every 30 seconds
  setTimeout(whats_cookin, 30000);
}

function parse_who_and_what(raw_json_data) {
  var json_data = JSON.parse(raw_json_data);
  if ( json_data.icestats.source ) {
    document.getElementById("whos_playin").innerHTML = json_data.icestats.source[0].server_name;
    document.getElementById("whos_playin").innerHTML.href = '/'+json_data.icestats.source[0].server_name;

    // mp3 and ogg have different format of metadata in resulting json, need to parse them differently

    if ( json_data.icestats.source[0].server_type == "audio/mpeg" ){
      document.getElementById("whats_playin").innerHTML = json_data.icestats.source[0].title;
    } else if ( json_data.icestats.source[0].server_type == "application/ogg" ){
      document.getElementById("whats_playin").innerHTML = json_data.icestats.source[0].artist + json_data.icestats.source[0].title;
    } else {
      document.getElementById("whats_playin").innerHTML = "ID : ID";
    }
  } else {
    document.getElementById("whos_playin").innerHTML = "Nobody's playing..";
    document.getElementById("whats_playin").innerHTML = "Check back later ;)";
  }
}