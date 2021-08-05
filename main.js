import * as battleControl from "./battleControl.js";

const bc = new battleControl.BattleControl();

new Vue({
    el:"#log",
    data:{
        logs:["pokemon", "battle"]
    }
})