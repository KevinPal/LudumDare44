var two = new Two({fullscreen: true}).appendTo(document.getElementById('draw-shapes'));
var state = 0;
var shopState = 0;
var placementState = 0;
var enemies = [];
var towers = [];
var tileLayer = two.makeGroup();
var gameLayer = two.makeGroup();
var UILayer = two.makeGroup();


//Player Data
var player_max_health = 20
var player_health = player_max_health;// initial numbers
var player_currency = 5;
var player_regen_rate = 1000;// millisecond until next health
var regen_time = 0;
//Player ui
var two_health = new Two.Text("" + player_health)
var two_currency = new Two.Text("" + player_currency)
two_health.translation = new Two.Vector(two.width/2, two.height/2)
two_currency.translation = new Two.Vector(two.width/2, two.height/2 + 50)
UILayer.add(two_health)
UILayer.add(two_currency)
