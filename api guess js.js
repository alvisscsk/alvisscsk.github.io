let startButton = document.getElementById("start");
let list = document.getElementById("list");
let choices = document.getElementById("choice");
let choiceButton;
let asset = ["panda", "rabbit", "cat", "dog", "polar bear", "hamster", "pikachu", "koala", "computer", "ironman", "batman", "superman", "wonder woman", "green lantern", "deadpool", "the flash", "captain america", "hulk", "black panther", "spiderman", "aquaman", "quicksilver", "wolverine", "snake", "landscape", "jurassic park", "harry potter", "lion", "penguin", "megalodon", "jason statham", "thor", "winter soldier", "game of thrones", "thanos", "corgi", "fantastic four", "ninja turtle", "cherry blossom", "dwayne johnson", "aeroplane", "coffee", "polaroid"];
let keyword;
let choicesAvailable = [];
let choiceMade;

startButton.onclick = gameStart;

function gameStart(){

	choicesAvailable = [];
	list.innerHTML = "";
	choices.innerHTML = "";
	drawWord();
	addToArray();
	printOutChoices();
	getPic(keyword);

	for (let i = 0; i < choiceButton.length; i++){
		choiceButton[i].onclick = function(event){
			choiceMade = event.target.innerHTML;
			if (choiceMade == keyword){
				window.alert("You Did It!!!");
				gameStart();
			} else {
				window.alert("WRONG!Correct answer is " + keyword);
				gameStart();
			}
		}
	}
}

function addToArray(){
	for (let i = 0; i < 3; i++){
		getExtra();
	}
}

function printOutChoices(){
	choicesAvailable.sort();
	for (let i = 0; i < choicesAvailable.length; i++){
		let button = document.createElement("button");
		button.classList.add("choiceButton");
		button.innerHTML = choicesAvailable[i];
		let choicesItem = document.createElement("li");
		choicesItem.appendChild(button);
		choices.appendChild(choicesItem);
	}

	choiceButton = document.getElementsByClassName("choiceButton");
}

function getExtra(){
	let extra = asset[Math.floor(Math.random() * asset.length)];
	if (choicesAvailable.includes(extra) === false){
		choicesAvailable.push(extra);
	} else {
		return getExtra();
	}
}

function drawWord(){
	keyword = asset[Math.floor(Math.random() * asset.length)];
	choicesAvailable.push(keyword);
}

function getPic(keyword){

	fetch("https://api.tumblr.com/v2/tagged?tag=" + keyword + "&api_key=8iQdESZLueQOH3siwxhnyHlPDtpEJzTemakhaDfRcPealFl6Rb").then(
		function(response){
			
			if (!response.ok){
				return;
			} else {
				return response.json();
			}
		}
	).then(function(json){
		if (!json){
			return;
		}
		
		let items = json.response;
		for (let i = 0; i < items.length; i++){
			let item = items[i];
			if (item.photos != undefined){
				let altSize = item.photos[0].alt_sizes;
				imgSrc = altSize[altSize.length - 2].url;
				let img = document.createElement("img");
				img.src = imgSrc;
				let listItem = document.createElement("li");
				listItem.appendChild(img);
				list.appendChild(listItem);
			}
		}
	}).catch(function(error){
		console.log("try");
	});
}