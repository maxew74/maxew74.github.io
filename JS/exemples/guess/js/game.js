console.log("Le fichier game.js a bien été chargé");

var question, container, feedback, chances, level, btnNext, btnRestart, btnStart, imgPerso, picto, questionContainer; // div
var nbChances, score, randomNum, levelNum, themeNum, maxLevel; // number
var questionLabel, feedbackLabel; //string
var choices, themes, indices; // array

function initGame()
{
	console.log("initGame");
	container = document.getElementById("btnContainer");
	questionContainer = document.getElementById("quest");
	question = document.getElementById("questLabel");
	//feedback = document.getElementById("feedback");
	feedback = document.getElementById("questLabel");
	level = document.getElementById("level");
	chances = document.getElementById("chances");
	imgPerso = document.getElementById("perso");
	picto = document.getElementById("picto");
	
	nbChances = 3;
	score = 0;
	levelNum = 1;
	maxLevel = 5;
	
	randomNum = null;
	playerAnswer = null;
	
	themes = ["animal", "véhicule", "sport"];
	
	// On cache les boutons de nav
	btnNext.style.display = "none";
	btnStart.style.display = "none";
	btnRestart.style.display = "none";
	
	showIntro();
}

function showIntro()
{
	setColor("#4f4f4f");
	imgPerso.setAttribute("src", "img/perso_02.jpg");
	btnStart.style.display = "block";
	question.innerHTML = "On joue à 'Devine à quoi je pense' !";
	question.innerHTML += "<br/>Tu disposes de " + nbChances + " chances";
	question.innerHTML += "<br/>Pour gagner, il faut atteindre le niveau " + maxLevel + ".";
}


function selectTheme()
{
	displayLevel();
	displayChances();
	
	themeNum = randomNum = parseInt((Math.random()*themes.length));
	
	switch(themeNum)
	{
		case 0:
			choices = ["un panda", "un crabe", "un chat", "une fourmi", "un poisson", "un cheval", "un zèbre"];
			indices = ["noir et blanc", "qui vit à la mer", "mamifère", "qui mange des graines", "qui est à l'aise dans l'eau", "à quatre pattes", "qui porte une crinière"];
		break
		case 1:
			choices = ["une voiture", "un camion", "un hydravion", "un bateau", "une moto"];
			indices = ["qui roule", "qui fonctionne avec un moteur", "qui ne roule pas", "qui flotte", "qui fait du bruit"];
		break
		case 2:
			choices = ["le tennis", "le volley", "le football", "l'escrime", "la lutte", "le basket"];
			indices = ["qui se pratique à deux", "qui se joue avec un ballon", "qui se joue en équipe", "qui consiste en un duel", "qui peut être violent", "qui se joue sur un terrain"];
		break
	}
}

function startGame()
{
	btnNext.style.display = "none";
	btnStart.style.display = "none";
	btnRestart.style.display = "none";
	questionContainer.style.display = "none";
	selectTheme();
	
	console.log("startGame()");
	feedbackLabel = "";
	
	randomNum = parseInt((Math.random()*choices.length));
	
	displayFeedback();
	
	console.log("startGame() randomNum=" + randomNum);
	questionLabel = "Je pense à un " + themes[themeNum] + " " + indices[randomNum] + ", devine lequel...";
	picto.innerHTML = "?";
	picto.style.color = "#4f4f4f";
	//questionLabel += "<br/>(c'est un " + themes[themeNum] + " qui <strong>"  "</strong>)";
	
	displayQuestion();
	createChoises();
	

}
// Affichage de la question
function displayQuestion()
{
	imgPerso.setAttribute("src", "img/perso_01.jpg");
	setColor("#4f4f4f");
	question.innerHTML = questionLabel;
	questionContainer.style.display = "flex";
}
// Affichage du feedback
function displayFeedback()
{
	feedback.innerHTML = feedbackLabel;
}

// Affichage du niveau
function displayLevel()
{
	level.innerHTML = "Niveau :<div class='numLevel'>" + levelNum + "</div>";
}

// Affichage des chances
function displayChances()
{
	console.log("chances.childNodes.length : " + chances.childNodes.length + " --- nbChances : " + nbChances);
	if(nbChances>chances.childNodes.length)
	{
		var img;
		for(i=chances.childNodes.length; i<nbChances; i++)
		{
			img = document.createElement("img");
			img.setAttribute("src","img/star.png");
			img.setAttribute("class","star");
			chances.append(img);
		}
	}else if(nbChances<chances.childNodes.length)
	{
		for(i=nbChances; i<chances.childNodes.length;  i++)
		{
			chances.removeChild(chances.firstChild);
		}
	}
	//chances.innerHTML = "Chance(s) :<div class='numLevel'>" + nbChances + "</div>";	
}

// Création des boutons
function createChoises()
{ 
	var i;
	var btn;
	for(i=0; i<choices.length;i++)
	{
		btn = document.createElement("div");
		btn.setAttribute("id", "btn_" + i);
		btn.setAttribute("class", "btnChoice");
		btn.setAttribute("ans", i);
		btn.innerHTML = choices[i];
		
		btn.addEventListener("click", answer);
		
		container.append(btn);
		console.log(btn + "("+container+")");
	}
}
// Suppression des boutons de choix
function deleteChoises()
{ 
	while(btnContainer.firstChild)
	{
		btnContainer.removeChild(btnContainer.firstChild);
	}
}
// Traitement de la réponse 
function answer(ev)
{
	deleteChoises();
	
	var userChoice = ev.currentTarget.getAttribute("ans");
	feedbackLabel = "Tu as choisi " + choices[userChoice] + " : ";
	if(randomNum == userChoice)
	{
		levelNum++;
		
		imgPerso.setAttribute("src", "img/perso_02.jpg");
		feedbackLabel += "Gagné ! Je pensais bien à ça.";
		setColor("#137f1d");
		picto.innerHTML = "!";
		
		
		displayLevel();
		
		//Si iveau 5 atteint.
		if(levelNum == maxLevel)
		{
			win();
		}else{
			btnNext.innerHTML = "Continuer";
			btnNext.style.display = "block";
		}
	}else{
		feedbackLabel += "Perdu ! Je pensais à " + choices[randomNum] + ".";
		imgPerso.setAttribute("src", "img/perso_03.jpg");
		
		setColor("#701414");
		
		nbChances--;
		displayChances();
		
		if(nbChances==0)
		{
			setColor("#bf071a");
			picto.innerHTML = "!";
			imgPerso.setAttribute("src", "img/perso_04.jpg");
			feedbackLabel += "<br/>Tu as utilisé toutes tes chances, on re-joue ?";
			btnRestart.style.display = "block";

		}else{
			picto.innerHTML = "!";
			feedbackLabel += "<br/>Essaye encore...";
			btnNext.style.display = "block";
		}
	}
	//feedbackLabel += "<div id='interro'>!</span>";
	
	console.log("answer --- " + randomNum + " user choice : " + userChoice + " |'"+feedbackLabel+"'");
	displayFeedback();
}

function win()
{
	feedbackLabel += "<br/>Niveau " + maxLevel + ", BRAVO ! On re-joue ?";
	displayFeedback();
	btnRestart.style.display = "block";
}

function setColor(color_)
{
	picto.style.color = color_;
	question.style.color = color_;
	questionContainer.style.borderColor  = color_;
}
/* ******************************************************** */
// Appel aux fonction de lancement du jeu

btnNext = document.getElementById("btnNext");
btnNext.innerHTML = "Recommencer";
btnNext.addEventListener("click", startGame);

btnRestart = document.getElementById("btnRestart");
btnRestart.innerHTML = "Nouvelle partie";
btnRestart.addEventListener("click", initGame);

btnStart = document.getElementById("btnStart");
btnStart.innerHTML = "Jouer !";
btnStart.addEventListener("click", startGame);

initGame();


