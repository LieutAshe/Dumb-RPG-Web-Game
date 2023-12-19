var narrations = document.getElementById("narrations");
const next = document.getElementById("buttonNext");
const esc = document.getElementById("buttonFlee");
const fight = document.getElementById("buttonAttack");
const regen = document.getElementById("buttonRegen");

var step = 1;
var secondaryStep = 0;
var flow = "";
var color = "var(--normal)";

const deadPlayerName = document.getElementById("deadPlayerName");
const defeatedBy = document.getElementById("defeatedBy");

next.setAttribute("disabled", true);
esc.setAttribute("disabled", true);
fight.setAttribute("disabled", true);
regen.setAttribute("disabled", true);

function narrate() {
    storyFlow();
    var story = flow;
    color = "var(--normal)";

    narrations.style.opacity = "0%";
    setTimeout(function (){
        narrations.style.opacity = "100%";
        narrations.innerHTML = story;
        step = step + 1;
        console.log(step);
    },500);
}

function getValues() {
    flow = flow;
    color = color;
    remainingLife = remainingLife;
    maxLife = maxLife;
    Monster = Monster;
}

function action() {
    narrations.style.opacity = "0%";
    setTimeout(function (){
        narrations.style.color = color;
        narrations.style.opacity = "100%";
        narrations.innerHTML = actionResults;
    },500);
}

function died() {
    overlay2.style.display = "flex";
    deadPlayerName.innerHTML = "Player: " + onScreen.name;
    defeatedBy.innerHTML = "Defeated by a: " + Monster.mName;
}

function storyFlow() {
    if (step === 0){
        flow = "";
    }

    if (step === 1) {
        flow = "We will now comence the game";
        esc.setAttribute("disabled", true);
        fight.setAttribute("disabled", true);
        regen.setAttribute("disabled", true);
    }
    if (step === 2) {
        flow = "Battle Test Commence";
    }
    
    if (step === 3 ) {
        flow = "Defeat the enemy";
        Monster = goblin1;
        next.setAttribute("disabled", true);
        fight.removeAttribute("disabled");
        vsMode();
        inBattle = true;
    }

    if (step === 3 && wonBattle === true) {
        wonBattle = false;
        inBattle = false;
        step = 4;
    }

    if (step === 4) {
        flow = "Now try Regenerating yourself";
        remainingLife = 10;
        lifeLogic();
        regen.removeAttribute("disabled");
        fight.setAttribute("disabled", true);
    }

    if (step === 5) {
        flow = "Now you will face a Monster way stronger than you";
        next.removeAttribute("disabled");
    }

    if (step === 6) {
        flow = "You can Flee to escape from a strong opponents, however, successfull escape is not always guaranteed."
        Monster = CosmosMax;
        next.setAttribute("disabled", true);
        fight.removeAttribute("disabled");
        esc.removeAttribute("disabled");
        vsMode();
        inBattle = true;
    }

    if (step === 7) {
        flow = "That concludes the tutorial of this game";
        remainingLife = maxLife;
        lifeLogic();
        regen.removeAttribute("disabled");
        next.removeAttribute("disabled");
        fight.removeAttribute("disabled");
        esc.removeAttribute("disabled");
    }

}