var language = 'en'; // defaults to English
var questions = ['Are you a native English speaker?  It\'s okay if you\'re not, we just want to know.','Are you musically trained?','Where are you from?','Where were you raised?','What languages do you speak?  How well?','What do you think we are testing?','Please share any concerns you have about the study (if any).'];

function shuffle(array) {
  // copied from elsewhere
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
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

var nounSesq = shuffle(["wire", "tile"]);
var adjSesq = shuffle(["fine", "mine"]);
var verbSesq = shuffle(["whine", "mime"]);

var nounDip = shuffle(["wipe", "wife"]);
var verbDip = shuffle(["type", "wipe", "fight"]);
var adjDip = shuffle(["white", "tight", "wise"]);

var nounCoda = shuffle(["mall", "mop"]);
var verbCoda = shuffle(["fought", "fall"]);
var adjCoda = shuffle(["all", "on", "far"]);

var nounBisyb = shuffle(["snowball", "bullfrog"]);
var verbBisyb = shuffle(["eavesdrop", "applaud"]);
var adjBisyb = ["withdrawn"];

var nounShell1 = "I gave that * away";
var nounShell2 = "I gave that * to her";
var nounShell3 = "I gave that * downtime";
var verbShell1 = "We * under the sea";
var verbShell2 = "We * to the new beat";
var verbShell3 = "We * by the ocean";
var adjShell1 = "It's * and okay";
var adjShell2 = "It's * 'cause it's free";
var adjShell3 = "It's * but alright";

var obsNounShells = shuffle([nounShell2, nounShell3]);
var obsVerbShells = shuffle([verbShell2, verbShell3]);
var obsAdjShells = shuffle([adjShell2, adjShell3]);

var nounShells = shuffle([nounShell1, nounShell2, nounShell3]);
var verbShells = shuffle([verbShell1, verbShell2, verbShell3]);
var adjShells = shuffle([adjShell1, adjShell2, adjShell3]);

var allOneShells = [nounShells, verbShells, adjShells];
var allTwoShells = [obsNounShells, obsVerbShells, obsAdjShells];
var allThreeShells = [nounShells, verbShells, adjShells];

var allMonoNouns = shuffle([nounSesq, nounDip, nounCoda]);
var allMonoVerbs = shuffle([verbSesq, verbDip, verbCoda]);
var allMonoAdjs = shuffle([adjSesq, adjDip, adjCoda]);
var allMonos = [allMonoNouns, allMonoVerbs, allMonoAdjs];
var allBisyb = [nounBisyb, verbBisyb, adjBisyb];

var i;
var j;
var choice;
var shell;
var pianoSentences = [];
var tapSentences = [];

for (i = 0; i < 3; i++) {
  // for each of the pos types
  for (j = 0; j < 3; j++) {
    //for each of the mono syllable types
    // pick one word of that type and add it to the xshell1
    choice = shuffle(allMonos[i][j])[0]; // the one for the vowel shell
    shell = shuffle(allOneShells[i])[0];
    pianoSentences.push(shell.replace("*", choice));
    choice = shuffle(allMonos[i][j])[0]; // one for the consonant shell
    shell = shuffle(allTwoShells[i])[0];
    pianoSentences.push(shell.replace("*", choice));

    choice = shuffle(allMonos[i][j])[0]; // the one for the vowel shell
    shell = shuffle(allOneShells[i])[0];
    tapSentences.push(shell.replace("*", choice));
    choice = shuffle(allMonos[i][j])[0]; // one for the consonant shell
    shell = shuffle(allTwoShells[i])[0];
    tapSentences.push(shell.replace("*", choice));
  }
  for (j = 0; j < allBisyb[i].length; j++) {
    shell = shuffle(allThreeShells[i])[0];
    pianoSentences.push(shell.replace("*", allBisyb[i][j]));
    shell = shuffle(allThreeShells[i])[0];
    tapSentences.push(shell.replace("*", allBisyb[i][j]));
  }
}

var informedConsentTemplate = '<table style="width:100%">\
	<tr><th>Study Title: <em>Play a tune/tap spacebar to a sentence</em></th></tr>\
	<tr><th>Researcher: Sara Ng and Gasper Begus<br>\
		Institution: Department of Linguistics, University of Washington.<br>\
		Email: <a href="mailto:begus@uw.edu">begus@uw.edu</a><br>\
		Phone: +1 206 221 4031</th></tr>\
	<tr><th>Version Date: April 16, 2019</th></tr>\
</table>\
<p class="icSectionHeader">Key Information</p>\
<p class="icMain">The following is a short summary of this study to help you decide whether or not to be a part of this study. More detailed information is listed later on in this form.</p>\
<p class="icHeader">Why am I being invited to take part in a research study?</p>\
<p class="icMain">We invite you to take part in a research study because you are a native English speaker.</p>\
<p class="icHeader">What should I know about a research study?</p>\
<ul><li>Whether or not you take part is up to you.\
</li><li>You can choose not to take part.\
</li><li>You can agree to take part and later change your mind.\
</li><li>Your participation is completely voluntary.\
</li><li>Your decision will not be held against you.\
</li><li>You can ask all the questions you want before you decide.</li></ul>\
<p class="icHeader">Why is this research being done?</p>\
<p class="icMain">The purpose of this research is to examine how people speak and use language.</p>\
<p class="icHeader">How long will the research last and what will I need to do?</p>\
<p class="icMain">We expect that you will be in this research study for 2-3 min.\
</p><p class="icMain">First, you will see a few sentences and you’ll be asked to play a tune to these sentences with a virtual piano keyboard. Then, you’ll see another set of sentences and will be asked to tap spacebar to these sentences.</p>\
<p class="icHeader">Is there any way being in this study could be bad for me?</p>\
<p class="icMain">We don’t believe there are any risks from participating in this research. The effects of participating should be comparable to those you would experience from typing on a computer.</p>\
<p class="icHeader">Will being in this study help me in any way?</p>\
<p class="icMain">There are no benefits to you from your taking part in this research. We cannot promise any benefits to others from your taking part in this research. However, the knowledge obtained in this study may help us understand how people learn and use human language.\
<p class="icSectionHeader">Detailed Information</p>			\
<p class="icMain">The following is more detailed information about this study in addition to the information listed above.</p>\
<p class="icHeader">What is the purpose of this research? </p>\
<p class="icMain">The purpose of this research is to understand how people learn language.</p>\
<p class="icHeader">How long will I take part in this research?</p>\
<p class="icMain">You will be asked to speak for approximately 2-3 minutes. If at any point you become tired or would like to stop, please inform us.</p>\
<p class="icHeader">What can I expect if I take part in this research?</p>\
<p class="icMain">The study staff at your study site (“Study Site”) will collect information about you. This form calls such information your “Personal Information” and it will include your demographic information, the information you give to study staff as part of the study, Amazon Worker ID and the results of any tests, surveys or procedures described in this informed consent form. It may also include information about your place of birth, history of where you lived, age.</p>\
<p class="icMain">We will not inform you about the results of the study.</p>\
<p class="icHeader">You will be asked</p>\
<p class="icMain">For approximately 2-3 minutes or less, you will be asked to:</p>\
<ol type="i"><li>Play a tune to a sentence</li>\
<li>Tap spacebar to a sentence</li>\
<li>Tell us some basics about you (e.g. your age, where you live, where you have lived, if you have taken any linguistics courses, if you speak the English, and if you have any close relatives in the household who speak different dialects)</li></ol>\
<p class="icMain">The study is lead by Gasper Begus. The research will be performed online during 2019. If you feel uncomfortable or tired at any point during the research, feel free to inform Gasper Begus (begus@uw.edu). You can leave the research at any time it will not be held against you.</p>\
<p class="icHeader">What happens if I say yes, but I change my mind later?</p>\
<p class="icMain">You can leave the research at any time it will not be held against you.</p>\
<p class="icMain">If you withdraw from the study, you will no longer be able to participate in the study. No new information or samples will be collected about you or from you by the study team. Your withdrawal has no effect on the lawfulness of the data processing that occurred prior to your withdrawal.</p>\
<p class="icMain">Your Study Site may still, after your withdrawal, need to report any safety event that you may have experienced due to your participation to the University of Washington and other entities involved in the study. Your Personal Information, including Coded Information, that has already been collected up to the time of your withdrawal will be kept and used to guarantee the integrity of the study, to determine the safety effects of procedures, to satisfy any legal or regulatory requirements related to ensuring public health, and/or for any other purposes permitted under applicable data protection and privacy laws. </p>\
<p class="icMain">Your Personal Information (including Coded Information) will not be used for further scientific research. However, if permitted by applicable law, your Personal Information may be anonymized so that the information does not identify you personally, and such anonymized information may be used for further research.</p>\
<p class="icHeader">If I take part in this research, how will my privacy be protected? What happens to the information you collect?</p>\
<p class="icMain">Efforts will be made to limit the use and disclosure of your personal information, including research study, to people who have a need to review this information. We cannot promise complete secrecy. Organizations that may inspect and copy your information include the IRB and other representatives of this organization.</p>\
<p class="icMain">Your Personal Information will be treated in compliance with applicable data protection laws. Harvard and your Study Site are joint controllers of your Personal Information collected for this study and the institution is the controller of information collected for your treatment.</p>\
<p class="icMain">Your Personal Information needed for the research will be saved, analysed and, if necessary, transferred outside of your Study Site. Before the Study Site transfers your Personal Information, the Study Site will replace your name with a unique code and remove information that directly identifies you. This is called your “Coded Information” in this form, and it is sometimes called “pseudonymised data” by data protection laws.</p>\
<p class="icMain">The University of Washington and some of the other people using your Personal Information, including your Coded Information, may be based in countries other than your country, including the United States. Data protection and privacy laws in these countries may not offer the same level of protection as those in your own country. The University of Washington, your study site, and those working with the University of Washington and your Study Site will take steps to maintain the confidentiality of your Personal Information.</p>\
<p class="icMain">If your Personal Information is transferred by the Study Site from the EU, EEA, and/or Switzerland to other countries that have not yet been found by European regulators to meet requirements for protection of Personal Information, the Study Site has in place standard EU data transfer agreements to protect your Personal Information. A copy of these standard data transfer agreements is available at:</p>\
<p class="icMain"><a href="https://eur-lex.europa.eu/legal-content/en/ALL/?uri=CELEX:32001D0497" target="_blank">https://eur-lex.europa.eu/legal-content/en/ALL/?uri=CELEX:32001D0497</a></p>\
<p class="icMain">The individuals and groups listed above will access your Personal Information (including your Coded Information) to conduct and manage this study, and to comply with legal or regulatory requirements, including to:</p>\
<ul><li>determine if you are eligible for this study; \
</li><li>verify that the study is conducted correctly and that study data are accurate; \
</li><li>answer questions from institutional review boards (IRB(s)), independent ethics committees (IEC(s)), or government or regulatory agencies; \
</li><li>assess your use of electronic devices in the study, for example how long it takes you to complete any e-consent module used for the study and your comprehension of the e-consent process;  \
</li><li>contact you during and after the study (if necessary);\
</li><li>follow-up to assure your health and safety, including using publicly available sources should the study team be unable to contact you using information held on file;\
</li><li>protect your vital interests or the interests of your pregnant partner (for example, a critical medical situation, such as providing information to an emergency department of a hospital where you are being treated); and\
</li><li>answer your data protection requests (if any).</li></ul>\
<p class="icMain">Your Personal Information may also be used by the individuals and groups listed above to:</p>\
<ul><li>Publish summaries of the study results in academic journals, on the internet or at educational meetings of other researchers. You will not be directly identified in any publication or report of the study. But, some journal representatives may need access to your Coded Information to verify the study results and ensure the research meets the journal’s quality standards. Also, journals may require that genetic and other information from the study be made available to other researchers for further research projects, but if so, this would be done in a way that does not directly identify you.\
</li><li>Comply with regulatory requirements mandating that data collected in research studies such as this one be made available to other researchers not affiliated with your Study Site or Harvard (including through publication on the internet or in other ways). However, information that could directly identify you will not be made available to other researchers.\
</li><li>Improve the quality, design and safety of this study and other research studies.\
</li><li>Conduct additional studies with the data collected in this study to advance scientific research. At this time, we do not know the specific details of these future research projects. These projects may involve bringing together information from this study with information from other studies or sources outside typical research settings, such as data from coded electronic health records, health care cost and payment data, pharmacy data, social service data, and employment data. If your Personal Information is used for additional studies, specific safeguards will be used to protect the data, which may include:\
<ul><li>Using only your Coded Information rather than Personal Information that readily identifies you.\
</li><li>Limiting access to specific individuals who are obligated to keep the information confidential.\
</li><li>Using security measures to avoid data loss and unauthorized access.\
</li><li>Anonymizing the data by destroying the link to the Coded Information and your personal identifiers.\
</li><li>When required by applicable law, ensuring that the scientific research has the approval of IECs, IRBs, or other similar review groups.</li></ul></li></ul>\
<p class="icMain">The University of Washington and the Study Site will retain your Personal Information (including your Coded Information) for the period necessary to fulfill the purposes outlined in this informed consent form, unless a different retention period is required or permitted by law.</p>\
<p class="icMain">If you provide someone else’s Personal Information (for example, an emergency contact or details of family medical history) you should make them aware that you have provided the information to us. We will only use such Personal Information in accordance with this informed consent form and applicable law.</p>\
<p class="icMain">Data will be stored on researchers’ hard drives and cloud storage websites. Researchers associated with this study will have access to the data. If required, coded data might be stored on journal websites or other research repositories, which are generally accessible by the general public. The data will be stored indefinitely.</p>\
<p class="icMain">If identifiers are removed from your identifiable private information or identifiable samples that are collected during this research, that information or those samples could be used for future research studies or distributed to another investigator for future research studies without your additional informed consent.</p>\
<p class="icHeader">What Rights do I have?</p>\
<p class="icMain">If you wish to exercise any of the rights described below, it is best to contact your Study Site’s Data Protection Officer using the contact information provided by your Study Site and not the University of Washington. This is because generally the University of Washington will not know who you are (by name) because the University of Washington usually holds only your Coded Information, which does not include your name or other information that can easily identify you.</p>\
<ul><li>You have the right to see the information being collected about you in the study. To ensure integrity of the study, you will not be able to review some of the data until after the study has been completed. For example, if you are in a blinded study, neither the researchers nor you will be able to know the study arm in which you participated until after the study is over.\
</li><li>You have the right to correct or update your Personal Information if it is inaccurate. \
</li><li>You have the right to limit the collection and use of your Personal Information under certain circumstances (for example, if you think that the information is inaccurate).\
</li><li>You have the right to receive your Personal Information in a structured, common computer format (for example, in a readable text electronic file or chart) for your own purposes or for giving it to others, as required by applicable data protection laws. You may not have the right to receive your Personal Information that has been used for public interest purposes (for example, for reporting incidents of disease to public health officials) or in the exercise of official authority vested in the Study Site or the University of Washington (for example, responding to information requests from public agencies or monitoring drug safety).\
</li><li>You have the right to request the deletion of your Personal Information if you are no longer participating in the study. However, there are limits on your ability to request deletion of your Personal Information. The University of Washington and your Study Site may keep and use some or all of your Personal Information if deletion would seriously impair the study (for example, if deletion would affect the consistency of study results) or if your Personal Information is needed to comply with legal requirements.\
</li><li>You have the right to file a complaint with a data protection authority (<a href="http://ec.europa.eu/justice/data-protection/article-29/structure/data-protection-authorities/index_en.htm" target="_blank">http://ec.europa.eu/justice/data-protection/article-29/structure/data-protection-authorities/index_en.htm</a>).</li></ul>\
<p class="icHeader">Can I be removed from the research without my OK?</p>\
<p class="icMain">The person in charge of the research study or the sponsor can remove you from the research study without your approval. Possible reasons for removal include the computer to stop working in the middle of the experiment or your prior exposure to linguistics. Please do not worry if the computer program stop working during the experiment (it happens very rarely).</p>\
<p class="icHeader">Who can I talk to?\
<p class="icMain">If you have questions, concerns, or complaints, or think the research has hurt you, talk to the research team at begus@uw.edu.</p>\
<p class="icMain">This research has been reviewed and approved by the University of Washington Human Subjects Division Board (“IRB”). You may talk to them at +1 206 543-0098 or call collect at (206) 221-5940 if:</p>\
<ul><li>Your questions, concerns, or complaints are not being answered by the research team.</li>\
<li>You cannot reach the research team.</li>\
<li>You want to talk to someone besides the research team.</li>\
<li>You have questions about your rights as a research subject.</li>\
<li>You want to get information or provide input about this research.</li></ul>\
<p class="icSectionHeader">Subject’s statement</p>\
<p class="icMain">This study has been explained to me. I volunteer to take part in this research. I have had a chance to ask questions. If I have questions later about the research, or if I have been harmed by participating in this study, I can contact one of the researchers listed on the first page of this consent form. If I have questions about my rights as a research subject, I can call the Human Subjects Division at (206) 543-0098 or call collect at (206) 221-5940.</p> ';