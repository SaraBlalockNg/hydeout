// set union
Set.prototype.union = function(otherSet) { 
    let union = new Set(this); 
    for(elem of otherSet) 
        union.add(elem); 
    return union; 
} 
// set intersection
Set.prototype.intersection = function(otherSet) { 
	let intersection = new Set();
	if (otherSet.size > 0){
		for (elem of otherSet) { 
			if (this.has(elem)) {
				intersection.add(elem); 
			}
		}
	}
	return intersection;				 
}

let form  = document.getElementById('config');
var labels = ['antecedent','subsequent','target'];
var stresses = new Set(['0','1','2']);
// the sets we can apply our logic to, from ARPABET
// there is a leading empty string to make it easier to match indices
// these lists, with the exception of voicings and rounds, are expected to stay in this order
let heights = ['',new Set(['IY','UW']),new Set(['IH','UH']),new Set(['OW']),new Set(['AH','ER']),new Set(['AO','OY']),new Set(['AE']),new Set(['AA',])];
let backnesses = ['',new Set(['IY','EH','AE']), new Set(['IH']), new Set(['AH','ER']), new Set(['UH']), new Set(['UW','AO','AA',])];
let rounds = {rounded: new Set(['UW','UH','AO']),
				unrounded: new Set(['IY','EH','AE','AH','ER','AA'])};
let rhotics = {rhotic: new Set(['ER']),
				nonrhotic: new Set(['AA','AE','AH','AO','IH','IY','OW','OY','UH','UW'])};
let diphthongs = ['',new Set(['AY']),new Set(['AW']),new Set(['OW']),new Set(['OY']),new Set(['EY'])]
let places = ['',new Set(['P','B','M']), new Set(['F','V']), new Set(['DH','TH']), new Set(['T','D','N','S','Z','R','L','CH','JH']), new Set(['SH','ZH']), new Set(['Y']), new Set(['K','G','NG','W']), new Set(['HH'])];
let manners = ['',new Set(['P','B','T','D','K','G']), new Set(['M','N','NG']), new Set(['CH','JH']), new Set(['F','V','TH','DH','S','Z','SH','ZH','HH']), new Set(['W','R','L','J'])];
let voicings = {voiced: new Set(['B','M','V','DH','JH','Z','D','N','R','ZH','L','G','NG','W','J']), 
				voiceless: new Set(['P','F','TH','CH','T','S','SH','K','HH'])};
var vowels = new Set(['AA','AE','AH','AO','AW','AY','EH','ER','EY','IH','IY','OW','OY','UH','UW']);
var consonants = new Set(['B','CH','D','DH','F','G','HH','J','JH','K','L','M','N','NG','P','R','S','SH','T','TH','V','W','Z','ZH']);
var dimensions = {rhoticity:rhotics,diphthong:diphthongs,height:heights,backness:backnesses,rounding:rounds,place:places,manner:manners,voicing:voicings};

form.addEventListener('submit', (event) => {
	// handle the form data
	let alertMessage = "";
	event.preventDefault(); // TODO do I need this?
	// antecedent check
	if (!document.getElementById('initial').checked){
		let antecedents = Array.from(document.getElementsByName('antecedent'))
		if (!antecedents.some(function(element) {return element.checked;})){
			alertMessage += "You need to specify an antecedent type.\r\n"
		} else if (antecedents[1].checked){
			alertMessage += checkVowel(0);
		} else if (antecedents[2].checked){
			alertMessage += checkConsonant(0);
		}
	}
	// subsequent check
	if (!document.getElementById('final').checked){
		var subsequents = Array.from(document.getElementsByName('subsequent'))
		if (!subsequents.some(function(element) {return element.checked;})){
			alertMessage += "You need to specify an subsequent type.\r\n"
		} else if (subsequents[1].checked){
			alertMessage += checkVowel(1);
		} else if (subsequents[2].checked){
			alertMessage += checkConsonant(1);
		} 	
	}
	// target check
	targetNodes = Array.from(document.getElementsByName('target'));
	if (!targetNodes.some(function(element){return element.checked;})){
		alertMessage += "You need to specify a target type.\r\n"
	} else if (targetNodes[0].checked){
		// its a vowel
		alertMessage += checkVowel(2);
	} else {
		// its a consonant
		alertMessage += checkConsonant(2);
	}
	if (alertMessage != ""){
		alert(alertMessage);
	}
	else {
		
		// first figure out what the targets are
		if (form.elements['target'].value == 'vowel'){
			var targetPhones = aggregateVowels(2);
		} else {
			var targetPhones = aggregateConsonants(2);
		}

		// then figure out what can precede
		if (document.getElementById('initial').checked){
			var antecedentPhones = new Set(['<S>']);
		} else if (form.elements['antecedent'].value == 'all'){
			// all vowels and all consonants
			var antecedentPhones = vowels.union(consonants);
		} else if (form.elements['antecedent'].value == 'vowel'){
			var antecedentPhones = aggregateVowels(0);
		} else {
			var antecedentPhones = aggregateConsonants(0);
		}
		// then figure out what can follow
		if (document.getElementById('final').checked){
			subsequentPhones = new Set(['</S>']);
		} else if (form.elements['subsequent'].value == 'all'){
			var subsequentPhones = vowels.union(consonants);
		} else if (form.elements['subsequent'].value == 'vowel'){
			var subsequentPhones = aggregateVowels(1);
		} else {
			var subsequentPhones = aggregateConsonants(1);
		}
	}
	// look up words in cmu
	// deal with stress which shows up as the last character of a vowel
	if (document.getElementById('stressed').checked){
		var stressed = true;
	} else if (document.getElementById('unstressed').checked){
		var unstressed = true;
	}
	var wordlist = new Set();
	for (entry of targetPhones.entries()){
		var phone = entry[1];
		if (stressed){
				phone += 1
		} else if (unstressed){
			phone += 0
		}
		for (word of cmuFreq){
			var pronunciation = cmu[word];
			if (!stressed & !unstressed & vowels.has(phone)){
				spronunciation = Array();
				for (x of cmu[word]){
					if (stresses.has(x.slice(-1))){
						pronunciation.push(x.slice(0,-1));
					} else {
						pronunciation.push(x);
					}
				}
			}

			let idx = pronunciation.indexOf(phone);
			// don't worry about multiple phones in the same word
			if (idx > 0){
				// the target phone is in this word
				// now check if the anteceents an subsequents match
				let ante = pronunciation[idx-1];
				if (stresses.has(ante.slice(-1))){
					// get rid of stress marker in an antecedent
					ante = ante.slice(0,-1);
				}
				if (antecedentPhones.has(ante)){
					let subseq = pronunciation[idx+1];
					if (stresses.has(subseq.slice(-1))){
						subseq = subseq.slice(0,-1);
					}
					if (subsequentPhones.has(subseq)){
						// we've made it; stop here (and remove that word from the list?)
						wordlist.add(word)
						break;
					}
				} 
				// else {
				// 	// we could try and see if there is another index of the target in the word
				// 	// add a recursion here
				// 	console.log('not implemented');
				// }
			}
		}
	}
	
	// if the length of the wordlist is shorter than the targets, then the minimal set failed
	if (wordlist.size != targetPhones.size){
		alert('A minimal set was not able to be constructe.  Generating partial set...');
	}

	var cleanWordlist = new Set();
	for (entry of wordlist.entries()){
		let idx = entry[1].indexOf("_")
		if (idx != -1){
			cleanWordlist.add(entry[1].slice(0,idx));
		} else {
			cleanWordlist.add(entry[1])
		}
	}


	document.getElementById('download').disabled = document.getElementById('download').hidden = false;
	var fileName = 'elicitations.txt';
	
	var fileContent = Array.from(cleanWordlist).join('\n');
	var myFile = new Blob([fileContent], {type: 'text/plain'});
	window.URL = window.URL || window.webkitURL;
	document.getElementById('download').setAttribute('href', window.URL.createObjectURL(myFile));
	document.getElementById('download').setAttribute('download', fileName);

});

function aggregateVowels(level){
	// get the list features
	let heightNodes = Array.from(document.getElementsByName('height'+level));
	let backnessNodes = Array.from(document.getElementsByName('backness'+level));
	let diphthongNodes = Array.from(document.getElementsByName('diphthong'+level));
	
	// pull the relevant phonemes
	let heightCandidates = getCandidates('height',heightNodes);
	let backnessCandidates = getCandidates('backness',backnessNodes);
	let roundingCandidates = get1DCandidate(level,'rounding');
	let rhoticityCandidates = get1DCandidate(level,'rhoticity');	

	// add in the diphthongs
	let diphthongCandidates = getCandidates('diphthong',diphthongNodes);
	return heightCandidates.intersection(backnessCandidates).intersection(roundingCandidates).intersection(rhoticityCandidates).union(diphthongCandidates);
}

function aggregateConsonants(level){
	// get the list features
	let pNodes = Array.from(document.getElementsByName('place'+level));
	let mNodes = Array.from(document.getElementsByName('manner'+level));

	// pull the relevant phonemes
	let pC = getCandidates('place',pNodes);
	let mC = getCandidates('manner',mNodes);
	let vC = get1DCandidate(level,'voicing');
	return pC.intersection(mC).intersection(vC);	
}

function get1DCandidate(level,dimension){
	if (form.elements[dimension+level].value == 'all'){
		if (dimension == 'rounding'){
			return dimensions[dimension]['rounded'].union(dimensions[dimension]['unrounded']);
		} else if (dimension == 'rhoticity'){
			return dimensions[dimension]['rhotic'].union(dimensions[dimension]['nonrhotic']);
		} else {
			return dimensions[dimension]['voiceless'].union(dimensions[dimension]['voiced']);
		}
	} else if (form.elements[dimension+level].value==''){
		return new Set();
	} else {
		return dimensions[dimension][form.elements[dimension+level].value];
	}

}

function getCandidates(dimension,nodesList){
	let idx = new Set();	
	for (h of Array.from(nodesList.entries()).slice(1,).filter(function(e){return e[1].checked;})){
    	idx.add(h[0]);
	}
	let phonesByDimension = new Set();
	for (i of idx){
		phonesByDimension = phonesByDimension.union(dimensions[dimension][i]);
	}
	return phonesByDimension;
}

function checkVowel(i){
	// vowels need height, backness, rhoticity, and rounding
	let message = "";
	let heightNodes = Array.from(document.getElementsByName('height'+i));
	let backnessNodes = Array.from(document.getElementsByName('backness'+i));
	let roundingNodes = Array.from(document.getElementsByName('rounding'+i));
	let rhoticityNodes = Array.from(document.getElementsByName('rhoticity'+i));
	let diphthongNodes = Array.from(document.getElementsByName('diphthong'+i));
	if (!diphthongNodes.some(function(e){return e.checked})){
		if (!heightNodes.some(function(e) {return e.checked;})) { 
			message += "Place needs to be specified for "+labels[i]+' segment.\r\n';
		}
		if (!backnessNodes.some(function(e) {return e.checked;})) { 
			message += "Manner needs to be specified for "+labels[i]+' segment.\r\n';
		}
		if (!roundingNodes.some(function(e) {return e.checked;})) { 
			message += "Voicing needs to be specified for "+labels[i]+' segment.\r\n';
		}
		if (!rhoticityNodes.some(function(e) {return e.checked;})) { 
			message += "Rhoticity needs to be specified for "+labels[i]+' segment.\r\n';
		}
	}
	return message;
}

function checkConsonant(i){
	// consonants need place, manner, and voicing
	let message = "";
	let placeNodes = Array.from(document.getElementsByName('place'+i));
	let mannerNodes = Array.from(document.getElementsByName('manner'+i));
	let voicingNodes = Array.from(document.getElementsByName('voicing'+i));
	if (!placeNodes.some(function(e) {return e.checked;})) { 
		message += "Place needs to be specified for "+labels[i]+' segment.\r\n';
	}
	if (!mannerNodes.some(function(e) {return e.checked;})) { 
		message += "Manner needs to be specified for "+labels[i]+' segment.\r\n';
	}
	if (!voicingNodes.some(function(e) {return e.checked;})) { 
		message += "Voicing needs to be specified for "+labels[i]+' segment.\r\n';
	}
	return message;
}

function toggleChecks(type,i){
	switch(type){
		case 'height':
			var boxes = ['aha','ahb','ahc','ahd','ahe','ahf','ahg'];
			var name = 'aheight';
			break;
		case 'backness':
			var boxes = ['aba','abb','abc','abd','abe'];
			var name = 'aback';
			break;
		case 'place':
			var boxes = ['apa','apb','apc','apd','ape','apf','apg','aph'];
			var name = 'aplace';
			break;
		case 'manner':
			var boxes = ['ama','amb','amc','amd','ame'];
			var name = 'amanner'
			break;
		case 'diphthong':
			var boxes = ['ada','adb','adc','add','ade'];
			var name = 'adiphthong'
			break;
	}
	if (document.getElementById(name+i).checked) {
		// if it's check, check all other things
		for (idx in boxes){
			document.getElementById(boxes[idx]+i).checked = document.getElementById(boxes[idx]+i).disabled = true;
		}
	} else {
		for (idx in boxes){
			document.getElementById(boxes[idx]+i).checked = document.getElementById(boxes[idx]+i).disabled = false;
		}
	}
}

function vowelOptions(i){
	document.getElementById('optionsHolder'+i).innerHTML = `<div class="row">
	<div class="column">
		<h4>height?</h4>
		<input type="checkbox" id="aheight`+i+`" name="height`+i+`" onchange="toggleChecks('height',`+i+`);"><label for="aheight`+i+`">all</label><br>
		<input type="checkbox" id="aha`+i+`" name="height`+i+`"><label for="aha`+i+`">high</label><br>
		<input type="checkbox" id="ahb`+i+`" name="height`+i+`"><label for="ahb`+i+`">near-high</label><br>
		<input type="checkbox" id="ahc`+i+`" name="height`+i+`"><label for="ahc`+i+`">mid-high</label><br>
		<input type="checkbox" id="ahd`+i+`" name="height`+i+`"><label for="ahd`+i+`">mid</label><br>
		<input type="checkbox" id="ahe`+i+`" name="height`+i+`"><label for="ahe`+i+`">mid-low</label><br>
		<input type="checkbox" id="ahf`+i+`" name="height`+i+`"><label for="ahf`+i+`">near-low</label><br>
		<input type="checkbox" id="ahg`+i+`" name="height`+i+`"><label for="ahg`+i+`">low</label><br>
	</div>
	<div class="column">
		<h4>backness?</h4>
		<input type="checkbox" id="aback`+i+`" name="backness`+i+`" onchange="toggleChecks('backness',`+i+`);"><label for="all_backness`+i+`">all</label><br>
		<input type="checkbox" id="aba`+i+`" name="backness`+i+`"><label for="aba`+i+`">front</label><br>
		<input type="checkbox" id="abb`+i+`" name="backness`+i+`"><label for="abb`+i+`">near-front</label><br>
		<input type="checkbox" id="abc`+i+`" name="backness`+i+`"><label for="abc`+i+`">central</label><br>
		<input type="checkbox" id="abd`+i+`" name="backness`+i+`"><label for="abd`+i+`">near-back</label><br>
		<input type="checkbox" id="abe`+i+`" name="backness`+i+`"><label for="abe`+i+`">back</label><br>
	</div>
	<div class="column">
		<h4>rounding?</h4>
		<input type="radio" value='all' id="all_rounding" name="rounding`+i+`"><label for="all_rounding">all</label><br>
		<input type="radio" value = 'rounded' id="rounded" name="rounding`+i+`"><label for="rounded">rounded</label><br>
		<input type="radio" value = 'unrounded' id="unrounded" name="rounding`+i+`"><label for="unrounded">unrounded</label><br>
	</div>
	<div class="column">
		<h4>rhoticity?</h4>
		<input type="radio" value='all' id="all_rhoticity" name="rhoticity`+i+`"><label for="all_rhoticity">all</label><br>
		<input type="radio" value = 'rhotic' id="rhotic" name="rhoticity`+i+`"><label for="rhotic">rhotic</label><br>
		<input type="radio" value = 'nonrhotic' id="nonrhotic" name="rhoticity`+i+`"><label for="nonrhotic">nonrhotic</label><br>
	</div>
	<div class="column">
		<h4>add diphthongs?</h4>
		<input type="checkbox" id="adiphthong`+i+`" name="diphthong`+i+`" onchange="toggleChecks('diphthong',`+i+`);"><label for="all_diphthong`+i+`">all</label><br>
		<input type="checkbox" id="ada`+i+`" name="diphthong`+i+`"><label for="aba`+i+`">ai</label><br>
		<input type="checkbox" id="adb`+i+`" name="diphthong`+i+`"><label for="abb`+i+`">au</label><br>
		<input type="checkbox" id="adc`+i+`" name="diphthong`+i+`"><label for="abc`+i+`">ou</label><br>
		<input type="checkbox" id="add`+i+`" name="diphthong`+i+`"><label for="abd`+i+`">oi</label><br>
		<input type="checkbox" id="ade`+i+`" name="diphthong`+i+`"><label for="abe`+i+`">ei</label><br>
	</div>
</div`;
}

function consonantOptions(i){
	document.getElementById('optionsHolder'+i).innerHTML = `<div class="row">
	<div class="column">
		<h4>place?</h4>
		<input type="checkbox" id="aplace`+i+`" name="place`+i+`" onchange="toggleChecks('place',`+i+`);"><label for="all_place`+i+`">all</label><br>
		<input type="checkbox" id="apa`+i+`" name="place`+i+`"><label for="apa`+i+`">bilabial</label><br>
		<input type="checkbox" id="apb`+i+`" name="place`+i+`"><label for="apb`+i+`">labiodental</label><br>
		<input type="checkbox" id="apc`+i+`" name="place`+i+`"><label for="apc`+i+`">dental</label><br>
		<input type="checkbox" id="apd`+i+`" name="place`+i+`"><label for="apd`+i+`">alveolar</label><br>
		<input type="checkbox" id="ape`+i+`" name="place`+i+`"><label for="ape`+i+`">postalveolar</label><br>
		<input type="checkbox" id="apf`+i+`" name="place`+i+`"><label for="apf`+i+`">velar</label><br>
		<input type="checkbox" id="apg`+i+`" name="place`+i+`"><label for="apg`+i+`">uvular</label><br>
		<input type="checkbox" id="aph`+i+`" name="place`+i+`"><label for="aph`+i+`">glottal</label><br>
	</div>
	<div class="column">
		<h4>manner?</h4>
		<input type="checkbox" id="amanner`+i+`" name="manner`+i+`" onchange="toggleChecks('manner',`+i+`);"><label for="amanner`+i+`">all</label><br>
		<input type="checkbox" id="ama`+i+`" name="manner`+i+`"><label for="ama`+i+`">stop</label><br>
		<input type="checkbox" id="amb`+i+`" name="manner`+i+`"><label for="amb`+i+`">nasal</label><br>
		<input type="checkbox" id="amc`+i+`" name="manner`+i+`"><label for="amc`+i+`">affricate</label><br>
		<input type="checkbox" id="amd`+i+`" name="manner`+i+`"><label for="amd`+i+`">fricative</label><br>
		<input type="checkbox" id="ame`+i+`" name="manner`+i+`"><label for="ame`+i+`">approximant</label><br>
	</div>
	<div class="column">
		<h4>voicing?</h4>
		<input type="radio" value='all' id="all_voicing" name="voicing`+i+`"><label for="all_voicing">all</label><br>
		<input type="radio" value='voiced' id="voiced" name="voicing`+i+`"><label for="voiced">voiced</label><br>
		<input type="radio" value='voiceless' id="voiceless" name="voicing`+i+`"><label for="voiceless">voiceless</label><br>
	</div>
</div>`;
}

function allOptions(i){
	document.getElementById('optionsHolder'+i).innerHTML = '';
}

function toggleAntecedent(){
	if (document.getElementById('initial').checked){
		document.getElementById('antecedent').innerHTML = '';
	}	else {
		// add back in the antecedent
		document.getElementById('antecedent').innerHTML = `<h4>Antecedent:</h4>
			<input type='radio' value='all' name='antecedent' onchange="allOptions(0);"><label for='all'>all</label><br>
			<input type='radio' value='vowel' name='antecedent' onchange="vowelOptions(0);"><label for='vowel' >vowel</label><br>
			<input type='radio' value='consonant' name='antecedent' onchange="consonantOptions(0);"><label for='consonant'>consonant</label><br>
			<div id='optionsHolder0'></div>`
	}
}

function toggleSubsequent(){
	if (document.getElementById('final').checked){
		document.getElementById('subsequent').innerHTML = '';
	} else {
		document.getElementById('subsequent').innerHTML = `<h4>Subsequent:</h4>
			<input type='radio' value='all' name='subsequent' onchange="allOptions(1);"><label for='all'>all</label><br>
			<input type='radio' value='vowel' name='subsequent' onchange="vowelOptions(1);"><label for='vowel' >vowel</label><br>
			<input type='radio' value='consonant' name='subsequent' onchange="consonantOptions(1);"><label for='consonant'>consonant</label><br>
			<div id='optionsHolder1'></div>`
	}
}

function makeVowel() {
	if (document.getElementById('stressed').checked | document.getElementById('unstressed').checked ){
		// need to specify vowel
		document.getElementById('targetVowel').checked = true;
		document.getElementById('targetConsonant').disabled = true;
		vowelOptions(2);
	} else {
		document.getElementById('targetConsonant').disabled = false;
	}
	if (document.getElementById('stressed').checked){
		document.getElementById('unstressed').disabled = true;
	}
	if (document.getElementById('unstressed').checked){
		document.getElementById('stressed').disabled = true;
	}
	if (!document.getElementById('stressed').checked){
		document.getElementById('unstressed').disabled = false;
	}
	if (!document.getElementById('unstressed').checked){
		document.getElementById('stressed').disabled = false;
	}
}