import rendering from "./renderService.js";
import fetching from "./fetching.js";


export let $heros = document.querySelector(".heros");
let $counters = document.getElementById("counters");

let inputValues =[];
let fetched =[];
export let modledHeros = [];
export let failures = [];

export let goodCounter = 0;
export let badCounter = 0;
export let $successCounter = document.querySelector('.successCounter');
export let $failCounter = document.querySelector('.failCounter');
export let $strongestDiv = document.querySelector('.strongestDiv');

let btnShowWhateverIsReady = document.getElementById("btnShowWhateverIsReady");
let btnSucceedOrFail = document.getElementById("btnSucceedOrFail");
let btnAllOrNothing = document.getElementById("btnAllOrNothing");

function collectInputs(){

  let inputList = document.querySelectorAll('.heroInput');
  
  inputList.forEach((i)=>{
    inputValues.push(i.value);
  })

}

function showWhateverIsReady() {
  cleanUp();
  $heros.innerHTML = "";

  collectInputs();

  inputValues.forEach((i)=> fetching.fetchSingleHero(i).then(updateFetched).then(updatemodledHeros).then(rendering.renderSingleSuperhero).then(updateCounters).then(rendering.renderCounters).then(jumpy).then(()=>{
    if(modledHeros.length==inputValues.length){
     rendering.toggleStrongestBtn(true)
   }}));

}
btnShowWhateverIsReady.addEventListener('click', showWhateverIsReady);

async function succeedOrFail() {
  cleanUp();

  collectInputs();
  $heros.innerHTML ="";

   for(let i=0;i<inputValues.length;i++){
      updateFetched(await fetching.fetchSingleHero(inputValues[i]))
    }
    
  fetched.forEach((hero)=>{
    let mHero = updatemodledHeros(hero);
    let rendered = rendering.renderSingleSuperhero(mHero);
    updateCounters(rendered);

  })

  rendering.renderCounters();
  rendering.toggleStrongestBtn(true);
  jumpy();

}
btnSucceedOrFail.addEventListener('click', succeedOrFail);

async function allOrNothing (){
  cleanUp();
  collectInputs()

  for(let i=0;i<inputValues.length;i++){
      updateFetched(await fetching.fetchSingleHero(inputValues[i]))
  };

  let allGood = fetched.every(checkEveryHero)

  if(allGood){
    $heros.innerHTML ="";
     fetched.forEach((hero)=>{
    let mHero = updatemodledHeros(hero);
    let rendered = rendering.renderSingleSuperhero(mHero);
    updateCounters(rendered);
    });

    rendering.renderCounters();
    jumpy();
    rendering.toggleStrongestBtn(true);

  }else{

    $heros.innerHTML = "<h2>The following Super-Heros could not be found:</h2>";
     fetched.forEach((hero)=>{
    let mHero = updatemodledHeros(hero);
    updateCounters(mHero);
    })
   
    updateFailures();
    rendering.renderFailures();

    badCounter=failures.length;
    goodCounter = modledHeros.length-badCounter;
    rendering.renderCounters();
    jumpy();

  }
}
btnAllOrNothing.addEventListener('click',allOrNothing);

function checkEveryHero (hero){
   return hero.id
};

function updateFetched(hero){
  fetched.push(hero);
  return hero
};

function strongCalc (powerstats){
  let {intelligence,strength,speed,durability,power,combat}=powerstats;
  return intelligence+strength+speed+durability+power+combat
};

function desHero(hero){
 
  if(hero.id){
  let {id,name,appearance ,powerstats,images} = hero;
  let image = images.md;
  let {gender,race,height,weight,eyeColor,hairColor} = appearance;
  height = height[1];
  weight = weight[1];
  let desHero={id,name,appearance:{gender,race,height,weight,eyeColor,hairColor},powerstats,image, strongest:strongCalc(powerstats)};
  return desHero};

  return hero
};

function updatemodledHeros(superHero) {
  
  let mHero = desHero(superHero)
  modledHeros.push(mHero);
  return mHero;

}

export function updateCounters(hero) {
  hero.id ? goodCounter++ : badCounter++;
}

function updateFailures (){
  modledHeros.forEach((item)=>{
    if (typeof(item)=="string"){
      failures.push(item);
    };
    });
}

function cleanUp (){
  $heros.innerHTML = "<h2>Please wait a few moments...</h2>";
  goodCounter = 0;
  badCounter = 0;
  inputValues =[];
  fetched=[];
  modledHeros = [];
  failures=[];
  rendering.renderCounters();
  rendering.toggleStrongestBtn(false);
}

function jumpy(){
  $counters.scrollIntoView();
  return true;
}

function chooseStrongest (){
 
  let brother = document.querySelector('.brother');
  if(brother){
    brother.remove();
  };

  let strongHeros =[];

  modledHeros.forEach((hero)=>{
    if(hero.strongest){
      strongHeros.push(hero);
    }else{
      return
    }
  })
  if(strongHeros.length <1){
    $heros.innerHTML ="<h2>No heros to compare</h2>";
  }else{
  strongHeros.sort((item1,item2)=>{
    return item2.strongest-item1.strongest
  });
  
  let strongest=strongHeros[0];
      
  let oldItem = document.getElementById(`a${strongest.id}`)
  let newItem = document.createElement("div");
  newItem.classList.add("brother");

  oldItem.before(newItem)
  newItem.innerHTML+=`<h4>${strongest.name} is the strongest</h4>`
  }
}
$strongestDiv.addEventListener('click',chooseStrongest);

    
let whatDo = document.getElementById('whatDo'),
    popup = document.querySelector('#popupwrapper'),
    close = document.querySelector('.popupClose');
whatDo.addEventListener('click', () => {
  popup.style.display = "block";
});
close.addEventListener('click', () => {
  popup.style.display = "none";
});
popup.addEventListener('click', (e) => {
  if (e.target.id === "popupwrapper") {
    popup.style.display = "none";
    }
});