var instructText = 'Thank your for taking part in this survey.  \
	Your results will be anononymous, and the experimenters won\'t \
	collect any data you don\'t freely provide.  \
	Please wear headphones and make sure your are in a quiet place. \
	You will be asked to listen to some speakers of Chinese and answer questions \
	about what they say.  There are no right or wrong answers; we just want to know \
	your opinions.  If you can\'t answer a question, you can skip it. \
	You may end the survey early at any time by pressing the "End Experiment" \
	button at the bottom of the page.';

var endButton = "<button onclick='end()' id='end'>End Experiment</button>";
var nextButton = "<button onclick='next()' id='next'>Continue</button";
var audioPrompt = '<p class="mainInstruction">Click the play button below to hear \
					someone speaking:</p><p style="text-align:center;">\
					<button id="playButton" class="audioButton" \
					onclick=playOrPause()>&#9654;</button></p><p>Please answer \
					the following questions.  If you don\'t have an answer, \
					you can select "Don\'t know" or skip it.  Remember, there \
					are no right or wrong answers; \
					we just want to know your opinion.</p>';
var audioPath = "https://staff.washington.edu/sbng/socio/audio/";
var allAudio = [new Audio(audioPath+"i0.mp3"),new Audio(audioPath+"i1.mp3"),
				new Audio(audioPath+"i2.mp3"),new Audio(audioPath+"i3.mp3")];
var index = 0;
var where = 0;



function instructions(){
	var myNode = document.createElement("div");
	var text = '<p id="mainText">'+instructText+'</p><br>';
	myNode.innerHTML = text;
	myNode.setAttribute('id','mainContainer');
	document.body.insertBefore(myNode,document.getElementById('theData'));
	document.getElementById('buttons').innerHTML = endButton+nextButton;
	document.getElementById('sn').value = document.getElementById('subjectNumber').innerHTML
}

function audio(){
	document.getElementById('mainText').innerHTML = audioPrompt;
	try{
		document.getElementById(''+(index-1)).setAttribute('hidden','true');
	} catch (error) {}
	document.getElementById(''+index).removeAttribute('hidden');
}

function playOrPause(){
	if (allAudio[index].currentTime != 0){
		//pause it 
		allAudio[index].pause();
		allAudio[index].currentTime = 0;
		document.getElementById('playButton').innerHTML = '&#9654;';
	} else {
		allAudio[index].addEventListener("ended",function(){
			allAudio[index].currentTime = 0;
			document.getElementById('playButton').innerHTML = '&#9654;';
		});
		allAudio[index].play(); // play sound
		document.getElementById('playButton').innerHTML = '&#9632;';
	}
}

function end(){
	if (confirm('Are you sure you want to end?  You cannot go back.')){
		endFinal() } 
}

function endFinal(){
	document.getElementById('theForm').submit();
}

function clearBox(number){
	console.log('fired');
	document.getElementById('meta'+number).innerHTML = '';
}

function next(){
	switch(where){
		case 0: // you are at instructions
			// go to audio
			where++;
			audio();
			break;
		case 1: // you are at audio
			if (index < 3) {
				//continue with next audio
				index++;
				audio();
			} else {			
				//go to metalinguistics
				document.getElementById('3').setAttribute('hidden','true');
				document.getElementById('mainContainer').innerHTML = '<p>Please answer the following questions to the best of your ability.  Skip any question you do not feel able to answer.</p>';
				document.getElementById('meta').removeAttribute('hidden');
				document.getElementById('next').innerHTML = 'Submit';
				where++; 
			}
			break;
		case 2: // you are meta linguistics
			// go to submission
			endFinal();
			break;
	}
	document.body.scrollTop = document.documentElement.scrollTop = 0;
}

window.onload = instructions