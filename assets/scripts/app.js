const ATTACK_VALUE = 10;
//Valor a ser escolhido pelo user depois
let chosenMaxLive = 100;
let currentMonsterHealth = chosenMaxLive;
let currentPlayerHealth = chosenMaxLive;

adjustHealthBars(chosenMaxLive);

//Nome Handler pois faz interação com o EventListener
function attackHandler(){
    const damage = dealMonsterDamage(ATTACK_VALUE);
    currentMonsterHealth -= damage;
}

attackBtn.addEventListener('click',attackHandler);