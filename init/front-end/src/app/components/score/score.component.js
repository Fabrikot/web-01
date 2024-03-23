import template from "../score/score.component.html"
import {parseUrl} from "../../scripts/utils"
import {Component} from "../../scripts/component"
import "./score.component.css";

/* class ScoreComponent constructor */
export class ScoreComponent extends Component {
    constructor() {
        const params = parseUrl();
        super(template)
        this.name = params.name;
        this.size = parseInt(params.size);
        this.time = parseInt(params.time);
    }

    /* method ScoreComponent.init */
    async init() {
        document.getElementById("name").innerText = this.name;
        document.getElementById("size").innerText = this.size;
        document.getElementById("time").innerText = this.time;
        //await this.postScore(this.name,this.size,this.time)
        let getscore = await this.getScores()

        let highscore = document.getElementById("highscore");
        getscore.sort((a, b) => {
            if (a.size !== b.size) {
                return b.size - a.size;
            } else {
                return a.time - b.time;
            }
        });
        let cols = Object.keys(getscore[0]);
        let thead = document.createElement("thead");
        let tr = document.createElement("tr");

        cols.forEach((item) => {
            let th = document.createElement("th");
            th.innerText = item;
            tr.appendChild(th);
        });
        thead.appendChild(tr); // Append the header row to the header
        highscore.append(tr) // Append the header to the table

        getscore.forEach(score => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${score.name}</td>
            <td>${score.size}</td>
            <td>${score.time}</td>
    `;
            highscore.appendChild(row);
        });

    }
    async getScores(){
        //Fetch API
        const scores = await fetch(`http://localhost:8081/scores`, {
            method: "GET",
        }).then((response) => response.json())
        return scores
    }
    async postScore(name,size,time){
        //Fetch API
        await fetch("http://localhost:8081/scores", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: name, time: time, size: size }),
        });
    }
}