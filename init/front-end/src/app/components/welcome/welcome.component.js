  import template from "../welcome/welcome.component.html"
  import {Component} from "../../scripts/component";
    import "./welcome.component.css";
  import * as localforage from "localforage/dist/localforage";

  /* class WelcomeComponent constructor  */
  export class WelcomeComponent extends Component{
    constructor() {
      super(template);
    }

    /* method WelcomeComponent.init */
    init() {
      const form = document.querySelector("form.form-signin");

      form.addEventListener(
          "submit",
          (event) => {
            event.preventDefault();
            if (form.checkValidity() === false) {
              event.stopPropagation();
              form.classList.add("was-validated");
            } else {
              const name = event.srcElement.querySelector("#nickname").value;
              const size = parseInt(event.srcElement.querySelector("#size").value);

              this._startGame(name, size);
            }
          },
          false
      );
      return this;
    };

    async _startGame(name, size) {
        const gamePage = "./#game";
        let nom_joueur_existant = await localforage.getItem("Player")
        let size_existant = await localforage.getItem("boardsize")
        if (name === nom_joueur_existant && size === size_existant){
            window.location = `${gamePage}?name=${nom_joueur_existant}&size=${size_existant}`
        } else {
            localforage.clear()
            window.location = `${gamePage}?name=${name}&size=${size}`;
        }
    }
  }