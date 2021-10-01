/* 
for metrical phonology study
this is to serve as a boiler plate for phonological research
you can:
	- have participants compose melodies aligned to text sentences
	- have participants ``clap'' syllable patterns in given text
	- save data to csv format for post-processing in R
*/

function setInstructions(lang){
	// set the text prompts based on the selected language
	prompts.piano = Array(6);
	prompts.tap = Array(6);
	switch(lang) {
		default: //default to english
			prompts.start = 'Thank you for your participation.  This study '+
				'will ask you to do some activities about music and rhythm.  '+
				'Please make sure that you are in a quiet environment, and can '
				+'hear your computer\'s audio.  Payment will be disbursed upon '
				+'successful completion.<br /><br />'+
				'You may use the buttons at the bottom of the screen or the '+
				'[Enter]	key to navigate through the pages of the study.'+
				'<br /><br />At any time, you can use the "End Experiment" '+
				'button to close the survey and delete any data you have '+
				'provided.  However, you are encouraged to try each activity to' 
				+' completion.';
			prompts.ic = 'Please read the following document carefully, then '+
				'select "I don\'t agree" or "I agree"';
			prompts.playAgain = 'Play Instructions Again';
			prompts.headphones = 'The instructions play below.  Make sure you '+
				'can hear the audio instructions.';
			// prompts.piano[0] = 'This activity involves musical melodies.  ';
			// prompts.piano[1] = 'You can practice using the piano below (the '+
			// 	'first question will appear on the next screen).  ';
			// prompts.piano[2] = 'A sentence will appear here, and you should '+
			// 	'compose a melody corresponding to the text, using the '+
			// 'on-screen keyboard.<br /><br />';
			// prompts.piano[3] = 'Notes can be clicked using the mouse or by '+
			// 	'pressing the keys noted (for example, pressing "Q" is '+
			// 'equivalent to 	hitting the lowest key).  ';
			// prompts.piano[4] = 'When you are done composing, click "Next" or '+
			// 	'hit the [Enter] key.  ';
			// prompts.piano[5] = 'You can practice a composition on each page, '+
			// 	'and press "Start Over" when you are ready to record your '+
			// 	'melody.';
			// prompts.piano[6] = '<br /><br />Press "Next" when you are ready to '
			// 	+'start.';
			prompts.pianoIns = 'Notes can be clicked using the mouse or by '+
				'pressing the keys noted (for example, pressing "Q" is '+
				'equivalent to	hitting the lowest key).  '+
				'You can practice a composition on each page, '+
				'and press "Record" when you are ready to record your '+
				'melody.'+
				'When you are done composing, click "Next" or '+
				'hit the [Enter] key.  '+
				'If you make a mistake during recording, hit "Start Over" '+
				'to begin the melody again.';
			prompts.tapIns = 'Tap a rhythm corresponding to the given '+
				'sentence, and press next when you are done.  ';
				'With each press of the [Space] key, you will see '+
				'the progress bar below increase.  '+
				'You can use the "Start Over" button if you make '+
				'an error.';
			prompts.pianoTemplate = "Compose a melody for: ";
			prompts.tap[0] = 'In the next activity, you will use the space bar '
				+'to tap a rhythm.  ';
			prompts.tap[1] = 'Tap a rhythm corresponding to the given '+
				'sentence, and press next when you are done.  ';
			prompts.tap[2] = 'With each press of the [Space] key (or, click of'+
				' the [tap] button), you will see '
				+'the progress bar below increase.  ';
			prompts.tap[3] = 'You can use the "Start Over" button if you make '+
				'an error.  ';
			prompts.tap[4] = 'Practice on this page, and click "Next" when you '
				+'are ready to begin.';
			prompts.tap[5] = '<br /><br />Example sentence:  '+
				'<strong id="highlight">Mary had a little lamb.</strong>';
			prompts.tapTemplate = 'Using the spacebar, tap the sentence: '+
				'<strong id="highlight">';
			prompts.startOver = 'Start Over';
			prompts.done = 'Save';
			prompts.begin = 'Begin';
			prompts.record = 'Record';
			prompts.next = 'Next';
			prompts.end = "End Experiment";
			prompts.instructions = "Instructions";
			prompts.goodbye = "Your data has been saved.  You may close this "+
				"window.";
			prompts.confirmed = "Do you want to end the experiment?  This will"+
				" delete any data you have recorded, and you will be asked to "+
				"return the HIT.";
			prompts.q = "Finally, please answer the following questions to the "
				+"best of your ability";
			prompts.agree = "I agree.";
			prompts.disagree = "I don't agree.";
			prompts.ready = 'The experiment will start when you hit "Begin."';
			prompts.noConsent = "You have chosen not to continue with the "+
				"experiment.  Your personal information and any data you've "+
				"provided will be immediately and permanently removed from our "
				+"records.  Please return the HIT, and have a good day.  If you"
				+" have pressing concerns about the experiment, please contact "
				+"<a href='mailto:begus@uw.edu'>begus@uw.edu</a>."
			prompts.uW = "Are you an employee of the University of Washington, "+
				"family member of a UW employee, or UW student involved in this"+
				" particular research?"
			prompts.noUW = "Sorry but your status with the University of "+
				"Washington makes you ineligible for this study.  Please return"+
				" the HIT, and have a good day.  If you have pressing concerns "+
				"about the experiment, please contact "
				+"<a href='mailto:begus@uw.edu'>begus@uw.edu</a>."
	}
	//prompts.pianoFull = prompts.piano[3] + prompts.piano[4] + prompts.piano[5];
	prompts.tapFull = prompts.tap[1] + prompts.tap[2] + prompts.tap[3];

	var myNode = document.createElement("div");
	var text = '<p id="prompt">'+prompts.start+
		"</p><div class='buttons'><button onclick='instruct' id='ib' hidden>"+
		prompts.instructions+
		"</button><button onclick='informedConsent()' id='begin'>"+
		prompts.begin+
		"</button></div><div class='buttons'><button onclick='end()' id='end' "+
		"hidden>"+prompts.end+"</button></div>";
	myNode.innerHTML = text;
	myNode.setAttribute('id','mainContainer')
	document.body.insertBefore(myNode,document.getElementById('theData'));
	document.addEventListener('keyup',enterNext)
}

function enterNext(e){
	// lets you navigate using the enter key instead of pressing next
	try{
	if (e.keyCode==13){
		event.preventDefault();
		if (where==0 & index == 0){
			index = 1;
			informedConsent();
		}
		else if (where > 0){next()}
	}
	} catch (error) {}
}

function informedConsent(){
	document.getElementById('ib').removeAttribute("hidden");
	document.getElementById('end').removeAttribute("hidden");
	document.getElementById('begin').setAttribute("onclick",'next()');
	document.getElementById('ib').setAttribute("onclick",'noConsent()');
	document.getElementById('begin').innerHTML = prompts.agree;
	document.getElementById('ib').innerHTML=prompts.disagree;
	document.getElementById('prompt').innerHTML = prompts.ic;
	var ic = document.createElement('div');

	var icText = '<div class="scrollMom" id="mom"><div class="scrollDoc" '+
		'id="scroll">'+informedConsentTemplate+"</div></div>";
	ic.innerHTML=icText;
	var uwClause = document.createElement('div');
	uwClause.style.textAlign = "center";
	uwClause.innerHTML = "<p id='consentQ'>"+prompts.uW+"</p><div id='radios'><span>No</span>"+
		"<input id='notUW' type='radio' name='test' value='notUW'>"+
		"<span class='yes'>Yes</span><input id='UW' type='radio' name='test' value='UW'></div>";
	document.getElementById('mainContainer').insertBefore(
		ic,document.getElementsByClassName('buttons')[0]);
	document.getElementById('mainContainer').insertBefore(
		uwClause,document.getElementById('prompt'));
	document.getElementById('consentQ').style.paddingLeft='5vw';
	document.getElementById('consentQ').style.paddingRight='5vw';
}

function ready2Begin(){
	document.getElementById('mainContainer').innerHTML = '<div class="ready">'+
		'<p>'+prompts.ready+
		"</p><div class='buttons'><button onclick='instruct()' id='ib'>"+
		prompts.instructions+
		"</button><button onclick='next()' id='begin'>"+prompts.begin+
		"</button></div><div class='buttons'><button onclick='end()' id='end' >"+
		prompts.end+"</button></div></div>";
}

//"</button><button onclick='clearPress()' id='clearButton' disabled>"+
//		prompts.startOver+

function practicePiano(){
	var zero = '<p>'+prompts.headphones+'</p>'
	var one = '<video  width="15px"  class="center" autoplay="autoplay" id="vid">'+
  		'<source src="https://staff.washington.edu/sbng/mturk/piano.mov" type="video/mp4" />'+
		'</video>';
		var text = "<div class='buttons'><button onclick='instruct()' id='ib' hidden>"+
		prompts.pianoFull+
		"</button><button onclick='clearPress()' id='clearButton' disabled>"+
		prompts.playAgain+	
		"</button><button onclick='next()' id='begin' disabled>"+
		prompts.next+
		"</button></div><div class='buttons'><button onclick='end()' id='end' >"+
		prompts.end+"</button></div>";
	document.getElementById('prompt').setAttribute('style','text-align:left;');
	document.getElementById('mainContainer').innerHTML = zero+one+text;
	document.getElementById('vid').addEventListener('ended',videoDone,false);
}

function fadeout() {
  document.getElementById('fadeout').style.opacity = '0';
}

function videoDone(e){
	document.getElementById('begin').removeAttribute('disabled');
	document.getElementById('clearButton').removeAttribute('disabled');
}

function realPiano(){
	var one = '<p id="prompt"></p>';
	var text = "<div class='buttons'><button onclick='instruct()' id='ib'>"+
		prompts.instructions+
		"</button><button onclick='clearPress()' id='clearButton' disabled>"+
		prompts.startOver+
		"</button><button onclick='next()' id='begin'>"+
		prompts.record+
		"</button></div><div class='buttons'><button onclick='end()' id='end' >"+
		prompts.end+"</button></div>";
	document.addEventListener('keyup',notePress);
	document.addEventListener('click',clickPress);
	document.getElementById('mainContainer').innerHTML = one+piano+text;
	//document.getElementById('clearButton').removeAttribute('disabled');
	document.getElementById('prompt').innerHTML = prompts.pianoTemplate+
		"<div id='highlight'>"+pianoSentences[index] +"</div>";
}

function addLine(){
	if (idx<prompts.tap.length){
		document.getElementById('prompt').innerHTML = '<div class="prompt">'+
		prompts.tap.slice(0,idx).join(' ')+'</div>'+
		'<div class="fade-in">'+prompts.tap[idx]+'</div>'
		idx++;
	}
	else {
		clearInterval(inter)
		document.getElementById('begin').removeAttribute('disabled')
	}
}

function practiceTaps() {
	var one = '<div id="prompt" class="promptholder"><div class="prompt">'+
		prompts.tap[0]+'</div></div>';
	var buttons = "<div class='buttons'><button onclick='instruct()' id='ib'"+
		" hidden>"+prompts.instructions+"</button><button onclick='clearTap()'"+
		" id='startOver'>"+prompts.startOver+"</button><button onclick='next()'"
		+" id='begin' disabled>"+prompts.next+"</button></div><div "+
		"class='buttons'><button onclick='end()' id='end' >"+prompts.end+
		"</button></div>";
	document.removeEventListener('keyup',notePress);
	document.addEventListener('keyup',spacePress);
	document.getElementById('mainContainer').innerHTML = one+buttons;
	if (numPianos == 0) {
		document.getElementById('ib').removeAttribute('disabled');
	}
	document.getElementById('prompt').setAttribute('style','text-align:left;');
	idx = 1;
	inter = setInterval(addLine,3000);
	document.getElementById('mainContainer').innerHTML = '<div id="prompt">'+
		prompts.tap[0]+'</div>'+tapper+buttons;
	document.getElementById('clickcircle').addEventListener('click',circlePress);
	document.getElementById('blinker').style.display = "none";
}

function realTaps(){
	var prompt = '<p id="prompt">x</p>';
	var buttons = "<div class='buttons'><button onclick='instruct()' id='ib'>"+
		prompts.instructions+"</button>"+
		"<button onclick='clearTap()' id='startOver'>"+
		prompts.startOver+"</button>"+
		"<button onclick='next()' id='begin' disabled>"+prompts.next+
		"</button></div><div class='buttons'><button onclick='end()' id='end' >"+
		prompts.end+"</button></div>";
	document.removeEventListener('keyup',notePress);
	document.addEventListener('keyup',spacePress);
	document.getElementById('mainContainer').innerHTML = prompt+tapper+buttons;
	document.getElementById('clickcircle').addEventListener('click',circlePress);
	document.getElementById('blinker').style.display = "none";
	if (numPianos == 0) {
		document.getElementById('ib').removeAttribute('disabled');
	}
	document.getElementById('prompt').innerHTML = prompts.tapTemplate + 
		"<div id='highlight'>"+tapSentences[index]+"</div>";
}

function clearPress(){
	if (document.getElementById('clearButton').innerHTML == prompts.playAgain){
		document.getElementById('clearButton').setAttribute('disabled','true');
		document.getElementById('vid').play();
	} else {
	userPianoNotes[index] = [];
	userPianoCounts[index] = undefined;
	userPianoTimes[index] = [];
	document.getElementById('begin').innerHTML = prompts.record;
	document.getElementById('clearButton').setAttribute("disabled",'true');
	alert('Recording cleared');
	}
}

function clearTap(){

	userTapCounts[index] = undefined;
	userTapTimes[index] = [];
	if (where==6){
		document.getElementById('begin').setAttribute("disabled",'true');
	}
	alert('Taps Cleared');
}

function notePress(e){
	if (where ==1 || where ==3){
		try {
			for (var i=0; i<allSounds.length; i++) {
				allSounds[i].pause();
				allSounds[i].currentTime = 0;
			}
			notes[e.keyCode].play(); // play sound
			if (where == 3 & document.getElementById('begin').innerHTML == 'Next'){
				if (userPianoCounts[index]== undefined) {
					userPianoCounts[index]=1;
				}
				else {userPianoCounts[index]++;
				}
				userPianoNotes[index].push(e.keyCode);
				userPianoTimes[index].push(e.timeStamp);
				if (document.getElementById('begin').innerHTML == prompts.next){
				document.getElementById('clearButton').removeAttribute("disabled");
				}
			}
		}
		catch (error) {} }
}

function clickPress(e){
	try {
		var note = {keyCode:parseInt(e.target.id),timeStamp:e.timeStamp};
		notePress(note);
	}
	catch (error) {}
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
			i  }, 100);
	increaseTap(e);
	}
}

function increaseTap(e){
	if (where == 6) {
		userTapTimes[index].push(e.timeStamp);
		if (userTapCounts[index]==undefined) {
			userTapCounts[index]=1;
			document.getElementById('begin').removeAttribute('disabled');
		}
		else {
			userTapCounts[index]++;
		}
	}
}

function circlePress(e){
  	var f = document.getElementById('blinker');
	setTimeout(function() {
		f.style.display = (f.style.display == 'none' ? '' : 'none');
		setTimeout(function() {
			f.style.display = (f.style.display == 'none' ? '' : 'none');
			}, 100);
		i  }, 100);
	increaseTap(e);
}

// function blink(){
// 	var elem = document.getElementById("myBar");
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

function questionnaire(){
	if (where==6){
		document.getElementById('mainContainer').innerHTML = '<p>'+
		prompts.q+'</p><p id="question">'+
		questionsCopy.shift()+"</p><div class='buttons'>"+
			"<input onkeypress='enterNext()' type='text' id='questionResponse'"+
			" autofocus='autofocus'><button onclick='next()' id='begin'>"
			+prompts.next+"</button></div>";
	}	
		// save the last thing and clear the window
	else if (questionsCopy.length > 0){
			questionArray.push(document.getElementById(
				'questionResponse').value);
			document.getElementById(
				'question').innerHTML = questionsCopy.shift(0);
			document.getElementById('questionResponse').value='';
		} 
	else { endFinal() }
}

// function addLine(line) {
// 	document.getElementById('prompt').innerHTML += prompts.tap[line];
// }

// function feedText(){

// }
// navigation functions

function next(){
	switch(where){
		case 0:  // you are at informed consent
			where++;
			index = 1;
			if (!document.getElementById('notUW').checked){
				cantBeUW()	}
			else if (numPianos > 0){
				// go to practice piano
				const AudioContext = window.AudioContext || window.webkitAudioContext;
				const audioCtx = new AudioContext();
				practicePiano();
			} else {
				// go to practice taps
				where = 4;
				practiceTaps()
			}
			break;
		case 1: // you are at practice piano
			// load instructions while you can
			// needs to change
			//if (index < prompts.piano.length){
			//	document.getElementById('prompt').innerHTML+=prompts.piano[index];
			//	index++;
			//} else {
			//	where++;
				// go to ready
			//	index = 0;
			//	ready2Begin();
			where++;
			index = 0;
			ready2Begin();
			break;
		case 2: // you are ready
			where++;
			// go to real piano
			index = 0; 
			realPiano();
			break;
		case 3: // you are at real piano
			 //if you are not recording yet
			if (document.getElementById('begin').innerHTML == prompts.record) {
				// start recording
				// change the text of the button
				document.getElementById('begin').innerHTML = prompts.next;
			}
			// try to load the next sentence
			else if (index < numPianos -1 ){ // if there are still pianos
				if (userPianoCounts[index]!=undefined){
					index++;
					realPiano();	
				} else {
					alert('A recording has not been saved for this sample.');
				}
			} else {
				// go to practice taps or questionnaire
				if (numTaps > 0){
					// go to practice taps 
						if (userPianoCounts[index]==undefined){
							alert('A recording has not been saved for this '+
								'sample.');
						} else {
							where++;
							index = 1;
							practiceTaps();
						} 
						
				} else {
					where = 7;
					questionnaire();
				}
			}
			break;
		case 4: // you are at practice taps
			// if (index < prompts.tap.length){
			// 	document.getElementById('prompt').innerHTML+=prompts.tap[index];
			// 	index++;
			// } else {
			where++;
			// go to ready
			index = 0;
			ready2Begin();
			// }
			break;
		case 5: // you are ready
			where++;
			// go to real piano
			index = 0; 
			realTaps();
			break;
		case 6:
			// try to load the next sentence
			if (index < numTaps -1 ){
				if (userTapCounts[index]!=undefined){
					document.getElementById('begin').setAttribute("disabled",
						'true');
					index++;
					realTaps();	
				} else {
					alert('An elicitation has not been saved for this sample.');
				}
			} else {
				// go to questionnaire
				if (userTapCounts[index]!=undefined){
					questionnaire();
					where++;
				} else{
					alert('An elicitation has not been saved for this sample.');
				}
			}
			
			break;
		case 7:
			// try to load the next sentence
			questionnaire();
			break;
		default:
			console.log('something went wrong');
	}
}

function instruct(){
	switch(where) {
		case 3: //piano instructions
			alert(prompts.pianoIns);
			break;
		case 2: //piano instructions
			alert(prompts.pianoIns);
			break;
		default: //taps
			alert(prompts.tapIns);
			break;
	}
}

function end(){
	if (confirm(prompts.confirmed)){
		noConsent() } 
}


function noConsent(){
	// either they disagree to the consent form or they end early
	// scrub their subject number from the running list
	document.getElementById('mainContainer').innerHTML = '<p>'+
		prompts.noConsent+'</p>';
}

function cantBeUW(){
	document.getElementById('mainContainer').innerHTML = '<p>'+
		prompts.noUW+'</p>';
}

function endFinal(){
	document.getElementsByName('subjectNumber')[0].value = parseInt(
		document.getElementById('subjectNumber').innerHTML.slice(0,5));
	document.getElementsByName('pianoArray')[0].value = pianoSentences;
	document.getElementsByName('tapArray')[0].value = tapSentences;
	document.getElementsByName('questionArray')[0].value = questions;

	document.getElementsByName('userPianoCounts')[0].value = userPianoCounts;
	document.getElementsByName('userPianoNotes')[0].value = userPianoNotes;
	document.getElementsByName('userPianoTimes')[0].value = userPianoTimes;

	document.getElementsByName('userTapCounts')[0].value = userTapCounts;
	document.getElementsByName('userTapTimes')[0].value = userTapTimes;
	try{
		questionArray.push(document.getElementById('questionResponse').value);
	}catch (error) {}
	
	document.getElementsByName('userQuestions')[0].value = questionArray;
	
	document.getElementById('mainContainer').innerHTML = '<p>'+prompts.goodbye+
		'</p>';
	document.getElementsByTagName('crowd-form')[0].submit();
}

window.onload = setInstructions
