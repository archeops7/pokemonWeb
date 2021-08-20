import  moveBase  from "./moveBase";

export default class oppoMove extends moveBase {
    _accuracy;
    get accuracy() {
        return this._accuracy;
    }
    set accuracy(value) {
        this._accuracy = value;
    }
    constructor(no, name, type, pp, accuracy = 100, additional, addProb, priority){
        super(no, name, type, pp, additional, addProb, priority);
        this._accuracy = accuracy;
    }

    move(player, target){
        let msg = [];
        msg.push(player._name + "　の　" + this._name + "！");
        if(Math.floor(Math.random() * 101) <= this.accurate(player._accuracy, target._evasion)){
            const [effect, typeMsg] = this.typeEf(player._type, target._type);
            msg.concat(typeMsg);
            if(effect){
                msg = msg.concat(this.opponentMove(player, target, effect));
            }
        }else{
            msg.push(target._name + "　には　あたらなかった！");
        }
        return msg;
    }

    opponentMove(player, target, effect){
        let dummy = [player, target, effect];
        console.log(dummy)
    }

    accurate(acu, eva){
        let rate = 1;
        if(acu > eva){
            if(acu - eva > 6){
                rate = 3;
            }else{
                rate = (acu - eva + 3) / 3;
            }
        }else{
            if(acu - eva < -6){
                rate = 1 / 3;
            }else{
                rate = 3 / (eva - acu + 3);
            }
        }
        return this.accuracy * rate;
    }

    typeEf(selfType, targetType){
        //タイプ相性及びタイプ一致
        let msg = [];
        let factor = 1;
        for(let i = 0; i < targetType.length; i++){
            let t = targetType[i];
            switch(this._type){
                case "normal":
                    if(t === "ghost"){
                        factor *= 0;
                    }else if(["rock", "steel"].includes(t)){
                        factor /= 2;
                    }
                    break;
                case "fire":
                    if(["fire", "water", "rock", "dragon"].includes(t)){
                        factor /= 2;
                    }else if(["grass", "ice", "bug", "steel"].includes(t)){
                        factor *= 2;
                    }
                    break;
                case "water":
                    if(["water", "grass", "dragon"].includes(t)){
                        factor /= 2;
                    }else if(["fire", "ground", "rock"].includes(t)){
                        factor *= 2;
                    }
                    break;
                case "electric":
                    if(t === "ground"){
                        factor *= 0;
                    }else if(["electric", "grass", "dragon"].includes(t)){
                        factor /= 2;
                    }else if(["water", "flying"].includes(t)){
                        factor *= 2;
                    }
                    break;
                case "grass":
                    if(["fire", "grass", "poison", "flying", "bug", "dragon", "steel"].includes(t)){
                        factor /= 2;
                    }else if(["water", "ground", "rock"].includes(t)){
                        factor *= 2;
                    }
                    break;
                case "ice":
                    if(["fire", "water", "ice", "steel"].includes(t)){
                        factor /= 2;
                    }else if(["grass", "ground", "flying", "dragon"].includes(t)){
                        factor *= 2;
                    }
                    break;
                case "psychic":
                    if(t === "dark"){
                        factor *= 0;
                    }
                    if(["psychic", "steel"].includes(t)){
                        factor /= 2;
                    }else if(["fighting", "poison"].includes(t)){
                        factor *= 2;
                    }
                    break;
                case "fighting":
                    if(t === "ghost"){
                        factor *= 0;
                    }else if(["poison", "flying", "psychic", "bug", "fairy"].includes(t)){
                        factor /= 2;
                    }else if(["normal", "ice", "rock", "dark", "steel"].includes(t)){
                        factor *= 2;
                    }
                    break;
                case "poison":
                    if(t === "steel"){
                        factor *= 0;
                    }else if(["poison", "ground", "rock", "ghost"].includes(t)){
                        factor /= 2;
                    }else if(["grass", "fairy"].includes(t)){
                        factor *= 2;
                    }
                    break;
                case "ground":
                    if(t === "flying"){
                        factor *= 0;
                    }else if(["grass", "bug"].includes(t)){
                        factor /= 2;
                    }else if(["fire", "electric", "poison", "rock", "steel"].includes(t)){
                        factor *= 2;
                    }
                    break;
                case "flying":
                    if(["electric", "rock", "steel"].includes(t)){
                        factor /= 2;
                    }else if(["grass", "fighting", "bug"].includes(t)){
                        factor *= 2;
                    }
                    break;
                case "bug":
                    if(["fire", "fighting", "poison", "flying", "ghost", "steel", "fairy"].includes(t)){
                        factor /= 2;
                    }else if(["grass", "psychic", "dark"].includes(t)){
                        factor *= 2;
                    }
                    break;
                case "rock":
                    if(["fighting", "ground", "steel"].includes(t)){
                        factor /= 2;
                    }else if(["fire", "ice", "flying", "bug"].includes(t)){
                        factor *= 2;
                    }
                    break;
                case "ghost":
                    if(t === "normal"){
                        factor *= 0;
                    }
                    if(["dark"].includes(t)){
                        factor /= 2;
                    }else if(["psychic", "ghost"].includes(t)){
                        factor *= 2;
                    }
                    break;
                case "dragon":
                    if(t === "fairy"){
                        factor *= 0;
                    }
                    if(["steel"].includes(t)){
                        factor /= 2;
                    }else if(["dragon"].includes(t)){
                        factor *= 2;
                    }
                    break;
                case "dark":
                    if(["fighting", "dark", "fairy"].includes(t)){
                        factor /= 2;
                    }else if(["psychic", "ghost"].includes(t)){
                        factor *= 2;
                    }
                    break;
                case "steel":
                    if(["fire", "water", "electric", "steel"].includes(t)){
                        factor /= 2;
                    }else if(["ice", "rock", "fairy"].includes(t)){
                        factor *= 2;
                    }
                    break;
                case "fairy":
                    if(["fire", "poison", "steel"].includes(t)){
                        factor /= 2;
                    }else if(["fighting", "dragon", "dark"].includes(t)){
                        factor *= 2;
                    }
            }
        }
        if(factor === 0){
            msg.push("こうかは　ないようだ…");
        }else{
            if(factor > 1){
                msg.push("こうかは　ばつぐんだ！");
            }else if(factor < 1){
                msg.push("こうかは　いまひとつのようだ");
            }
            if(selfType.includes(this._type)){
                factor *= 1.5;
            }
        }
        return [factor, msg];
    }

}