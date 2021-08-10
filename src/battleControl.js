import pb from './pokemon/pokemonBase'
console.log("battleControl.js: loaded");
export class BattleControl{
    constructor(){
        console.log("battleControl initialized");
    }

    makeBattle(playerList, enemyList){
        let msg = [];
        let ppList = [];
        let epList = [];
        let pNow = 0;
        let eNow = 0;
        let pAlive = [];
        let eAlive = [];
        let pSelect = 0;
        let eSelect = 0;
        for(let i in playerList.length){
            ppList.push(new pb.pokemonBase(playerList[i - 1]));
            epList.push(new pb.pokemonBase(enemyList[i - 1]));
            eAlive.push(true);
            pAlive.push(true);
        }
        msg.push("ゆけっ！　" + ppList[0]._name + "！");
        msg.push("あいては　" + epList[0]._name + "　をくりだした！");

        return {msg, ppList, epList, pNow, eNow, pAlive, eAlive, pSelect, eSelect};
    }

    doBattle(bco){
        let preP = true;
        if(bco.eList[bco.eNow]._moves[bco.eSelect]._priority > bco.pList[bco.pNow]._moves[bco.pSelect]._priority){
            preP = false;
        }else if(bco.eList[bco.eNow]._moves[bco.eSelect]._priority === bco.pList[bco.pNow]._moves[bco.pSelect]._priority){
            if(bco.eList[bco.eNow]._s > bco.pList[bco.pNow]._s){
                preP = false;
            }else if(bco.eList[bco.eNow]._s === bco.pList[bco.pNow]._s){
                if(Math.random > 0.5){
                    preP = false;
                }
            }
        }
        if(preP){
            bco.msg.concat(bco.pList[bco.pNow]._moves[bco.pSelect].move(bco.pList[bco.pNow], bco.eList[bco.eNow]));
            if(bco.eList[bco.eNow]._nowHp > 0){
                bco.msg.concat(bco.eList[bco.eNow]._moves[bco.eSelect].move(bco.eList[bco.eNow], bco.pList[bco.pNow]));
            }
        }else{
            bco.msg.concat(bco.eList[bco.eNow]._moves[bco.eSelect].move(bco.eList[bco.eNow], bco.pList[bco.pNow]));
            if(bco.pList[bco.pNow]._nowHp > 0){
                bco.msg.concat(bco.pList[bco.pNow]._moves[bco.pSelect].move(bco.pList[bco.pNow], bco.eList[bco.eNow]));
            }

        }
        //hp0処理交代先選べるように
        if(bco.eList[bco.eNow]._nowHp === 0){
            bco.msg.push("あいての　" + bco.eList[bco.eNow] + "は　たおれた")
            bco.eAlive[bco.eNow] = false;
            if(bco.eNow < bco.epList.length - 1){
                bco.eNow += 1;
            }
        }
    }

}