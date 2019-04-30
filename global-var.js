var two = new Two({fullscreen: true}).appendTo(document.getElementById('draw-shapes'));
var scale = Math.min(1, two.width/2000);
console.log(two.width);
console.log(scale);
two.load('res/bg.svg', function(svg) {})
var state = 0;
var shopState = 0;
var placementState = 0;
var enemies = [];
var towers = [];
var gameSpeed = 1;

var bgLayer = two.makeGroup();
var tileLayer = two.makeGroup();
var gameLayer = two.makeGroup();
var UILayer = two.makeGroup();

bgLayer.scale = scale;
tileLayer.scale = scale;
gameLayer.scale = scale;
UILayer.scale = scale;

var screenWidth = 17 * 100 * scale;

//Player Data
var player_max_health = 20
var player_health = player_max_health;// initial numbers
var player_health_visual = player_health;
var player_currency = 5;
var player_regen_rate = 1000;// millisecond until next health
var regen_time = 0;
//Player ui
