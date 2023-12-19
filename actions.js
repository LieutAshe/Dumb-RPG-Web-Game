var actionResults = "";
var color = "";

var isInTutorial = true;

function flee() {
    var luck = Math.floor((Math.random() * 6) + 1);
    console.log("Attempting to Escape: ",luck);
    if (luck <= 2) {
        console.log("Failed");
        actionResults = "You Failed to flee";
        opponentDamage = 1;
        color = "var(--heart)";
        gotHit();
    }

    if (luck >= 3 && luck < 5) {
        console.log("Escaped but with damage");
        actionResults = "You Escaped but you recieved damage.<br> -1 life counter";
        color = "var(--almost)";
        opponentDamage = 1;
        gotHit();

        if (isInTutorial) {
            enemyRemainingLife = 0;
            enemyLifeLogic();
        }
    }

    if (luck >=5) {
        console.log("Escaped");
        actionResults = "You Escaped";
        color = "var(--normal)";

        if (isInTutorial) {
            enemyRemainingLife = 0;
            enemyLifeLogic();
        }
    }

    action();
}

function Regen() {
    getValues();
    console.log("Attempting to Heal: ");

    if (remainingLife === maxLife) {
        console.log("Failed");
        actionResults = "Already at full Health." + maxLife + ":" +remainingLife;
        color = "var(--almost)";
    }

    if (remainingLife != maxLife) {
    var luck = Math.floor((Math.random()* 15) + 1);
    console.log("rooled:", luck)

    if (luck === 1) {
        console.log("Failed");
        actionResults = "Potion did not work."
        color = "var(--heart)"; 
    } else {
        console.log("Success");
        gotHealed();
        color = "var(--normal)"; 
        actionResults = "Player healed.<br> Got 1 extra life Counter"
    
        if (step === 5 && remainingLife === maxLife) {
            console.log("works");
            regen.setAttribute("disabled", true);
            narrate();
            var isInTutorial = true;
        }
    }
    }
    if (!isInTutorial) {
    action();
    }
}

function Attack() {
    getValues();
    var luck = Math.floor((Math.random()* playerLuck) + 1);
    var opponentLuck = Math.floor((Math.random()* Monster.mLuck) + 1);
    var difference = luck - opponentLuck;
    color = "var(--normal)";
    actionResults = "Luck: "+ luck + "<br>Opponent: " + opponentLuck;
    action();
    setTimeout(function(){

    if (luck === opponentLuck) {
        myDamage = 1;
        action();
        enemyGotHit();
    }
    
    if (luck > opponentLuck) {
        console.log("Success!");
        if (difference >= 2){
            myDamage = Math.floor((Math.random()* playerCrit) + 1);
            actionResults = "Critical Hit!!";
            color = "var(--critical)";
        }

        else {
            myDamage = 1;
        }

        actionResults = "Dealth damage to the Enemy. <br> -" + myDamage;
        
        action();
        enemyGotHit();
    }

    if (luck < opponentLuck) {
        console.log("Aaarggh!");
        color = "var(--heart)";
        if (difference <= -2) {
            opponentDamage = 2;
            crticalHit = true;
            actionResults = "The enemy managed to dodge your attack and countered you.<br> -" + opponentDamage + " life Counter <br> CRITICAL HIT!";
        }
        else {
            opponentDamage = 1;
            actionResults = "The enemy managed to dodge your attack and countered you.<br> -" + opponentDamage + " life Counter";
        }
        gotHit();
        action();
    }
},2000);
}