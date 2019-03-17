var game = {points: 0, pointspc: 1, chance: 100, pointsps: 0, time: 0, total: 0, codes: "00"}; //Default Stats

function newpos() {
	var btn = document.getElementById("game-btn");
  	var random = Math.floor(Math.random() * 76) + 10;
  	var random2 = Math.floor(Math.random() * 86) + 5;
  	btn.style.right = random + "%";
  	btn.style.top = random2 + "%";
}

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
if (localStorage.getItem('total') === null) {
	localStorage.setItem('total', 0);
}else {
	game.total = parseInt(localStorage.getItem('total'));
}
if (localStorage.getItem('time') === null) {
	var today = new Date();
	localStorage.setItem('time', Math.floor(today.getTime() / 1000));
}else {
	game.time = parseInt(localStorage.getItem('time'));
	var x = new Date();
	var y = Math.floor(x.getTime() / 1000);
	game.points += (y - game.time) * game.pointsps;
	game.total += (y - game.time) * game.pointsps;
}
if (localStorage.getItem('codes') === null) {
	localStorage.setItem('codes', "00");
}else {
	game.codes = localStorage.getItem('codes');
}
function reset() {
	game.points = 0;
	game.pointspc = 1;
	game.chance = 100;
	game.pointsps = 0;
	game.time = 0;
	game.total = 0;
	game.codes = "00";
}

function btnclick() { //Function ran when button is clicked
	var rand = Math.floor(Math.random() * game.chance) + 1;
	var btn = document.getElementById("game-btn");
	game.points += game.pointspc;
	game.total += game.pointspc;
	if (rand !== 1) {
		newpos();
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
        		game.chance -= Math.pow(10, x - 20);
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
	localStorage.setItem("total", game.total);
	localStorage.setItem("codes", game.codes);
  
}

function hideall() {
	document.getElementById("pointspc").style.display = "none";
	document.getElementById("chance").style.display = "none";
	document.getElementById("pointsps").style.display = "none";
}
function backg(x) {
	document.getElementsByClassName("no-use")[0].style.backgroundColor = x;
}

function repeat() {
	var x = document.getElementById("game-localstorage");
	savegame();
	x.innerHTML = "Last Save: Points = " + localStorage.getItem("points") + ", PointsPc = " + localStorage.getItem("pointspc") + ", Chance = " + localStorage.getItem("chance") + ", PointsPs = " + localStorage.getItem("pointsps") + ", Time = " + localStorage.getItem("time") + ", Total = " + localStorage.getItem('total');
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
	if (game.total < 100) {
		backg("red");
	}else if (game.total < 100000) {
		backg("orange");
	}else if (game.total < 100000000) {
		backg("yellow");
	}else if (game.total < 100000000000) {
		backg("green");
	}else if (game.total < 100000000000000) {
		backg("blue");
	}else if (game.total < 100000000000000000) {
		backg("purple");
	}else if (game.total < 100000000000000000000) {
		backg("gold");
	}
}
setInterval(repeat, 0);

function pps() {
	game.points += game.pointsps;
	game.total += game.pointsps;
}
setInterval(pps, 1000);

function code() {
	var x = prompt("Enter Code:", "");
	if (x == "H4CK3R") {
		if (game.codes[0] == "0") {
			game.codes = "1" + game.codes[1];
			game.pointsps += 100000000;
		}else {
			alert("Already Redeemed!");
		}
	}
	if (x == "R41NB0W") {
		if (game.codes[1] == "0") {
			game.codes = game.codes[0] + "1";
			game.pointspc += 123456789;
		}else {
			alert("Already Redeemed!");
		}
	}
}
