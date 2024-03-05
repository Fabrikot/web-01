import template from "../views/score.html"
import {parseUrl} from "./utils"
import {Component} from "./component"

  /* class ScoreComponent constructor */
  export class ScoreComponent extends Component{
    constructor() {
      const params = parseUrl();
      super(template)
      this.name = params.name;
      this.size = parseInt(params.size);
      this.time = parseInt(params.time);
    }

    /* method ScoreComponent.init */
    init() {
      document.getElementById("name").innerText = this.name;
      document.getElementById("size").innerText = this.size;
      document.getElementById("time").innerText = this.time;
    };
  }