var two = new Two({fullscreen: true}).appendTo(document.getElementById('draw-shapes'));
var state = 0;
var shopState = 0;
var placementState = 0;
var enemies = [];
var towers = [];
var tileLayer = two.makeGroup();
var gameLayer = two.makeGroup();
var UILayer = two.makeGroup();
