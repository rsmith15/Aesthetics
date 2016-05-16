//Reverb and Delay
var reverb = new Tone.JCReverb(0.4).connect(Tone.Master)
var delay = new Tone.FeedbackDelay(0.5)
var samp='A.'
var count=0
var rand=0

//load samples into sampler
var sampler = new Tone.Sampler({
  A : {
    1:'https://dl.dropboxusercontent.com/s/qqwjw60g4hwryq5/a5.mp3?dl=1',
    2:'https://dl.dropboxusercontent.com/s/b8u195xvo5jtbco/f5.mp3?dl=1',
    3:'https://dl.dropboxusercontent.com/s/fy6nptfr4fda38k/fS5.mp3?dl=1',
    4:'https://dl.dropboxusercontent.com/s/xll3acs9t3gt4bu/gS5.mp3?dl=1',  
  },
 })/*.chain(reverb)*/.toMaster();
//is even
function isEven(value) {
  if (value%2 == 0)
    return true;
  else
    return false;
}
function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

//Load sample with buffer and play 
Tone.Buffer.onload = function(){

 setInterval(function() {

 if (isEven(count)) {
   rand=String(randomIntFromInterval(0,3))  
  }
 else {
   rand=String(randomIntFromInterval(1,4))
  }

 sampler.triggerAttack(samp.concat(rand),26)
}, 27000);
};


/*
//Handle sounds with JS
var selection=[];
var lIndex=0;

//Map audio to buffer
function init(audios) {
  for(var i=0;i<audios.length;i++) {
    var audio = new Audio(audios[i]);
    selection.push(audio);
    buffer(audio);
  }
}

//buffer
function buffer(audio) {
  if(audio.readyState==4)return loaded();
  setTimeout(function(){buffer(audio)},50);
}

function loaded() {
  lIndex++;
  if(selection.length==lIndex)playLooped();
}

//get random mp3 -- play mp3 -- set timeout so they overlap a bit
function playLooped() {
  var audio=Math.floor(Math.random() * (selection.length));
  audio=selection[audio];
  audio.play();
  setTimeout(playLooped,audio.duration*700);//1000
}

//Uploaded the songs to dropbox for access
init([
  'http://k003.kiwi6.com/hotlink/nnmw3273l7/chord3Clipped.mp3',
'http://k003.kiwi6.com/hotlink/dobm4rqolv/Chord2Clipped.mp3',
'http://k003.kiwi6.com/hotlink/s2k0h6zt36/dSminorClipped.mp3'
]);
*/

//80 63
var oceanFloor = new terra.Terrarium(129, 70 , {
  id: 'oFloor',
  trails: 1,
  periodic: true,
  background: [17,17, 17, 2]
});

//energy relates to reproduce
//reproduce if neighboring area is open and empty energy level = childs
terra.registerCreature({
  type: 'water',
  color: [17,17, 17],
  size: 10,
  initialEnergy: 5,
  maxEnergy: 20,
  //what happens when a creature waits
  wait: function() {
    // increase energy
    this.energy += 2;
    count=this.energy
  },
  move: false,
  reproduceLv: 0.65
});

terra.registerCreature({
  type: 'plankton',
  color: [0, 255, 255],
  //colorFn: function () { return this.alive ? this.color + ',1' : '255, 26, 255, 2'; },
  maxEnergy: 50,
  initialEnergy: 10,
  size: 20,
});

terra.registerCreature({
  type: 'PlanktonMB',//green
  color: [0, 255, 153],
  maxEnergy: 50,
  initialEnergy: 10,
  size: 20
});


terra.registerCreature({
  type: 'planktonLB',//purple
 initialEnergy: 20,
  reproduceLv: 0.8,
  sustainability: 3,
  color:[255, 102, 255]
});

//plankton ratios
oceanFloor.grid = oceanFloor.makeGridWithDistribution([['water', 50], ['plankton', 1], ['planktonLB', 6], ['PlanktonMB', 2]])
oceanFloor.animate()


//Center canvas
var canvas = document.getElementById('oFloor');
var style = canvas.style;
style.marginLeft = 'auto';
style.marginRight = 'auto';
var parentStyle = canvas.parentElement.style;
parentStyle.textAlign = 'center';
parentStyle.width = '100%';
var stars = 200
var context = canvas.getContext('2d')
var colorrange = [0,60,240];
function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
for (var i = 0; i < stars; i++) {
    var x = Math.random() * canvas.offsetWidth;
    var y = Math.random() * canvas.offsetHeight,
    radius = Math.random() * 1.2,
    hue = colorrange[getRandom(0,colorrange.length - 1)],
    sat = getRandom(50,100);
    context.beginPath();
    context.arc(x, y, radius, 0, 360);
    context.fillStyle = 'hsl(' + hue + ', ' + sat + '%, 88%)';
    context.fill();
}

