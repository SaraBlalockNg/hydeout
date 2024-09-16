var userTapTimes = [];
var userTapCounts = 0;
var instructions = 'Tap a rhythm corresponding to the given sentence, and press "Submit" when you are done.  With each press of the [Space] key, you will see the button light up.  You can use the "Start Over" button if you make an error.';
var tapper = '<div class="containCircles">'+
  				'<div class="circle" id="toClick"></div>'+
  				'<div class="smallcircle" id="blinker"></div>'+
  				'<div class="centered" id="blinkwords">[tap]</div>'+
  				'<div class="clickcircle" id="clickcircle"></div>'+	
				'</div>';

function realTaps(){
	var one = '<p id="prompt">Tap the rhythm of:<div id="highlight">Her fleece was white as snow</div></p>';
	// var two = '<div id="buttons"><div class="bar"><div class="bounce"  id="myBar"></div></div></div><br />'
	// var buttonsRowOne = "<div id='buttons'><button onclick='instruct()' id='ib'>Instructions</button>";
	// var buttonsRowTwo = "<button onclick='clearTap()' id='startOver'>Start Over</button>";
	// var submit = "<button onclick='submit()' id='submit'>Submit</button></div><div id='response'></div>";
	var buttons = "<div class='buttons'><button onclick='instruct()' id='ib'>Instructions</button><button onclick='clearTap()'"+
		" id='startOver'>Start Over</button><button onclick='submit()'"
		+" id='begin'>Submit</button></div><div id='response'></div>";

	document.addEventListener('keyup',spacePress);
	document.body.innerHTML = one+tapper+buttons;
	document.getElementById('clickcircle').addEventListener('click',circlePress);
	document.getElementById('blinker').style.display = "none";	
	document.addEventListener('keyup',spacePress);

}

function clearTap(){
	userTapCounts = undefined;
	userTapTimes = [];
	document.getElementById('response').innerHTML = ''
	// if (where==6){
	// 	document.getElementById('begin').setAttribute("disabled",'true');
	// }
	alert('Taps Cleared');
}

function spacePress(e){
	if (e.keyCode == 32){
	  	e.preventDefault();
	  	var f = document.getElementById('blinker');
		setTimeout(function() {
			f.style.display = (f.style.display == 'none' ? '' : 'none');
			setTimeout(function() {
				f.style.display = (f.style.display == 'none' ? '' : 'none');
				}, 100);
			  }, 100);
	increaseTap(e);
	}
}

function increaseTap(e){
	if (document.getElementById('response').innerHTML != ""){
		userTapCounts = undefined;
		userTapTimes = [];
		document.getElementById('response').innerHTML = ""
	}
	userTapTimes.push(e.timeStamp);
	if (userTapCounts==undefined) {
		userTapCounts=1;
		document.getElementById('begin').removeAttribute('disabled');
	}
	else {
		userTapCounts++;
	}
}


function circlePress(e){
  	var f = document.getElementById('blinker');
	setTimeout(function() {
		f.style.display = (f.style.display == 'none' ? '' : 'none');
		setTimeout(function() {
			f.style.display = (f.style.display == 'none' ? '' : 'none');
			}, 100);
		   }, 100);
	increaseTap(e);
}

// function clearTap(){
// 	userTapCounts = 0;
// 	userTapTimes = [];
// 	width = 2;
// 	if (document.getElementById('response').innerHTML == ''){
// 		alert('Taps cleared!');
// 	}
// 	else {
// 		document.getElementById('response').innerHTML='';
// 	}
// }

// function spacePress(e){
// 	if (e.keyCode == 32 ){
//         event.preventDefault();
// 		userTapTimes.push(e.timeStamp);
// 		userTapCounts++;
// 		if (width<97){
// 		width+=4;
// 		}
// 		else {width=2}
// 		try{bounce()}
// 		catch (error) {}
// 	}
// }

// function bounce(){ // used for the bouncing animation on the tap
// 	var elem = document.getElementById("myBar"); 
// 	var height = 100;
// 	elem.style.height = '60' + '%';
// 	var id = setInterval(frame, 5);
// 	function frame() {
// 		if (height <= 0) {
// 			clearInterval(id);
// 			id = setInterval(frame2, 10);
// 		} else {
// 			height=height-5; 
// 			elem.style.height = height + '%'; 
// 		}
// 	}
// 	function frame2() {
// 		if (height >= 99) {
// 			clearInterval(id);
// 			elem.style.height = '100%'; 
// 		} else {
// 			height=height+5; 
// 			elem.style.height = height + '%'; 
// 		}
// 	}
// }

function submit(){
	var x = 0;
	var len = userTapTimes.length
	while(x < len){ 
    	userTapTimes[x] = Math.round(userTapTimes[x]-userTapTimes[0]);
    	x++;
	}

	if (userTapCounts >0){
		document.getElementById('response').innerHTML = '<p>Count: '+userTapCounts+
			'</p><p>Timings (ms): ['+userTapTimes.join(', ')+']</p>';		
	}
	else {
		alert('Nothing recorded :(');
	}
}

function instruct(){
	alert(instructions);
}

window.onload = realTaps