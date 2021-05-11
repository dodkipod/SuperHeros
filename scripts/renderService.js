
import {
  $heros,
  $successCounter,
  $failCounter,
  goodCounter,
  badCounter,
  failures,
  $strongestDiv,
  modledHeros

} from "./app.js"


class Rendering {

  renderSingleSuperhero(superHero) {

    try {
      $heros.innerHTML += `
      <div id=${superHero.id}>
        <div class="card herocard" id="a${superHero.id}"style="width: 20rem;">
          <img class="card-img-top"
            src="${superHero.image}" alt="Card image cap">
          <div class="card-body">
            <h1 class="card-title m-3">${superHero.name}</h1>
            <h5>(${superHero.id})</h5>
            <div class="card-body d-flex">

              <div class="card stats">
                <div class="card-header">
                  <h6 class="mb-0">Powerstats</h6>
                </div>
                <div class="card-body card-inner">
                  intelligence: ${superHero.powerstats.intelligence}<br>
                  strength: ${superHero.powerstats.strength}<br>
                  speed: ${superHero.powerstats.speed}<br>
                  durability: ${superHero.powerstats.durability}<br>
                  power: ${superHero.powerstats.power}<br>
                  combat: ${superHero.powerstats.combat}
                </div>
              </div>

              <div class="card stats">
                <div class="card-header">
                  <h6 class="mb-0">Appearance</h6>
                </div>
                <div class="card-body card-inner">
                  gender: ${superHero.appearance.gender}<br>
                  race: ${superHero.appearance.race}<br>
                  height: ${superHero.appearance.height}<br>
                  weight: ${superHero.appearance.weight}<br>
                  eyeColor: ${superHero.appearance.eyeColor}<br>
                  hairColor: ${superHero.appearance.hairColor}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>`;
      return superHero;

    } catch (err) {
      $heros.innerHTML += `<div class="card herocard" style="width: 20rem;">
        <h1>???</h1>
        <div class="card-body">
          <h1 class="card-title m-3">No Superhero for "${superHero}"</h1>

          <div class="card-body d-flex">

            <div class="card stats">
              <div class="card-header">
                <h6 class="mb-0">Powerstats</h6>
              </div>
              <div class="card-body card-inner">
                intelligence: ??<br>
                strength:??<br>
                speed: ??<br>
                durability:??<br>
                power: ??<br>
                combat: ??
              </div>
            </div>

            <div class="card stats">
              <div class="card-header">
                <h6 class="mb-0">Appearance</h6>
              </div>
              <div class="card-body card-inner">
                gender: ??<br>
                race: ??<br>
                height: ??<br>
                weight: ??<br>
                eyeColor: ??<br>
                hairColor: ??
              </div>
            </div>

          </div>

        </div>

      </div>`
      return superHero;

    }

  }

  renderCounters() {
    $successCounter.innerHTML = `<h2 class="counter text-success">Successful: ${goodCounter}/${modledHeros.length} </h2>`
    $failCounter.innerHTML = `<h2 class="counter text-danger">Failed: ${badCounter}/${modledHeros.length}</h2>`
  }

  renderFailures(){
    failures.forEach((failure)=>{
      $heros.innerHTML+=`<h2>"${failure}"<h2>`;
      
    });
  }

  toggleStrongestBtn(boolean){
    let toggle;
    boolean? toggle="":toggle="disabled";
    $strongestDiv.innerHTML = `<button type="button" class="btn btn-success btn-md" id="strongest"${toggle}>Who's the strongest?</button>`
  }
}

export default new Rendering();