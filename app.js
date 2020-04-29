(function(window,undefined){
    'use strict';
var canvas=null,ctx=null;
var player = null;
var pressing = [], lastPress=null;
var KEY_LEFT=37, KEY_UP=38,KEY_RIGHT=39,KEY_DOWN=40,KEY_ENTER=13,KEY_SPACE=32;
var pause=false,gameover=false;
var cam = null;
var spritesheet=new Image();
var worldWidth=0,worldHeight=0;
var elapsed=0;
var color='#000';
//MAPS
var wall = [],
lava = [],
currentMap=0;
var maps=[];
maps[0] = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1, 0, 0, 1],
    [0, 2, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1, 0, 0, 0],
    [0, 2, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
],
maps[1] = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 2, 0, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 0, 0, 2, 2, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 0, 2, 2, 2, 2, 0, 1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 1, 0, 1, 1, 2, 2, 2, 2, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 0, 0, 0, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 1, 0, 1, 1, 2, 2, 2, 2, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 1, 1, 0, 1, 1, 2, 2, 2, 1, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 0, 2, 2, 2, 2, 0, 1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 2, 0, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 0, 0, 2, 2, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 2, 2, 2, 0, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 2, 0, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
    [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
maps[2] = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 1, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 2, 1, 1, 1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1, 1, 2, 0, 1],
    [1, 2, 2, 1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1, 2, 2, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 2, 2, 0, 0, 4, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 4, 0, 0, 2, 2, 1],
    [1, 2, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 2, 2, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 2, 2, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 2, 2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 0, 0, 0, 1, 1, 1, 0, 2, 2, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 2, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 2, 0, 0, 0, 0, 0, 1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 0, 0, 0, 0, 1],
    [1, 2, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1],
    [1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
var enemies=[];
function setMap (map,blocksize){
    var col=0,row=0,columns=0,rows=0,enemy=null;
    wall.length=0;
    lava.length=0;
    enemies.length = 0;
    for (row = 0 ,rows=map.length; row<rows;row++){
        for (col = 0,columns=map[row].length;col<columns;col++){
            if (map[row][col]===1){
                wall.push(new Rectangle2D(col*blocksize,row*blocksize,blocksize,blocksize,true));
            }else if (map[row][col]===2){
                lava.push(new Rectangle2D(col*blocksize,row*blocksize,blocksize,blocksize,true));
            }else if(map[row][col]>2){
                enemy = new Rectangle2D(col*blocksize,row*blocksize,blocksize,blocksize,true);
                if(map[row][col]===3){
                    enemy.vx= 5;
                    enemy.dir=1;
                }else if(map[row][col]===4){
                    enemy.vy=5;
                    enemy.dir=2;
                }
                enemies.push(enemy);
            } 
        }
    }
    worldWidth=columns * blocksize
    worldHeight=rows * blocksize
}
function Rectangle2D (x,y,width,height,createFromTopLeft){
    this.width = (width===undefined)?0:width;
    this.height = (height===undefined)?this.width:height;
        if(createFromTopLeft){
            this.left = (x===undefined)?0:x;
            // this.right = this.left + this.width;
            this.top = (y===undefined)?0:y;
            // this.bottom = this.top + this.height;
        }else{
            this.x =(x===undefined)?0:x;
            this.y = (y===undefined)?0:y;
        }
}
Rectangle2D.prototype = {
    left : 0,
    top : 0,
    width:0,
    height:0,
    vx:0,
    vy:0,
    dir:0,
    timer:0,

    get x() {
        return this.left + this.width/2;
    },
    set x(value){
        this.left = value - this.width/2;
    },
    get y (){
        return this.top + this.height/2;
    },
    set y(value){
        this.top = value - this.height/2;
    },
    get right(){
        return this.left + this.width;
    },
    set right (value){
        this.left = value - this.width;
    },
    get bottom(){
        return this.top + this.height;
    },
    set bottom(value){
        this.top = value -this.height;
    },

    contains: function(rect){
        if(rect!==undefined){
          return (this.left < (rect.left || rect.x)&&
                this.right > (rect.right || rect.x)&&
                this.top < (rect.top || rect.y)&&
                this.bottom > (rect.bottom || rect.y));
        }
    },
    intersects : function(rect){
        if (rect!==undefined){
            return(this.left < rect.right &&
                this.right > rect.left &&
                this.bottom > rect.top &&
                this.top < rect.bottom)
        }
    },
    fill : function(ctx,cam){
        if (ctx !==undefined){
            if(cam !== undefined){
            ctx.fillRect(this.left - cam.x ,this.top - cam.y ,this.width,this.height);
            }else {
                ctx.fillRect(this.left,this.top,this.width,this.height);
            }
        }
    },
    stroke : function(ctx){
        if(ctx!==undefined){
            ctx.strokeRect(this.left,this.top,this.width,this.height);   
        }
    },
    drawImageArea: function (ctx,cam,img,sx,sy,sw,sh){
        if(ctx!==undefined){
            if(cam!==undefined){
            if(img.width){
                ctx.drawImage(img,sx,sy,sw,sh, this.left - cam.x , this.top - cam.y,this.width,this.height);
                }else{
                ctx.strokeRect(this.left - cam.x,this.top - cam.y,this.width,this.height);
                }
            }else {if(img.width){
                ctx.drawImage(img,sx,sy,sw,sh,this.left,this.top,this.width,this.height);
                }else{
                ctx.strokeRect(this.left,this.top,this.width,this.height);
                }
            }
        }
    }
};
function Camera(){
    this.x=0;
    this.y=0;
}
Camera.prototype ={
    constructor : Camera,
    
    focus : function(x,y){
        this.x = x - canvas.width/2
        this.y = y - canvas.height/2
        if(this.x<0){
            this.x=0
        }else if(this.x+canvas.width>worldWidth){
            this.x=worldWidth-canvas.width
        }
        if(this.y<0){
            this.y=0
        }else if(this.y+canvas.height>worldHeight){
            this.y=worldHeight-canvas.height
        }
       
       
    }
};
function enableInputs (){
    document.addEventListener('keydown',function(evt){
        pressing[evt.which]=true;
        lastPress=evt.which;
    },false)
    document.addEventListener('keyup',function(evt){
        pressing[evt.which]=false;
    },false)
}

function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width=300;
    canvas.height=200;

    player = new Rectangle2D(40,40,10,10,true);
    cam = new Camera();
    // wall.push(new Rectangle2D(100,50,10,10,true))
    // wall.push(new Rectangle2D(100,150,10,10,true))
    // wall.push(new Rectangle2D(200,50,10,10,true))
    // wall.push(new Rectangle2D(200,150,10,10,true))

    spritesheet.src='assets/maze-sprites.png'

    enableInputs();
    setMap(maps[0],10);
    run()
    repaint()
}
function repaint(){
    window.requestAnimationFrame(repaint)
    paint(ctx)
}
function run(){
    setTimeout(run,50)

    act(0.05);
}
function reset(){
    player.top=100;
    player.left=40;
    currentMap=0;
    setMap(maps[currentMap],10)
    gameover=false
}
function paint(ctx){
    ctx.fillStyle=color;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='#fff';
    // player.fill(ctx,cam);
    player.drawImageArea(ctx,cam,spritesheet,(~~(elapsed*10)%2)*10,player.dir*10,10,10);
    ctx.fillStyle='#888';
    for(var i = 0;i<wall.length;i++){
        wall[i].drawImageArea(ctx,cam,spritesheet,20,0,10,10);
    }
    ctx.fillStyle='#f33'
    for (i=0;i<lava.length;i++){
        lava[i].drawImageArea(ctx,cam,spritesheet,20,10 + (~~(elapsed*10)%3)*10,10,10);
    }
    ctx.fillStyle='#f00'
    for(i=0;i<enemies.length;i++){
        enemies[i].drawImageArea(ctx,cam,spritesheet,30 +(~~(elapsed*10)%2)*10,enemies[i].dir*10,10,10)
    }
    ctx.font='16px sans-serif';
    ctx.fillStyle='#0f0';
    ctx.fillText('Timestop: '+player.timer,0,10);
    ctx.textAlign='center'    
    if(pause){
        if(gameover){
        ctx.fillText('GAMEOVER - ENTER TO RESET',canvas.width/2,canvas.height/2)  
        }else{
        ctx.fillText('PAUSE - ENTER TO CONTINUE',canvas.width/2,canvas.height/2)}
       
    }
    ctx.textAlign='left'
}
function act (deltaTime){
    if(!pause){
        if(gameover){
            reset();
        }
        cam.focus(player.x,player.y)
    if(lastPress===KEY_SPACE&&player.timer<1){
        player.timer=200;
        lastPress=null;
    }
    if(pressing[KEY_LEFT]){
        player.dir=3
        player.x-=5;
        for(var i=0;i<wall.length;i++){
            if(wall[i].intersects(player)){
                player.left=wall[i].right
                }
            }
        }
        if(pressing[KEY_RIGHT]){
        player.dir=1
        player.x+=5;
        for( i=0;i<wall.length;i++){
            if(wall[i].intersects(player)){
                player.right=wall[i].left;
                }
            }
        }
        if(pressing[KEY_UP]){
        player.dir=0;
        player.y-=5;
        for( i=0;i<wall.length;i++){
            if(wall[i].intersects(player)){
                player.top=wall[i].bottom;
                }
            }
        }
        if(pressing[KEY_DOWN]){
        player.dir=2
        player.y+=5;
        for( i=0;i<wall.length;i++){
            if(wall[i].intersects(player)){
                player.bottom=wall[i].top
                }
            }
        }
        for(i=0;i<lava.length;i++){
            if(lava[i].intersects(player)){
                pause=true;
                gameover=true;
            }
        }
         if(player.x > worldWidth){
             currentMap++;
             if(currentMap>maps.length){
                currentMap=0;
             }
             setMap(maps[currentMap],10);
             player.x=0;
             
         }
         if(player.y > worldHeight){
             player.y=0;
         }
         if(player.x <0){
            currentMap--;
            if(currentMap<0){
               currentMap=0;
            }
            setMap(maps[currentMap],10);
            player.x=worldWidth;
         }
         if(player.y <0){
             player.y=worldHeight
         }
         //ENEMIES MOVEMENT
         if(player.timer<180){
         for(i=0;i<enemies.length;i++ ){
             if(enemies[i].intersects(player)){
                gameover=true;
                pause=true;
             }
            if(enemies[i].vx !==0){
                enemies[i].x+=enemies[i].vx;
                for(var j =0,jl = wall.length;j<jl;j++){
                    if(enemies[i].intersects(wall[j])){
                        enemies[i].dir+=2;
                        if(enemies[i].dir>3){
                            enemies[i].dir-=4;
                        }
                        enemies[i].vx*=-1;
                        enemies[i].x+=enemies[i].vx;
                        break
                    }
                }
            }
            if(enemies[i].vy!==0){
                enemies[i].y+=enemies[i].vy;
                for( j =0,jl = wall.length;j<jl;j++){
                    if(enemies[i].intersects(wall[j])){
                        enemies[i].dir+=2;
                        if(enemies[i].dir>3){
                            enemies[i].dir-=4;
                        }
                        enemies[i].vy*=-1;
                        enemies[i].y+=enemies[i].vy;
                        break
                    }
                }
            }
         }
        }
        if(player.timer>180){
            color='#fff';
        }else{
            color='#000';
        }
         elapsed+=deltaTime
         if(elapsed>3600){
             elapsed-=3600;
         }
         if(player.timer>0){
             player.timer-=2
         }
    }
        if(lastPress===KEY_ENTER){
            pause=!pause;
            lastPress=null
        }

}
window.addEventListener('load',function(){
    init()
},false)

    window.requestAnimationFrame=(function(){
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||function(callback){window.setTimeout(callback,17);};
    })();
}(window))