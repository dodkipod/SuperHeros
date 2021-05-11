import delay from "./utils.js";

class Fetching {

  async fetchSingleHero(userNum) {
    await delay(1500 + userNum * 2);
    let url = `https://akabab.github.io/superhero-api/api/id/${userNum}.json`;
    let superHero;

    try {

      superHero = await fetch(url).then(resp =>
        resp.json());

      return superHero;

    } catch (err) {
      return userNum;
    }

  }
}



export default new Fetching();