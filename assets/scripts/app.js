const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const enteredValue = prompt('Valor máximo de vida para você e para o monstro.', '100');

//Valor a ser escolhido pelo user depois
let chosenMaxLive = parseInt(enteredValue);
let battleLog= [];

if(isNaN(chosenMaxLive) || chosenMaxLive <= 0){
    chosenMaxLive = 100;
}

let currentMonsterHealth = chosenMaxLive;
let currentPlayerHealth = chosenMaxLive;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLive);

function writeToLog(ev, val, monsterHealth, playerHealth){
   let logEntry = {
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    };
    if(ev === LOG_EVENT_PLAYER_ATTACK){
        logEntry.target = 'MONSTER'; 
    } else if(ev === LOG_EVENT_PLAYER_STRONG_ATTACK){
        logEntry.target = 'MONSTER'; 
    } else if(ev === LOG_EVENT_MONSTER_ATTACK){
        logEntry.target = 'PLAYER'; 
    } else if(ev === LOG_EVENT_PLAYER_HEAL){
        logEntry.target = 'PLAYER'; 
    }

    battleLog.push(logEntry);
}

function reset(){
     currentMonsterHealth = chosenMaxLive;
     currentPlayerHealth = chosenMaxLive;
     resetGame(chosenMaxLive);
}

function endRound(){
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(
        LOG_EVENT_MONSTER_ATTACK,
        playerDamage,
        currentMonsterHealth,
        currentPlayerHealth
    );
    
    if(currentPlayerHealth <= 0 && hasBonusLife){
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('Você estaria morto, mas a vida bonus te salvou!');
    }
    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0){
        alert('Você ganhou');
        writeToLog(
            LOG_EVENT_MONSTER_ATTACK,
            'JOGADOR GANHOU',
            currentMonsterHealth,
            currentPlayerHealth
        );
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0){
        alert('Você perdeu');
        writeToLog(
            LOG_EVENT_MONSTER_ATTACK,
            'MONSTRO GANHOU',
            currentMonsterHealth,
            currentPlayerHealth
        );
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0){
        alert('Empate');
        writeToLog(
            LOG_EVENT_MONSTER_ATTACK,
            'EMPATE',
            currentMonsterHealth,
            currentPlayerHealth
        );
    }

    if(currentMonsterHealth <= 0 || currentPlayerHealth <= 0){
        reset();
    }
}
function attackMonster(mode){
    let maxDamage;
    let logEvent;
    if(mode === MODE_ATTACK){
        maxDamage = ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_ATTACK;
    } else if(mode === MODE_STRONG_ATTACK){
        maxDamage = STRONG_ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(
        logEvent,
        damage,
        currentMonsterHealth,
        currentPlayerHealth
    );
    endRound();
}

//Nome Handler pois faz interação com o EventListener
function attackHandler(){
    attackMonster(MODE_ATTACK);
}

function strongAttackHandler(){
    attackMonster(MODE_STRONG_ATTACK);
}
function healPlayerHandler(){
    let healValue;
    if(currentPlayerHealth >= chosenMaxLive - HEAL_VALUE){
        alert('Você não pode se curar mais que sua vida inicial');
        healValue = chosenMaxLive - currentPlayerHealth;
    } else{
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(HEAL_VALUE);
    currentPlayerHealth += HEAL_VALUE;
    writeToLog(
        LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth
    );
    endRound();
}

function printLogHandler(){
    console.log(battleLog);
}

attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);