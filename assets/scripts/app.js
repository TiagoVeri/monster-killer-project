const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
//Valor a ser escolhido pelo user depois
let chosenMaxLive = 100;
let currentMonsterHealth = chosenMaxLive;
let currentPlayerHealth = chosenMaxLive;

adjustHealthBars(chosenMaxLive);
function endRound(){
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0){
        alert('Você ganhou');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0){
        alert('Você perdeu');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0){
        alert('Empate');
    }
}
function attackMonster(mode){
    let maxDamage;
    if(mode === 'ATTACK'){
        maxDamage = ATTACK_VALUE;
    } else if(mode === 'STRONG_ATTACK'){
        maxDamage = STRONG_ATTACK_VALUE;
    }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    endRound();
}

//Nome Handler pois faz interação com o EventListener
function attackHandler(){
    attackMonster('ATTACK');
}

function strongAttackHandler(){
    attackMonster('STRONG_ATTACK');
}
function healPlayerHandler(){
    let healValue;
    if(currentPlayerHealth = chosenMaxLive - HEAL_VALUE){
        alert('Você não pode se curar mais que sua vida inicial');
        healValue = chosenMaxLive - currentPlayerHealth;
    } else{
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(HEAL_VALUE);
    currentPlayerHealth += HEAL_VALUE;
    endRound();
}


attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click');