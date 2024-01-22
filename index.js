import GAMES_DATA from './games.js';
const GAMES_JSON = JSON.parse(GAMES_DATA)

function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
    games.forEach(game => {
        let newGame = document.createElement("div");
        newGame.classList.add("game-card");
        const toInnerHTML = `
            <h1> ${game.name} </h1>
            <p> ${game.description} </p>
            <p> Pledged: ${game.pledged} </p>
            <img class="game-img" src=${game.img}>
        `
        newGame.innerHTML = toInnerHTML;
        gamesContainer.appendChild(newGame);
    });
}

showAllGames();

const contributionsCard = document.getElementById("num-contributions");

let totalContributions = GAMES_JSON.reduce((acc, game) => acc + game["backers"], 0);
contributionsCard.innerText = totalContributions.toLocaleString("en-us");

const raisedCard = document.getElementById("total-raised");
let totalPledged = GAMES_JSON.reduce((acc, game) => acc + game["pledged"], 0).toLocaleString("en-us");
raisedCard.innerHTML = `$ ${totalPledged}`;

const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = (GAMES_JSON.length).toLocaleString("en-us");

function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfundedGames = getFilteredGames("pledged", "goal")
    addGamesToPage(unfundedGames)
    return unfundedGames;
}

function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = getFilteredGames("goal", "pledged")
    addGamesToPage(fundedGames)
    return fundedGames;

}

function showAllGames() {
    deleteChildElements(gamesContainer);
    return addGamesToPage(GAMES_JSON);

}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");
setEventListener(unfundedBtn, filterUnfundedOnly);
setEventListener(fundedBtn, filterFundedOnly);
setEventListener(allBtn, showAllGames);

function setEventListener(btn, filter){
    btn.addEventListener("click", filter);
}

const descriptionContainer = document.getElementById("description-container");

function getFilteredGames(key1, key2){
    return GAMES_JSON.filter(game =>{
        return game[key1] <= game[key2];
    })
}
let getLenUnfunded = getFilteredGames("pledged", "goal").length;
let getLenFunded = getFilteredGames("goal", "pledged").length;

let descriptionStr = `A total of $${totalPledged} has been raised for ${getLenFunded} games. Currently, ${getLenUnfunded > 0 ? `${getLenUnfunded} games remain unfunded. \n\nHelp support these games by donating!` : "All games have reached their goal. Thank you to all supporters"}`;
let descElement = document.createElement("p");
descElement.innerText = descriptionStr;
descriptionContainer.appendChild(descElement);

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

let [topGame, topGame2] = sortedGames;
for (let i=0; i<2; i++){
    let newEle = document.createElement("p");
    i == 0 ? newEle.innerText = topGame.name : newEle.innerText = topGame2.name
    i == 0 ? firstGameContainer.appendChild(newEle) : secondGameContainer.appendChild(newEle);
}

