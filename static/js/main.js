var parrot = document.getElementById('parrot');
var parrot_icon = document.getElementById('parrot_icon');
var play_pause_button = document.getElementById('player-play');
var chat_header = document.getElementById('chat_header');
var chat = document.getElementById('chat_frame');
var chat_iframe = document.getElementById('chat_iframe');
var chat_toggle = document.getElementById('chat-toggle');
var whos_playin_field = document.getElementById("whos_playin");
var whos_here_field = document.getElementById("whos_here");
var whats_playin_field = document.getElementById("whats_playin");
var stream_description_field = document.getElementById("stream_description");

whats_cookin();
whos_here();
play('bg_player');

function getSessionID() {
  let _id = localStorage['sessionID']
  if (!_id) {
    _id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
    localStorage['sessionID'] = _id
  }
  return _id
}

function play(id){
  clearTimeout(whats_cookin);
  whats_cookin();
  player = document.getElementById(id);
  // bg = document.getElementById('video-player');
  play_pause_button.innerHTML = "▪ Pause";
  parrot.setAttribute("src", "/images/partyparrot.gif");
  parrot_icon.setAttribute("href", "/images/partyparrot.gif");
  play_pause_button.setAttribute("onclick", "pause('bg_player')"); 
  player.load();
  player.play();
  // bg.play();
}

function pause(id){
  whats_cookin("stop");
  player = document.getElementById(id);
  // bg = document.getElementById('video-player');
  play_pause_button.innerHTML = "▸ Play"; 
  parrot.setAttribute("src", "/images/confusedparrot.gif");
  parrot_icon.setAttribute("href", "/images/confusedparrot.gif");
  play_pause_button.setAttribute("onclick", "play('bg_player')"); 
  player.pause();
  // bg.pause();
}

var volume_click_counter = 0;

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
  		if (volume_click_counter == 4){
  			alert("Варто сходити до ЛОРа..")
  			volume_click_counter=0
  		} else {
  			volume_click_counter++
  		}
  	} else {
  		player.volume = player.volume + 1/steps;
  	}
  }
}

function activate_chat() {
  chat_iframe.setAttribute("src", "https://hack.chat/?radiotusovka"); 
  chat.setAttribute("style", "display: table-cell")
  chat_header.setAttribute("style", "display: table-header-group")
  chat_toggle.innerHTML = "Deactivate chat";
  chat_toggle.setAttribute("onclick", "deactivate_chat()"); 
}

function deactivate_chat() {
  chat_iframe.setAttribute("src", "");
  chat.setAttribute("style", "display: none")
  chat_header.setAttribute("style", "display: none");
  chat_toggle.innerHTML = "Activate chat";
  chat_toggle.setAttribute("onclick", "activate_chat()"); 
}

function whos_here(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange=function() {
    if (this.readyState == 4 && this.status == 200) {
      var count = this.responseText;
      if ( count == '1' ){
        whos_here_field.innerHTML = "You are the one listening";
      } else {
        whos_here_field.innerHTML = "Listeners: " + count;
      }
      
    }
  };
  var url = "whos_here"
  var params = `?id=${getSessionID()}`
  //+"/"+random_id //global random id see 1st line
  xhttp.open("GET", url+params, true);
  xhttp.send();
  setTimeout(whos_here, 60000); //repeat every minute
}

function whats_cookin(mode) {
  if (mode == "stop") {
    clearTimeout(whats_cookin);
    // document.getElementById("whos_playin").innerHTML = "Press play to fetch";
    // document.getElementById("whats_playin").innerHTML = "Press play to fetch";
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
    if ( json_data.icestats.source[0] ){
      whos_playin_field.innerHTML = json_data.icestats.source[0].server_name;
      whos_playin_field.href = '/'+json_data.icestats.source[0].server_name;

      // mp3 and ogg have different format of metadata in resulting json, need to parse them differently

      if ( json_data.icestats.source[0].server_type == "audio/mpeg" ){
        whats_playin_field.innerHTML = json_data.icestats.source[0].title;
      } else if ( json_data.icestats.source[0].server_type == "application/ogg" ){
        whats_playin_field.innerHTML = json_data.icestats.source[0].artist + ' - ' + json_data.icestats.source[0].title;
      } else {
        whats_playin_field.innerHTML = "ID : ID";
      }
    } else {
      whos_playin_field.innerHTML = json_data.icestats.source.server_name;
      whos_playin_field.href = '/'+json_data.icestats.source.server_name;
      if ( json_data.icestats.source.server_type == "audio/mpeg" ){
        whats_playin_field.innerHTML = json_data.icestats.source.title;
      } else if ( json_data.icestats.source.server_type == "application/ogg" ){
        whats_playin_field.innerHTML = json_data.icestats.source.artist + ' - ' + json_data.icestats.source.title;
      } else {
        whats_playin_field.innerHTML = "ID : ID";
      }
    }

    stream_description_field.innerHTML = json_data.icestats.source.server_description;
  } else {
    whos_playin_field.innerHTML = "Nobody's playing..";
    whats_playin_field.innerHTML = "Check back later ;)";
  }
}