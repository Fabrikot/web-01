import {Component} from "../../../scripts/component";
import back from "./assets/cards/back.png";
import card0 from "./assets/cards/card-0.png";
import card1 from "./assets/cards/card-1.png";
import card2 from "./assets/cards/card-2.png";
import card3 from "./assets/cards/card-3.png";
import card4 from "./assets/cards/card-4.png";
import card5 from "./assets/cards/card-5.png";
import card6 from "./assets/cards/card-6.png";
import card7 from "./assets/cards/card-7.png";
import card8 from "./assets/cards/card-8.png";
import card9 from "./assets/cards/card-9.png";

import card10 from "./assets/cards2/card-0.PNG";
import card11 from "./assets/cards2/card-1.png";
import card12 from "./assets/cards2/card-2.png";
import card13 from "./assets/cards2/card-3.png";
import card14 from "./assets/cards2/card-6.png";
import card15 from "./assets/cards2/card-4.png";
import card16 from "./assets/cards2/card-5.png";
import card17 from "./assets/cards2/card-7.png";
import card18 from "./assets/cards2/card-8.png";
import card19 from "./assets/cards2/card-9.png";



import CARD_TEMPLATE from "./card.component.html";

import "./card.component.css";

const CARDS_IMAGE = [
    back,
    card0,
    card1,
    card2,
    card3,
    card4,
    card5,
    card6,
    card7,
    card8,
    card9,
    card10,
    card11,
    card12,
    card13,
    card14,
    card15,
    card16,
    card17,
    card18,
    card19
];

export class CardComponent extends Component {
    constructor(id) {
        super(CARD_TEMPLATE)
        this._flipped = false;

        this._elt = document.createElement("div");
        this._elt.innerHTML = this.template;
        this._elt = this._elt.firstElementChild;
        this._id = id;

        this._imageElt = this.getElement().querySelector(".card-wrapper");
        this._imageElt.querySelector("img.front-face").src =
            CARDS_IMAGE[this._id + 1];
        this._imageElt.querySelector("img.back-face").src = CARDS_IMAGE[0];
    }


    /* method CardComponent.getElement */
    getElement() {
        return this._elt;
    };

    /* method CardComponent.flip */
    flip() {
        this._imageElt.classList.toggle("flip");
        this._flipped = !this._flipped;
    };

    /* method CardComponent.equals */
    equals(card) {
        return card._id === this._id;
    };

    get flipped() {
        return this._flipped;
    }
}