'use strict';

// Famous dependencies
var DOMElement = require('famous/dom-renderables/DOMElement');
var FamousEngine = require('famous/core/FamousEngine');
var Mesh = require('famous/webgl-renderables/Mesh');
var Color = require('famous/utilities/Color')
var PointLight = require('famous/webgl-renderables/lights/PointLight')
var AmbientLight = require('famous/webgl-renderables/lights/AmbientLight')
var Color = require('famous/utilities/Color')
var Position = require('famous/components/Position')
FamousEngine.init();

var scene = FamousEngine.createScene()

var node = scene.addChild()
.setOrigin(0.5,0.5,0.5)
.setAlign(0.5,0.5,0.5)
.setMountPoint(0.5,0.5,0.5)
.setSizeMode(1,1,1)

var lightNode = scene.addChild();
var light = new PointLight(node);
var ambientLight = new AmbientLight(scene)
    lightNode.setAlign(0,1)
   lightNode.setPosition(0, 0, 600);
   light.setColor(new Color('white'))

   //turns the default ambient light back on for the node
   ambientLight.setColor(new Color('white'))

new AmbientLight(lightNode).setColor

var height = 10;
var width = 10;
var deep = 10;
var padding = 0;
var row = 0;
var column = 0;
var depth = 1;
var colDef = 30

node.setAbsoluteSize(height*colDef+(colDef*padding), width*colDef+(colDef*padding), 2*height*colDef+(colDef*padding))

var inputNode = scene.addChild()
.setSizeMode(1,1,1)
.setAbsoluteSize(100,50)
.setAlign(.99,.99)
.setMountPoint(1,1)
var depthInput = new DOMElement( inputNode, {
    tagName: 'input',
    attributes: {
        type: 'range',
        min: 0,
        max: 5,
        step: .5
    }
});

inputNode.addUIEvent('change')

inputNode.onReceive = function(event, payload){
   depth = payload.value
   console.log(depth)
   node.setAbsoluteSize(height*colDef+(colDef*padding), width*colDef+(colDef*padding),(255*3)/2*depth)

}


for(var i = 0; i < (colDef * colDef); i++){
  if(i%colDef===0){
    row++;
    column = 0;
    addBox(height, width,padding,row, column)
  }
  if(i%colDef){
  addBox(height, width,padding,row, column)
  column++;
  }
}

function addBox(height, width, padding, row, column){
    var child = node.addChild()
        .setSizeMode(1, 1, 1)
        .setAbsoluteSize(height, width, deep)
        .setMountPoint(0.5,0.5)
        .setOrigin(0.5,0.5)
        var posX = width * column + (padding * column) + height;
        var posY = height * row + (padding * row);
        var posZ = Math.random() * depth;
        var position = new Position(child);

        position.set(posX, posY, posZ);
    
    var r = Math.floor(Math.random()*255);
    var g = Math.floor(Math.random()*255);
    var b = Math.floor(Math.random()*255);   
    var color = [r,g,b].join(',');
    var colorString = 'rgb('+color+')'
    
    var colorObj = new Color().setRGB(r,g,b);

    //var h = Math.floor(Math.random()*360); 
    //var colorString = 'hsl('+h+',80%, 80%)'
    
    // var childEl = new DOMElement(child, {
    //   properties: {
    //     'background-color': colorString
    //   }
    // })

var mesh = new Mesh(child)
.setGeometry('Box')
.setBaseColor(colorObj)

    var interval = 3000;
    
    FamousEngine.getClock().setInterval(function(){
        // r = (r < 254) ? r+=3 : 0;
        // g = (g < 254) ? g+=3 : 0;
        // b = (b < 254) ? b+=3 : 0;
        var r = Math.floor(Math.random()*255);
        var g = Math.floor(Math.random()*255);
        var b = Math.floor(Math.random()*255);  
        colorObj.setRGB(r,g,b,{duration: interval})


        //  color = [r,g,b].join(',');
        //  colorString = 'rgb('+color+')';
        //var colorString = 'hsl('+(h++)+',80%, 80%)'
        //childEl.setProperty('background',colorString)
        position.setZ((r+g+b)/2*depth,{duration: interval, curve: 'inOutElastic'})
        mesh.setBaseColor(colorObj)

    }, interval)
   
}


 var spinner = node.addComponent({
    onUpdate: function(time) {
        node.setRotation(time/500000, time / 50000, time/500000);
        node.requestUpdateOnNextTick(spinner);
    }
});


node.requestUpdate(spinner);
