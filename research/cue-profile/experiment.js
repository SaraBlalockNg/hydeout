//////////////////////////////////////////////////////
// variables that can be adjusted by the researcher //
//////////////////////////////////////////////////////

const minNumBlocks2 = 1; // minimum number of blocks to do training in level 2
const numBlocks3 = 1; // number of blocks for testing
// TODO what is the behavior between blocks, any alert message?
const interBlockDelay = 1; // time in seconds between final keypress and next stimulus between blocks
const interTrialDelay = 0.5;

// set the intra-block size
const numTrialsLevel1 = 2//4*4; // number of repetitions of corners; should be a multiple of 4
const numTrialsLevel2 = 2//numTrialsLevel1; // see above
const numTrialsLevel3 = 2//5*5; // number of repetitions of all; should be a multiple of 25

// TODO implementation of early stoppping in level2
// var learningRate = 0.05; // minimum slope to continue within-block training in level 2

///////////////////////////////////////////
// variables that should not be adjusted //
///////////////////////////////////////////

// audio files are assumed to have the format d{i}_s{j}.wav, and be in the audios folder
var title, subjectNum, subjectNumbers, trainingLevel, block, numBlocks, index, stimuli;
var responses = Array();
// TODO query audio so this isn't needed
var stimulusLength = 300; // stimulus length in miliseconds
const numericMap = {11:1,51:2,15:3,55:4};
const alphaMap = {11:"DAH",51:"BAH",15:"LAH",55:"WAH"};
const numTrials = [numTrialsLevel1,numTrialsLevel2,numTrialsLevel3];
const responseTitles = ['Subj','Trial','TrainingLevel','Stimuli_Type','Stimuli_1',
						'Stimuli_2','Response','Response_Number','Correct'];
const stimulusAudio = new Audio();

////////////////////////////
// Navigational Functions //
////////////////////////////

function start(){
	stimulusAudio.play()
	// get subject number and print it to the file
	var outerRequest = new XMLHttpRequest();
	outerRequest.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			subjectNumbers = new Set(this.responseText.split('\n'));
			subjectNum = Math.floor(Math.random()*1000);
			while (subjectNumbers.has(subjectNum)){
				subjectNum = Math.floor(Math.random()*1000);
			}
			//save subject number to new file
			let formData = new FormData(); 
			formData.append('number',subjectNum);
			var innerRequest = new XMLHttpRequest();
			innerRequest.open("POST", "save_subject_number.php"); 
			innerRequest.send(formData); 

			// get the start time for creating a subject title
			let d = new Date();
			title = 'results/'+subjectNum+"_"+d.getMonth()+"_"+d.getDate()+"_"+d.getFullYear()+d.getHours()+'.'+d.getHours()+"."+d.getMinutes()+'.csv';
			
			// start the file with some headers
			saveData(responseTitles);
		}
	};
	outerRequest.open("GET", "subject_numbers.txt", true);
	outerRequest.send();

	// start the experiment
	let navNode = document.getElementById('nav');
	navNode.style.visibility = 'hidden';
	navNode.disabled = true;

	// start level 1
	blocks = numBlocks = 1;
	newLevel(1);
}

function progress(){
	index++;
	if (index < stimuli.length){
		setTimeout(playStimulus,interTrialDelay*1000)
	}
	// otherwise we are done with a block.  see if there's more blocks to go
	else if (block < numBlocks){
		block++;
		index = -1;
		setTimeout(progress,interBlockDelay*1000);
	}
	else if (trainingLevel == 1){
		numBlocks = minNumBlocks2;
		setTimeout(function () {newLevel(2);}, interBlockDelay*1000);
	}
	else if (trainingLevel == 2){
		// TODO check interblock criteria
		// if (criteria not met){
		// 	numBlocks++;
		// 	setTimeout(progress,interBlockDelay*1000);
		// } else {
		numBlocks = numBlocks3;
		setTimeout(function () {newLevel(3);}, interBlockDelay*1000);
		// }
	} 
	else {
		allow_ending()
	}
}

function end(){
	document.body.innerHTML = '<p>Thank you.  You may close the window.</p>';
}

function newLevel(n){
	trainingLevel = n;
	index = 0;
	stimuli = makeStimuli(n);
	playStimulus();
}

///////////////////////
// Content Functions //
///////////////////////

function makeStimuli(level){
	// for level 1 and 2, use the corners
	if (level!=3){
		var array = [1,5];
	} else {
		var array = [1,2,3,4,5];
	}
	let unshuffled = Array();
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length; j++) {
			unshuffled.push(`${array[i]}${array[j]}`);
		}
	}
	while (array.length < numTrials[level-1]){
		array = array.concat(array)
	}
	shuffled = Array()
	// for level 3, the correct label is an array of the dimensions
	// for levels 1 and 2, the correct label undefined
	for (stim of shuffleArray(unshuffled)){
		shuffled.push({correct:numericMap[stim],
						response:alphaMap[stim],
						stimuli_1:stim[0],
						stimuli_2:stim[1]});
	}
	return shuffled.slice(0,numTrials[level-1])
}

function playStimulus(){
	// if training level is one highlight the right thing
	// play the stimulus
	// document.getElementById('audio').setAttribute('src','audios/d'+stimuli[index]['stimuli_1']+'_s'+stimuli[index]['stimuli_2']+'.wav')
	stimulusAudio.src ='audios/d'+stimuli[index]['stimuli_1']+'_s'+stimuli[index]['stimuli_2']+'.wav';
	// document.getElementById('audio').muted = false;
	stimulusAudio.play();
	setTimeout(toggleButtonsOn(stimuli[index].correct),stimulusLength);
}

function record(responseNum){
	for (idx of [1,2,3,4]){
		document.getElementById(idx).disabled = true;
	}
	let trainingDelay = 1;
	switch (trainingLevel){
		case 1:
			document.getElementById(stimuli[index].correct).style = '';
			break;
		case 2:
			trainingDelay += 1000;
			// highlight the correct answer for one second
			supposedToClick = document.getElementById(stimuli[index].correct)
			supposedToClick.style = 'background-color:lime;';
			setTimeout(toggleHighlight,1000);

			//TODO set up intra-block quitting criterion
			// if (criteria not met){
			// 	index  = stimuli.length;
			// 	block = numBlocks;
			// }
			break;
	}
	saveData([subjectNum,
			index+1+(block-1)*numTrials[trainingLevel-1],
			trainingLevel,
			'D_S',
			stimuli[index].stimuli_1,
			stimuli[index].stimuli_2,
			stimuli[index].response,
			responseNum,
			stimuli[index].correct])
	setTimeout(progress,trainingDelay);
}

function saveData(arr){
	let formData = new FormData();
	formData.append('title',title);
	for (i=0;i<arr.length;i++){
		formData.append(responseTitles[i],arr[i])
	}	
	let innerRequest = new XMLHttpRequest();
	innerRequest.open("POST", "process_data.php"); 
	innerRequest.send(formData); 
}

//////////////////////////
// Formatting Functions //
//////////////////////////

function toggleButtonsOn(correct){
	if (trainingLevel != 1){
		// toggle the incorrects on
		document.getElementById('1').disabled = false;
		document.getElementById('2').disabled = false;
		document.getElementById('3').disabled = false;
		document.getElementById('4').disabled = false;
	} else {
		document.getElementById(correct).disabled = false;
		document.getElementById(correct).style = 'background-color:lime;';
	}
}

function toggleHighlight(){
	document.getElementById(stimuli[index].correct).style = '';
}

function allow_ending(){
	let navNode = document.getElementById('nav');
	navNode.style.visibility = 'visible';
	navNode.disabled = false;
	navNode.onclick = end;
	navNode.innerHTML = 'Close';
}

//////////////////////
// Helper Functions //
//////////////////////

function shuffleArray(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr
}
