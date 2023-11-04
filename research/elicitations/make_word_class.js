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

// Function to get all combinations
function getAllCombinations(arrays) {
	return arrays.reduce((acc, currentArray) => {
		return acc.map((result) => {
			return currentArray.map((item) => {
				return [].concat(result, item);
			});
		}).reduce((a, b) => a.concat(b), []);
	}, [[]]);
}

function customSort(a, b) {
  const indexA = [...cmuFreq].indexOf(a);
  const indexB = [...cmuFreq].indexOf(b);
  if (indexA === -1) return 1;
  if (indexB === -1) return -1;
  return indexA - indexB;
}


// Function to check if an array matches the test array exactly, ignoring the first and last items and numbers
function matchesExactly(array, testArray, primaryStress = false) {
  if (array.length !== testArray.length + 2) {
    return false;
  }
  let slicedArray = array.slice(1, -1);
  let slicedTestArray = testArray.map(item => item.replace(/[0-9]$/, ""));
  for (let i = 0; i < slicedArray.length; i++) {
    if (slicedArray[i].replace(/[0-9]$/, "") !== slicedTestArray[i]) {
      return false;
    }
  }
  if (primaryStress) {
    for (let item of slicedArray) {
      if (item[item.length - 1] === "1") {
        return true;
      }
    }
    return false;
  }
  return true;
}

// Function to check if an array is a sub-array of the test array, ignoring numbers
function isSubArray(array, testArray, primaryStress = false) {
  if (array.length < testArray.length) {
    return false;
  }
  for (let i = 0; i <= array.length - testArray.length; i++) {
    let flag = true;
    for (let j = 0; j < testArray.length; j++) {
      if (array[i + j].replace(/[0-9]$/, "") !== testArray[j]) {
        flag = false;
        break;
      }
    }
    if (flag) {
      if (primaryStress) {
        for (let k = i; k < i + testArray.length; k++) {
          if (array[k][array[k].length - 1] === "1") {
            return true;
          }
        }
        return false;
      }
      return true;
    }
  }
  return false;
}


function getMatches(dictionaryOfArrays, testArray, exact,primaryStress){
	var matches = [];
	if (exact) {
		for (let key in dictionaryOfArrays) {
			if (matchesExactly(dictionaryOfArrays[key], testArray,primaryStress=primaryStress)) {
				matches.push(key);
			}
		}
	} else {
		for (let key in dictionaryOfArrays) {
			if (isSubArray(dictionaryOfArrays[key], testArray)) {
				matches.push(key);
			}
		}
	}
	return matches;
}


let form	= document.getElementById('config');
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
var allPhones = vowels.union(consonants)
var dimensions = {rhoticity:rhotics,diphthong:diphthongs,height:heights,backness:backnesses,rounding:rounds,place:places,manner:manners,voicing:voicings};

form.addEventListener('submit', (event) => {
	// handle the form data
	let alertMessage = "";
	event.preventDefault(); // TODO do I need this?
	// subsequent check
	var cleanWordlist = new Set(['1','2','3']);

	var primaryStress = document.getElementsByName('pstress')[0].checked;
	var exact = document.getElementsByName('exact')[0].checked;
	var inputText = form.elements['textInput'].value;

	// Split the text string by ' '
	var firstLevelArray = inputText.split(' ');
	var returnedArray = [];
	// Iterate through the elements of the first level array
	firstLevelArray.forEach((element) => {
			// Split each element by '|'
			var secondLevelArray = element.split('|');
				// Check if 'VX' is in the second level array
				var replacedArray = secondLevelArray.map((item) => {
						if (item === 'VX') {
							return Array.from(vowels);
								// return ['a','b','c'];
						}
						if (item === 'CX') {
							return Array.from(consonants);
							// return ['1','2','3','4'];
						}
						if (item === '_') {
							return Array.from(allPhones);
							// return ['a','b','c','1','2','3','4'];
						}
						return item;
				});
			secondLevelArray = replacedArray.flat();
			returnedArray.push(Array.from(new Set(secondLevelArray)));
	});

	allCombinations = getAllCombinations(returnedArray);

	// expand any wildcard
	var allMatches = [];
	for (candidate of allCombinations){
		let matches = getMatches(cmu,candidate,exact,primaryStress);
		allMatches.push(matches)
	}

	var toPrint = allMatches.flat()

	// count the number of vowels and assign 
	document.getElementById('download').disabled = document.getElementById('download').hidden = false;
	var fileName = 'wordclass.txt';
	
	var fileContent = toPrint.join('\n');
	var myFile = new Blob([fileContent], {type: 'text/plain'});
	window.URL = window.URL || window.webkitURL;
	document.getElementById('download').setAttribute('href', window.URL.createObjectURL(myFile));
	document.getElementById('download').setAttribute('download', fileName);

});
