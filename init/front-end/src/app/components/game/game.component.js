import {Component} from "../../scripts/component";
import {parseUrl} from "../../scripts/utils";
import {CardComponent} from "./card/card.component";
import template from "./game.component.html";
import * as localforage from "localforage/dist/localforage";
import "./game.component.css";

var CARD_TEMPLATE = ""
    .concat('<main class="card-cmp">')
    .concat('  <div class="card-wrapper">')
    .concat('    <img class="card front-face" alt="card" />')
    .concat('    <img class="card back-face" alt="card" />')
    .concat("  </div>")
    .concat("</main>");

var environment = {
    api: {
        host: "http://localhost:8081",
    },
};

/* class GameComponent constructor */
export class GameComponent extends Component {
    // gather parameters from URL
    constructor() {
        var params = parseUrl();
        super(template)
        // save player name & game ize
        this._name = params.name;
        this._size = parseInt(params.size) || 9;
        this._flippedCard = null;
        this._matchedPairs = 0;
    }

    /* method GameComponent.init */

    async init() {
        // fetch the cards configuration from the server
        this._cards = [];
        this._boardElement = document.querySelector(".cards");
        let configid= await localforage.getItem("configId")
        let paires_retournées= await localforage.getItem("tab_save")

        if(!(configid==null)){
            console.log("Recup "+ configid)
            this._cards=configid.map(ID => new CardComponent(ID));

            if (!(paires_retournées==null)) {
                console.log(paires_retournées)

                //paires_retournées.sort((a,b)=>a.id-b.id)
                this._cards.forEach(card =>{
                    if((paires_retournées.includes(card._id))){
                        card.flip();
                    }
                })
                this._matchedPairs=paires_retournées.length;
                if (this._matchedPairs === this._size) {
                    await localforage.getItem("starttemps").then(temps => {
                        this.goToScore(temps);
                    })
                }            }

        }else{
            this._config = await this.fetchConfig();
            // create cards out of the config
            this._cards =this._config.ids.map(ID => new CardComponent(ID, CARD_TEMPLATE));
            localforage.setItem("configId",this._config.ids)
            console.log("Crea" + this._cards )
        }

        this._cards.forEach((card) => {
            this._boardElement.appendChild(card.getElement());
            card.getElement().addEventListener("click", () => {
                this._flipCard(card)
            })
        })
        this.start();
    };

    /* method GameComponent.start */
    async start() {
        let seconds;
        let temps = await localforage.getItem("starttemps")
        if (!(temps==null)){
            this._startTime = temps
            seconds = (Date.now() - this._startTime) / 1000;
        } else {
            this._startTime = Date.now();
            localforage.setItem("starttemps", this._startTime)
            seconds = 0;
        }
        document.querySelector("nav .navbar-title").textContent = `Player: ${this._name}. Elapsed time: ${seconds++}`;

        this._timer = setInterval(() => {
                document.querySelector("nav .navbar-title").textContent = `Player: ${this._name}. Elapsed time: ${seconds++}`
            }, 1000
        );
    };

    /* method GameComponent.fetchConfig */
    fetchConfig() {
        localforage.setItem("Player",this._name)
        localforage.setItem("boardsize",this._size)
        return fetch(`${environment.api.host}/board?size=${this._size}`).then(
            (r) => r.json()
        );
    };

    /* method GameComponent.goToScore */
    goToScore(temps) {
        localforage.clear()
        const timeElapsedInSeconds = Math.floor(
            (Date.now() - temps) / 1000
        );
        clearInterval(this._timer);

        setTimeout(
            () => {
                const scorePage = "./#score";
                window.location = `${scorePage}?name=${this._name}&size=${this._size}&time=${timeElapsedInSeconds}`;
            }, 750
        );
    };

    /* method GameComponent._flipCard */
    async _flipCard(card) {
        if (this._busy) {
            return;
        }

        if (card.flipped) {
            return;
        }

        // flip the card
        card.flip();

        // if flipped first card of the pair
        if (!this._flippedCard) {
            // keep this card flipped and wait for the second card of the pair
            this._flippedCard = card;
        } else {
            // second card of the pair flipped...

            // if cards are the same
            if (card.equals(this._flippedCard)) {
                this._flippedCard.matched = true;
                card.matched = true;
                this._matchedPairs += 1;

                await localforage.getItem("tab_save").then(result =>{
                    if (!(result==null)){
                        if(!result.includes(card._id)){
                            result.push(card._id);
                        }
                        localforage.setItem("tab_save",result);
                    }
                    else{
                        result=[]
                        result.push(card._id)
                        localforage.setItem("tab_save",result)
                    }
                })
                // reset flipped card for the next turn.
                this._flippedCard = null;

                if (this._matchedPairs === this._size) {
                    await localforage.getItem("starttemps").then(temps => {
                        this.goToScore(temps);
                        })
                }
            } else {
                this._busy = true;

                // cards did not match
                // wait a short amount of time before hiding both cards
                setTimeout(() => {
                        // hide the cards
                        this._flippedCard.flip();
                        card.flip();
                        this._busy = false;

                        // reset flipped card for the next turn.
                        this._flippedCard = null;
                    }, 500
                );
            }
        }
    };
}