import {Archeops} from "./pokemon/Archeops.js";

let pokemon = new Archeops(50, "jolly", [0,252,0,4,0,252] ,["a", "b", "c", "d"]);
console.log(pokemon.moves[2]);
console.log(pokemon._nowHp);
let msg = ["a", "b"];
msg.push("c");
msg = msg.concat(["d", "e"]);
console.log(msg);