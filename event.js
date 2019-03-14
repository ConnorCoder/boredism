var game = {points: 0, pointspc: 1, chance: 100, pointsps: 0, time: 0}; //Default Stats

if (localStorage.getItem('points') === null) { //Load Game
	localStorage.setItem('points', 0);
}else {
	game.points = parseInt(localStorage.getItem('points'));
}
if (localStorage.getItem('pointspc') === null) {
	localStorage.setItem('pointspc', 1);
}else {
	game.pointspc = parseInt(localStorage.getItem('pointspc'));
}
if (localStorage.getItem('chance') === null) {
	localStorage.setItem('chance', 100);
}else {
	game.chance = parseInt(localStorage.getItem('chance'));
}
if (localStorage.getItem('pointsps') === null) {
	localStorage.setItem('pointsps', 0);
}else {
	game.pointsps = parseInt(localStorage.getItem('pointsps'));
}
if (localStorage.getItem('time') === null) {
	var today = new Date();
	localStorage.setItem('time', Math.floor(today.getTime() / 1000));
}else {
	game.time = parseInt(localStorage.getItem('time'));
	var x = new Date();
	var y = Math.floor(x.getTime() / 1000);
	game.points += (y - game.time) * game.pointsps;
}
function reset() {
	game.points = 0;
	game.pointspc = 1;
	game.chance = 100;
	game.pointsps = 0;
	game.time = 0;
}
function btnclick() { //Function ran when button is clicked
	var rand = Math.floor(Math.random() * game.chance) + 1;
	var btn = document.getElementById("game-btn");
	game.points += game.pointspc;
	if (rand !== 1) {
  		var random = Math.floor(Math.random() * 76) + 10;
  		var random2 = Math.floor(Math.random() * 86) + 5;
  		btn.style.right = random + "%";
  		btn.style.top = random2 + "%";
	}
}
function upgrade(x) { //All Upgrades/Purchases
	if (x < 19) {
		if (game.points >= Math.pow(10, x)) {
			game.pointspc += Math.pow(10, x - 2);
			game.points -= Math.pow(10, x);
		}
	}else if (x < 22) {
      		if (game.points >= Math.pow(10, x - 13)) {
        		game.chance -= Math.pow(10, x - 19);
        		game.points -= Math.pow(10, x - 13);
      		}
    	}else if (x < 31) {
		if (game.points >= Math.pow(10, x - 19)) {
			game.pointsps += Math.pow(10, x - 22);
			game.points -= Math.pow(10, x - 19);
		}
	}
}

function savegame() {
  	localStorage.setItem("pointspc", game.pointspc);
  	localStorage.setItem("pointsps", game.pointsps);
  	localStorage.setItem("chance", game.chance);
  	localStorage.setItem("points", game.points);
	var x = new Date();
	var y = Math.floor(x.getTime() / 1000);
	localStorage.setItem("time", y);
  
}

function hideall() {
	document.getElementById("pointspc").style.display = "none";
	document.getElementById("chance").style.display = "none";
	document.getElementById("pointsps").style.display = "none";
}

function repeat() {
	var x = document.getElementById("game-localstorage");
	savegame();
	x.innerHTML = "Last Save: Points = " + localStorage.getItem("points") + ", PointsPc = " + localStorage.getItem("pointspc") + ", Chance = " + localStorage.getItem("chance") + ", PointsPs = " + localStorage.getItem("pointsps") + ", Time = " + localStorage.getItem("time");
	document.getElementById("game-pointspc").innerHTML = "Points Per Click: " + game.pointspc;
    	document.getElementById("game-points").innerHTML = "Points: " + game.points;
	document.getElementById("game-pointsps").innerHTML = "Points Per Second: " + game.pointsps;
	var opt = document.getElementById("select").value;
	if (opt == parseInt(0)) {
		hideall();
		document.getElementById("pointspc").style.display = "block";
	}else if (opt == parseInt(1)) {
		hideall();
		document.getElementById("chance").style.display = "block";
	}else if (opt == parseInt(2)) {
		hideall();
		document.getElementById("pointsps").style.display = "block";
	}
}
setInterval(repeat, 0);

function pps() {
	game.points += game.pointsps;
}
setInterval(pps, 1000);
