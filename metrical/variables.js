function shuffle(array) { // copied from elsewhere
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

var audioPath = "https://staff.washington.edu/sbng/mturk/audio/";

var questionsCopy = questions.slice(0);
var questionArray = [];

pianoSentences = shuffle(pianoSentences);
var numPianos = pianoSentences.length;
var userPianoCounts = Array(numPianos);
var userPianoNotes = Array(numPianos);
var userPianoTimes = Array(numTaps);

tapSentences = shuffle(tapSentences);
var numTaps = tapSentences.length;
var userTapCounts = Array(numTaps);
var userTapTimes = Array(numTaps);

for (var i = 0; i<numPianos;i++){
	userPianoNotes[i]= Array(0);
	userPianoTimes[i]= Array(0);
}
for (var i = 0;i<numTaps;i++){
	userTapTimes[i] = Array(0)}

var pianoList = Array(6);

var prompts =  {};
var width = 2;
var taps = 0;
var index = 0;
var where = 0; // you're  on the first page

var allSounds = [
	new Audio(audioPath+"c3.mp3"),new Audio(audioPath+"cs3.mp3"),
	new Audio(audioPath+"d3.mp3"),new Audio(audioPath+"ds3.mp3"),
	new Audio(audioPath+"e3.mp3"),
	new Audio(audioPath+"f3.mp3"),new Audio(audioPath+"fs3.mp3"),
	new Audio(audioPath+"g3.mp3"),new Audio(audioPath+"gs3.mp3"),
	new Audio(audioPath+"a3.mp3"),new Audio(audioPath+"as3.mp3"),
	new Audio(audioPath+"b3.mp3"),
	new Audio(audioPath+"c4.mp3"),new Audio(audioPath+"cs4.mp3"),
	new Audio(audioPath+"d4.mp3"),new Audio(audioPath+"ds4.mp3"),
	new Audio(audioPath+"e4.mp3"),
	new Audio(audioPath+"f4.mp3"),new Audio(audioPath+"fs4.mp3"),
	new Audio(audioPath+"g4.mp3"),new Audio(audioPath+"gs4.mp3"),
	new Audio(audioPath+"a4.mp3"),new Audio(audioPath+"as4.mp3"),
	new Audio(audioPath+"b4.mp3") ];
var notes = {
	81:allSounds[0],50:allSounds[1],87:allSounds[2],51:allSounds[3],
	69:allSounds[4],82:allSounds[5],53:allSounds[6],84:allSounds[7],
	54:allSounds[8],89:allSounds[9],55:allSounds[10],85:allSounds[11],
	73:allSounds[12],57:allSounds[13],79:allSounds[14],48:allSounds[15],
	80:allSounds[16],90:allSounds[17],83:allSounds[18],88:allSounds[19],
	68:allSounds[20],67:allSounds[21],70:allSounds[22],86:allSounds[23]};
var piano = '<svg id="piano" class="scaling-svg" viewBox="200 0 800 250" preserveAspectRatio="xMidYMin">\
	<polygon points="200,11 230,11 230,125 245,125 245,220 200,220 200,11" class="white" id="81" />\
	<polygon points="245,125 260,125 260,11 275,11 275,125 290,125 290,220 245,220 245,100" class="white" id="87"/>\
	<polygon points="305,11 335,11 335,220 290,220 290,125 305,125 305,11" class="white" id="69"/>\
	<polygon points="335,11 365,11 365,125 380,125 380,220 335,220 335,11" class="white" id="82"/>\
	<polygon points="380,125 395,125 395,11 410,11 410,125 425,125 425,220 380,220 380,100" class="white" id="84"/>\
	<polygon points="425,125 440,125 440,11 455,11 455,125 470,125 470,220 425,220 425,100" class="white" id="89"/>\
	<polygon points="470,125 485,125 485,11 515,11 515,220 470,220 470,100" class="white" id="85"/>\
	<polygon points="515,11 545,11 545,125 560,125 560,220 515,220 515,11" class="white" id="73"/>\
	<polygon points="560,125 575,125 575,11 590,11 590,125 605,125 605,220 560,220" class="white" id="79"/>\
	<polygon points="605,125 620,125 620,11 650,11 650,220 605,220 605,100" class="white" id="80"/>\
	<polygon points="650,11 680,11 680,125 695,125 695,220 650,220 650,11" class="white" id="90"/>\
	<polygon points="695,125 710,125 710,11 725,11 725,125 740,125 740,220 695,220 695,100" class="white" id="88"/>\
	<polygon points="740,125 755,125 755,11 770,11 770,125 785,125 785,220 740,220 740,100" class="white" id="67"/>\
	<polygon points="785,125 800,125 800,11 830,11 830,220 785,220 785,100" class="white" id="86"/>\
	<polygon points="230,10 260,10 260,125 230,125 230,10" class="black" id="50"/>\
	<polygon points="275,10 305,10 305,125 275,125 275,10" class="black" id="51"/>\
	<polygon points="365,10 395,10 395,125 365,125 365,10" class="black" id="53"/>\
	<polygon points="410,10 440,10 440,125 410,125 410,10" class="black" id="54"/>\
	<polygon points="455,10 485,10 485,125 455,125 455,10" class="black" id="55"/>\
	<polygon points="545,10 575,10 575,125 545,125 545,10" class="black" id="57"/>\
	<polygon points="590,10 620,10 620,125 590,125 590,10" class="black" id="48"/>\
	<polygon points="680,10 710,10 710,125 680,125 680,10" class="black" id="83"/>\
	<polygon points="725,10 755,10 755,125 725,125 725,10" class="black" id="68"/>\
	<polygon points="770,10 800,10 800,125 770,125 770,10" class="black" id="70"/>\
	<text x="209" y="200" class="whiteKeys">Q</text>\
	<text x="254" y="200" class="whiteKeys">W</text>\
	<text x="300" y="200" class="whiteKeys">E</text>\
	<text x="344" y="200" class="whiteKeys">R</text>\
	<text x="389" y="200" class="whiteKeys">T</text>\
	<text x="434" y="200" class="whiteKeys">Y</text>\
	<text x="480" y="200" class="whiteKeys">U</text>\
	<text x="524" y="200" class="whiteKeys">I</text>\
	<text x="569" y="200" class="whiteKeys">O</text>\
	<text x="614" y="200" class="whiteKeys">P</text>\
	<text x="660" y="200" class="whiteKeys">Z</text>\
	<text x="704" y="200" class="whiteKeys">X</text>\
	<text x="749" y="200" class="whiteKeys">C</text>\
	<text x="794" y="200" class="whiteKeys">V</text>\
	<text x="235" y="110" class="blackKeys">2</text>\
	<text x="281" y="110" class="blackKeys">3</text>\
	<text x="370" y="110" class="blackKeys">5</text>\
	<text x="416" y="110" class="blackKeys">6</text>\
	<text x="462" y="110" class="blackKeys">7</text>\
	<text x="551" y="110" class="blackKeys">9</text>\
	<text x="596" y="110" class="blackKeys">0</text>\
	<text x="685" y="110" class="blackKeys">S</text>\
	<text x="731" y="110" class="blackKeys">D</text>\
	<text x="777" y="110" class="blackKeys">F</text>\
	</svg>';







