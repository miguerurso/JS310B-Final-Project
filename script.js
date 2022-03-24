const gameContainer = document.getElementById('game-container');
const hero = document.getElementById('hero-container');
const beast = document.getElementById('beast-container');
const swordslash = document.getElementById('swordslash');
const beastslash = document.getElementById('beastslash');
const frontarm = document.getElementById('frontarm');
const sword = document.getElementById('sword');
const backarm = document.getElementById('backarm');
const primalAttack = document.getElementById('primal-attack');
const text = document.getElementById('text');
const boom = document.getElementById('boom');
const beastDamage = document.getElementById('beast-damage');
const heroDamage = document.getElementById('hero-damage');
const winLose = document.getElementById('win-lose');
const winLoseResult = document.getElementById('win-lose-result');
const playerUi = document.getElementById('player-ui');
const timer = document.getElementById('timer');
const actions = document.getElementById('actions');
const itemSubMenu = document.getElementById('items-submenu');
const attackCmd = document.getElementById('attack-action');
const primalCmd = document.getElementById('primal-action');
const itemCmd = document.getElementById('items-action');
const grenade = document.getElementById('grenade');
const potion = document.getElementById('potion');
const potionInfo = document.getElementById('potion-info');
const grenadeInfo = document.getElementById('grenade-info');
const potionUsage = document.getElementById('potion-usage');
const startOver = document.getElementById('start-over');

//clear local storage onload

window.onload = function () {
	sessionStorage.clear();
	window.localStorage.clear();
	localStorage.clear();
	localStorage.removeItem("name");
	localStorage.removeItem("weapon");

};

//CONTACT FORM VALIDATION & EVENT LISTENER 
const nameBox = document.getElementById("name");
const weaponBox = document.getElementById("weapon");
const form = document.getElementById("entry-form");
const formBtn = document.getElementById('form-btn');
form.style.display = 'block';
const aboutContainer = document.getElementById("about-container");
const aboutStatsContainer = document.getElementById("about-stats-container")
aboutContainer.style.display = 'none';

function addInvalidClass(x) {
	x.parentElement.classList.remove('valid');
	x.parentElement.classList.add('invalid');
};


function validEntry(x) {
	x.validity.valid = true;
	x.setCustomValidity("");
	x.parentElement.classList.remove('invalid');
	x.parentElement.classList.add('valid');
};
function requiredField(x) {
	x.validity.valid = false;
	x.setCustomValidity("This field is required");
	addInvalidClass(x);
	x.reportValidity();
};

function lessThan5(x) {
	x.validity.valid = false;
	x.setCustomValidity("This field must be more than 5 characters");
	addInvalidClass(x);
	x.reportValidity();
};

function validState(x) {
	if (x.value === "") {
		requiredField(x)
	} else if (x.value.length <= 4) {
		lessThan5(x);
	} else {
		validEntry(x);
	}
};

const checkValidation = (e) => {
	e.preventDefault();
	validState(nameBox);
	validState(weaponBox);

}


form.addEventListener("change", checkValidation);

const aboutHeroImg = document.getElementById('char-img');

formBtn.addEventListener("click", function (e) {
	if (nameBox.value === '' || weaponBox.value === '') {
		window.alert('Please fill out required fields');
		nameBox.parentElement.classList.add('invalid');
		weaponBox.parentElement.classList.add('invalid');
		return false
	}
	window.localStorage.clear();
	localStorage.clear();
	window.charName = nameBox.value;
	window.weaponName = weaponBox.value;
	form.classList.remove('form-visible');
	localStorage.setItem("name", `${window.charName}`);
	localStorage.setItem("weapon", `${window.weaponName}`);
	form.style.display = "none";
	aboutContainer.style.display = 'block';
	aboutContainer.classList.add('about-visible');
	aboutHeroImg.setAttribute("src", "https://migmarin.com/js-class-mm/hero-pieces/hero-flat.png");
	aboutHeroImg.setAttribute("height", "300px")

	function addName() {
		const div = document.createElement("div");
		div.classList.add("about-stats");
		div.classList.add('name');
		div.innerHTML = gameHero.retrieveName();
		aboutStatsContainer.appendChild(div);
	}

	function addWeapon() {
		const div = document.createElement("div");
		div.classList.add("about-stats");
		div.classList.add('weapon');
		div.innerHTML = gameHero.retrieveWeapon();
		aboutStatsContainer.appendChild(div);
	}
	addName();
	addWeapon();

	for (const property in gameHero) {
		const div = document.createElement("div");
		div.classList.add("about-stats");
		div.classList.add([property]);
		div.innerHTML = `${gameHero[property]}`;
		aboutStatsContainer.appendChild(div);
	}

});


// BUILD CLASSES
class Hero {
	constructor(classType) {
		this.classType = classType;
	}

	retrieveName() {
		return `<i>Name:</i> ${localStorage.getItem("name")}`
	}

	retrieveWeapon() {
		return `<i>Weapon:</i> ${localStorage.getItem("weapon")}`
	}
}

class Warrior extends Hero {
	constructor() {
		super('<i>Class Type:</i> Warrior');
	}

	description = '<i>Description:</i> Your hero is of the Warrior Class.<br/>Warriors fight using Swords as thier combat weapon. Warriors generally have lower HP, but higher base Attack ranges';
	hpAmt = 150;
	hp = `Health Points (HP): ${this.hpAmt}`;
	baseAttackRange = "<i>Base Attack Damage Range:</i> 15 - 25";
	primalAttackRange = "<i>Primal Attack:</i> 30 - 60 Damage Range and<br/>15 - 30 HP Loss";
}

let gameHero = new Warrior();

class Enemy {
	constructor(name) {
		this.name = name;
	}
	hpAmt = 200;
	hp = `HP: ${this.hpAmt}`;
}


const gameBeast = new Enemy('Beast');
let inGameBeastHp = 200;

//APPLY CLASSES TO DOM
const beastStats = document.getElementById('beast-stats');

beastStats.innerHTML = `${gameBeast.name} | ${inGameBeastHp}/${gameBeast.hpAmt}`;

const heroClassHP = gameHero.hp.slice(20);
let inGameHP = gameHero.hpAmt;

const startGameBtn = document.getElementById('start-game-btn');


const dynamicStatsParent = document.getElementById('dynamic-stats');

//START GAME
startGameBtn.addEventListener("click", function () {

	window.inGameName = gameHero.retrieveName().slice(13);
	window.inGameWeapon = gameHero.retrieveWeapon().slice(15);
	aboutContainer.style.display = 'none';
	aboutContainer.classList.remove('about-visible');
	gameContainer.style.display = 'block';
	playerUi.style.display = 'block';


	//SET UI NAMES AND STATS
	document.getElementById('actions-header').innerHTML = `${window.inGameName}'s Actions`;
	document.getElementById('stats-header').innerHTML = `${window.inGameName}'s Status`;

	function setDynamicStats() {
		const equippedDiv = document.createElement("div");
		equippedDiv.classList.add('equipped')
		equippedDiv.innerHTML = `Weapon Equipped: ${window.inGameWeapon}`;
		dynamicStatsParent.appendChild(equippedDiv);
	}

	setDynamicStats();

	//TIMER
	let timeleft = 40;
	const downloadTimer = setInterval(function () {

		function noTimerDefeatFunctions() {
			if (hero.classList.contains('hero-defeat')) {
				clearInterval(downloadTimer);
				return false;
			} else if (beast.classList.contains('beast-defeat')) {
				clearInterval(downloadTimer);
				return false;
			}
		};

		noTimerDefeatFunctions();

		//TIME'S UP GAME OVER NOTIFCATION
		if (timeleft <= 0) {
			timer.style.color = "blue";
			timer.style.borderColor = "blue";
			hero.classList.add('hero-defeat');
			winLoseResult.innerHTML = `TIME'S UP, <span style="text-transform: uppercase;">${window.inGameName}</span> LOSES!`;
			winLose.style.display = 'block';
			gameContainer.style.opacity = 0.5;
			playerUi.style.display = 'none';
			clearInterval(downloadTimer);
		//LESS THAN 10 SECONDS	
		} else if (timeleft <= 10) {
			timer.style.color = "red";
			timer.style.borderColor = "red";
		}
		timeleft -= 1;
		timer.innerHTML = timeleft;

	}, 1000);



});

const hpDiv = document.createElement("div");
hpDiv.classList.add('hp-counter');
hpDiv.innerHTML = `HP: ${inGameHP}/${heroClassHP}`; 
dynamicStatsParent.appendChild(hpDiv);

//BEAST DEFEAT FUNC
function beastDefeat() {
	if (inGameBeastHp <= 0) {
		beastStats.style.display = 'none';
		beast.classList.remove('beast-attack');
		heroDamage.classList.remove('hero-damage');
		heroDamage.style.display = 'none';
		beast.classList.add('beast-defeat');
		setTimeout(() => {
			winLoseResult.innerHTML = `ENEMY DEFEATED!<br/><span style="text-transform: uppercase;">${window.inGameName}</span> WINS!`
			winLose.style.display = 'block';
			gameContainer.style.opacity = 0.5;
			playerUi.style.display = 'none';
		}, 1500);
	}
}


function heroDefeat() {
	if (inGameHP <= 0) {
		globalHeroHpDiv.innerHTML = `HP: 0/${heroClassHP}`;
		hero.classList.add('hero-defeat');
		console.log('lose');

		if (hero.classList.contains('hero-attack')) {
			hero.classList.remove('hero-attack');
		}

		if (primalCmd.classList.contains('primal-attack')) {
			primalCmd.classList.remove('primal-attack');
		}
		setTimeout(() => {
			winLoseResult.innerHTML = `OUT OF HP! <span style="text-transform: uppercase;">${window.inGameName}</span> LOSES!`
			winLose.style.display = 'block';
			gameContainer.style.opacity = 0.5;
			playerUi.style.display = 'none';
		}, 500);
	}
}

const globalHeroHpDiv = document.querySelector('.hp-counter');


//THIS IS BASIC HERO ATTACK
attackCmd.addEventListener('click', function (e) {

	if (!hero.classList.contains('hero-attack')) {
		hero.classList.add('hero-attack');
		swordslash.classList.add('slash-reveal');
		//CALC DAMAGE
		function BaseAttckFunc() {
			function randomBaseAttackNum(min, max) {
				return Math.floor(Math.random() * (max - min + 1) + min)
			}
			const attackDmg = randomBaseAttackNum(15, 25)
			beastDamage.innerHTML = `- ${attackDmg}`;
			inGameBeastHp = inGameBeastHp - attackDmg;
			//DEFEAT FUNCTIONS/
			beastDefeat();
			//END DEFEAT FUNCTIONS
			return inGameBeastHp
		}
		beastDamage.classList.add('beast-damage');
		beastStats.innerHTML = `${gameBeast.name} | ${BaseAttckFunc()}/${gameBeast.hpAmt}`;


		setTimeout(() => {
			hero.classList.remove('hero-attack');
			swordslash.classList.remove('slash-reveal');
			beastDamage.classList.remove('beast-damage');
			beastDamage.innerHTML = "";
		}, 1000);

	} else if (hero.classList.contains('hero-attack')) {
		hero.classList.remove('hero-attack');
		swordslash.classList.remove('slash-reveal');
		beastDamage.classList.remove('beast-damage');
		beastDamage.innerHTML = "";
	}

});



//THIS IS PRIMAL ATTACK
primalCmd.addEventListener('click', function (e) {

	if (!primalAttack.classList.contains('primal-attack')) {

		//HP SAP COLLATERAL DAMAGE CALC
		function primalHpSap() {
			function randomHpLoss(min, max) {
				return Math.floor(Math.random() * (max - min + 1) + min)
			}
			const hpSap = randomHpLoss(15, 30);
			return hpSap;
		}

		heroDamage.innerHTML = `- ${primalHpSap()}`;
		setTimeout(() => {
			if (heroDamage.classList.contains('hero-damage')) {
				heroDamage.classList.remove('hero-damage')
			}
		}, 1000)


		function displayRemainingHP() {
			inGameHP = inGameHP - primalHpSap();
			heroDefeat();
			return inGameHP;
		}


		//END HP SAP COLLATERAL DAMAGE CALC

		text.style.opacity = 1;
		text.innerHTML = `<i>${inGameName}</i>:<br/> "Hear me, mighty spirit of <i>${window.inGameWeapon}</i>, lend me your strength!`;
		setTimeout(() => { text.style.opacity = 0; }, 3000);
		primalAttack.classList.add('primal-attack');
		boom.classList.add('boom');

		heroDamage.classList.add('hero-damage');
		globalHeroHpDiv.innerHTML = `HP: ${displayRemainingHP()}/${heroClassHP}`;
		if (inGameHP <= 0) {
			globalHeroHpDiv.innerHTML = `HP: 0/${heroClassHP}`;
		}

		setTimeout(() => {
			boom.classList.remove('boom');

			//CALC DAMAGE
			function primalAttackFunc() {
				function randomPrimalAttackNum(min, max) {
					return Math.floor(Math.random() * (max - min + 1) + min)
				}
				const attackDmg = randomPrimalAttackNum(30, 60)
				beastDamage.innerHTML = `- ${attackDmg}`;
				inGameBeastHp = inGameBeastHp - attackDmg;
				//START DEFEAT FUNCTIONS
				beastDefeat();
				//END DEFEAT FUNCTIONS
				return inGameBeastHp
			}
			beastDamage.classList.add('beast-damage');
			// let inGameBeastHp = primalAttackFunc();
			beastStats.innerHTML = `${gameBeast.name} | ${primalAttackFunc()}/${gameBeast.hpAmt}`;


		}, 2500);

		setTimeout(() => {
			beastDamage.classList.remove('beast-damage');
			beastDamage.innerHTML = "";
			primalAttack.classList.remove('primal-attack');
		}
			, 4000);
	}

	setTimeout(() => {
		if (hero.classList.contains('hero-defeat')) {
			console.log('primal defeat')
			beast.classList.remove('beast-attack');
			beastDamage.style.display = 'none';
			beastDamage.style.display = 'none';
			beastslash.classList.remove('beast-slash-reveal');
			heroDamage.classList.remove('hero-damage');
		}
	}, 500);

});


//THIS IS ITEM COMMAND
function itemCmdFunc() {
	if (!itemSubMenu.contains(grenade) && !itemSubMenu.contains(potion)) {
		alert("No Items Remaining");
		playerUi.style.height = '150px';
		itemSubMenu.style.opacity = 0;
	} else {
		playerUi.style.height = '220px';
		itemSubMenu.style.opacity = 1;
	}
}

//use grenade

grenade.addEventListener('click', function (e) {
	function grenDamFunc() {
		const grenDmg = 45;
		beastDamage.innerHTML = `- ${grenDmg}`;
		inGameBeastHp = inGameBeastHp - grenDmg;
		//ADD DEFEAT FUNCTIONS
		beastDefeat();
		//END DEFEAT FUNCTIONS
		return inGameBeastHp
	}
	beastDamage.classList.add('beast-damage');
	beastStats.innerHTML = `${gameBeast.name} | ${grenDamFunc()}/${gameBeast.hpAmt}`;
	boom.classList.add('grenade-boom');
	setTimeout(() => {
		boom.classList.remove('grenade-boom');
		itemSubMenu.removeChild(grenade);
		itemSubMenu.style.opacity = 0;
		playerUi.style.height = '150px';
		beastDamage.classList.remove('beast-damage');
		beastDamage.innerHTML = "";
	}, 1000);
});

potion.addEventListener('mouseover', function () {
	potionInfo.style.display = 'block';
});

grenade.addEventListener('mouseover', function (e) {
	grenadeInfo.style.display = 'block';
});

potion.addEventListener('mouseout', function () {
	potionInfo.style.display = 'none';
});

grenade.addEventListener('mouseout', function (e) {
	grenadeInfo.style.display = 'none';
});

//use potion
potion.addEventListener('click', function (e) {

	function potionUsageFunc() {
		function randomPotion(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min)
		}
		const potionHealingAmt = randomPotion(50, 70)
		potionUsage.innerHTML = `+ ${potionHealingAmt}`;
		inGameHP = inGameHP + potionHealingAmt;
		return inGameHP
	}
	potionUsageFunc();

	if (inGameHP >= gameHero.hpAmt) {
		window.alert(`Healing objects will only restore your HP amount up to ${gameHero.hpAmt}`);
		inGameHP = gameHero.hpAmt;
	}

	potionUsage.classList.add('potion-use');
	globalHeroHpDiv.innerHTML = `HP: ${inGameHP}/${heroClassHP}`;


	setTimeout(() => {
		itemSubMenu.removeChild(potion);
		potionUsage.classList.remove('potion-use')
		itemSubMenu.style.opacity = 0;
		playerUi.style.height = '150px';
	}, 0900);
});


//BEAST
function beastAttack() {
	if (!beast.classList.contains('beast-attack')) {
		beast.classList.add('beast-attack');
		beastslash.classList.add('beast-slash-reveal');

		// CALCULATE DAMAGE AND APPLY IT TO HERO HP
		function beastAttckFunc() {
			function randomBaseAttackNum(min, max) {
				return Math.floor(Math.random() * (max - min + 1) + min)
			}
			let attackDmg = randomBaseAttackNum(15, 30);

			if (beast.classList.contains('beast-defeat')) {
				// heroDamage.style.display = "none";
				// heroDamage.innerHTML = " &nbsp;";
				attackDmg = 0;
				inGameHP = inGameHP - attackDmg;
			}

			heroDamage.innerHTML = `- ${attackDmg}`;
			inGameHP = inGameHP - attackDmg;
			return inGameHP
		}
		beastAttckFunc();
		if (beast.classList.contains('beast-defeat')) {
			heroDamage.classList.remove('hero-damage');
			heroDamage.style.display = "none";
			heroDamage.innerHTML = " &nbsp;";
			console.log('primal beast def')
		} else {
			heroDamage.classList.add('hero-damage');
		}
		heroDefeat();
		if (hero.classList.contains('hero-defeat')) {
			globalHeroHpDiv.innerHTML = `HP: 0/${heroClassHP}`;
		}
		// heroDamage.classList.add('hero-damage');
		globalHeroHpDiv.innerHTML = `HP: ${inGameHP}/${heroClassHP}`;



		//END CALCULATIONS
	} setTimeout(() => {
		beast.classList.remove('beast-attack');
		beastslash.classList.remove('beast-slash-reveal');
		heroDamage.classList.remove('hero-damage');
	}, 2500);
};

function beastAttackPostPrimal() {
	if (!beast.classList.contains('beast-attack')) {
		beast.classList.add('beast-attack');
		beastslash.classList.add('beast-slash-reveal');

		// CALCULATE DAMAGE AND APPLY IT TO HERO HP
		function beastAttckFunc() {
			function randomBaseAttackNum(min, max) {
				return Math.floor(Math.random() * (max - min + 1) + min)
			}
			const attackDmg = randomBaseAttackNum(15, 40)
			heroDamage.innerHTML = `- ${attackDmg}`;
			inGameHP = inGameHP - attackDmg;
			return inGameHP
		}
		beastAttckFunc();

		if (beast.classList.contains('beast-defeat')) {
			heroDamage.classList.remove('hero-damage');
			heroDamage.style.display = "none";
			return false
		} else {
			heroDamage.classList.add('hero-damage');
		}

		heroDamage.classList.add('hero-damage');
		globalHeroHpDiv.innerHTML = `HP: ${inGameHP}/${heroClassHP}`;

		if (hero.classList.contains('hero-defeat')) {
			console.log('primal defeat')
			beast.classList.remove('beast-attack');
			beastDamage.style.display = 'none';
			beastDamage.style.display = 'none';
			beastslash.classList.remove('beast-slash-reveal');
			heroDamage.classList.remove('hero-damage');
		}

		heroDefeat();
		//END CALCULATIONS

	}



	setTimeout(() => {
		beast.classList.remove('beast-attack');
		beastslash.classList.remove('beast-slash-reveal');
		heroDamage.classList.remove('hero-damage');
	}, 1000);
};

//BEAST ATTACK TURN

playerUi.addEventListener("click", function (e) {
	if (e.target !== primalCmd && e.target !== itemCmd) {
		playerUi.classList.add('disabled');
		setTimeout(() => {
			beastAttack();
			playerUi.classList.remove('disabled');
		}, 2000);
	} else if (e.target === primalCmd) {
		playerUi.classList.add('disabled');
		setTimeout(() => {
			beastAttackPostPrimal()
			playerUi.classList.remove('disabled');
		}, 4000);
	} else if (e.target === itemCmd) {
		itemCmdFunc();
	}
});

startOver.addEventListener("click", function () {
	sessionStorage.clear();
	window.localStorage.clear();
	localStorage.clear();
	localStorage.removeItem("name");
	localStorage.removeItem("weapon");
	location.reload();
});
