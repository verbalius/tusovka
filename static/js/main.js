document.addEventListener("DOMContentLoaded", function(event) { 
  whats_cookin();
  // whos_here();
});

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
  button = document.getElementById('player-play');
  document.getElementById('player-play').innerHTML = "▪ Pause";
  document.getElementById('parrot').setAttribute("src", "/images/partyparrot.gif");
  document.getElementById('parrot_icon').setAttribute("href", "/images/partyparrot.gif");
  button.setAttribute("onclick", "pause('bg_player')"); 
  player.load();
  player.play();
  // bg.play();
}

function pause(id){
  whats_cookin("stop");
  player = document.getElementById(id);
  // bg = document.getElementById('video-player');
  button = document.getElementById('player-play');
  button.innerHTML = "▸ Play"; 
  document.getElementById('parrot').setAttribute("src", "/images/confusedparrot.gif");
  document.getElementById('parrot_icon').setAttribute("href", "/images/confusedparrot.gif");
  button.setAttribute("onclick", "play('bg_player')"); 
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
  chat_header = document.getElementById('chat_header');
  chat = document.getElementById('chat_frame');
  chat_iframe = document.getElementById('chat_iframe');
  chat_iframe.setAttribute("src", "https://hack.chat/?radiotusovka"); 
  chat.setAttribute("style", "display: table-cell")
  chat_header.setAttribute("style", "display: table-header-group")
  button = document.getElementById('chat-toggle');
  document.getElementById('chat-toggle').innerHTML = "Deactivate chat"
  button.setAttribute("onclick", "deactivate_chat()"); 
}

function deactivate_chat() {
  chat_header = document.getElementById('chat_header');
  chat = document.getElementById('chat_frame');
  chat_iframe = document.getElementById('chat_iframe');
  chat_iframe.setAttribute("src", "");
  chat.setAttribute("style", "display: none")
  chat_header.setAttribute("style", "display: none")
  button = document.getElementById('chat-toggle');
  document.getElementById('chat-toggle').innerHTML = "Activate chat"
  button.setAttribute("onclick", "activate_chat()"); 
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
      document.getElementById("whos_playin").innerHTML = json_data.icestats.source[0].server_name;
      document.getElementById("whos_playin").href = '/'+json_data.icestats.source[0].server_name;

      if ( json_data.icestats.source[0].listeners == '1' ){
        document.getElementById("whos_here").innerHTML = "You are the one listening"
      } else {
        document.getElementById("whos_here").innerHTML = "Listeners: " + json_data.icestats.source[0].listeners;
      }
      // mp3 and ogg have different format of metadata in resulting json, need to parse them differently

      if ( json_data.icestats.source[0].server_type == "audio/mpeg" ){
        document.getElementById("whats_playin").innerHTML = json_data.icestats.source[0].title;
      } else if ( json_data.icestats.source[0].server_type == "application/ogg" ){
        document.getElementById("whats_playin").innerHTML = json_data.icestats.source[0].artist + ' - ' + json_data.icestats.source[0].title;
      } else {
        document.getElementById("whats_playin").innerHTML = "ID : ID";
      }
    } else {
      if ( json_data.icestats.source.listeners == '1' ){
        document.getElementById("whos_here").innerHTML = "You are the one listening"
      } else {
        document.getElementById("whos_here").innerHTML = "Listeners: " + json_data.icestats.source.listeners;
      }
      document.getElementById("whos_playin").innerHTML = json_data.icestats.source.server_name;
      document.getElementById("whos_playin").href = '/'+json_data.icestats.source.server_name;
      if ( json_data.icestats.source.server_type == "audio/mpeg" ){
        document.getElementById("whats_playin").innerHTML = json_data.icestats.source.title;
      } else if ( json_data.icestats.source.server_type == "application/ogg" ){
        document.getElementById("whats_playin").innerHTML = json_data.icestats.source.artist + ' - ' + json_data.icestats.source.title;
      } else {
        document.getElementById("whats_playin").innerHTML = "ID : ID";
      }
    }
    document.getElementById("stream_description").innerHTML = json_data.icestats.source.server_description;
  } else {
    document.getElementById("whos_playin").innerHTML = "Nobody's playing right now, check <a href='/schedule'>schedule</a>;"
    document.getElementById("whats_playin").innerHTML = "Artist - Title";
  }
}