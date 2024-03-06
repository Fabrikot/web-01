import template from "../score/score.component.html"
import {parseUrl} from "../../scripts/utils"
import {Component} from "../../scripts/component"
import "./score.component.css";
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