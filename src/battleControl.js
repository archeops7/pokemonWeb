console.log("battleControl.js: loaded");
export class BattleControl{
    constructor(){
        console.log("battleControl initialized");
    }

    makeBattle(playerList, enemyList){
        let msg = [];
        ppList = [];
        epList = [];
        let pNow = 0;
        let eNow = 0;
        let pAlive = [];
        let eAlive = [];
        let pSelect = 0;
        let eSelect = 0;
        for(let i in playerList.length){
            ppList.push(new pokemonBase(playerList[i - 1]));
            epList.push(new pokemonBase(enemyList[i - 1]));
            eAlive.push(true);
            pAlive.push(true);
        }
        msg.push("ゆけっ！　" + ppList[0]._name + "！");
        msg.push("あいては　" + epList[0]._name + "　をくりだした！");

        return {msg, ppList, epList, pNow, eNow, pAlive, eAlive, pSelect, eSelect};
    }

    doBattle(bco){
        let preP = true;
        if(bco.eList[eNow]._moves[eSelect]._priority > bco.pList[pNow]._moves[pSelect]._priority){
            preP = false;
        }else if(bco.eList[eNow]._moves[eSelect]._priority === bco.pList[pNow]._moves[pSelect]._priority){
            if(bco.eList[eNow]._s > bco.pList[pNow]._s){
                preP = false;
            }else if(bco.eList[eNow]._s === bco.pList[pNow]._s){
                if(Math.random > 0.5){
                    prep = false;
                }
            }
        }
        if(preP){
            bco.msg.concat(bco.pList[pNow]._moves[pSelect].move(bco.pList[pNow], bco.eList[eNow]));
            if(bco.eList[eNow]._nowHp <= 0){
                break;
            }
            bco.msg.concat(bco.eList[eNow]._moves[eSelect].move(bco.eList[eNow], bco.pList[pNow]));
        }else{
            bco.msg.concat(bco.eList[eNow]._moves[eSelect].move(bco.eList[eNow], bco.pList[pNow]));
            if(bco.pList[pNow]._nowHp <= 0){
                break;
            }
            bco.msg.concat(bco.pList[pNow]._moves[pSelect].move(bco.pList[pNow], bco.eList[eNow]));
        }
        //hp0処理　交代先選べるように
        if(bco.eList[eNow]._nowHp === 0){
            msg.push("あいての　" + bco.eList[eNow] + "は　たおれた")
            eAlive[eNow] = false;
            if(eNow < epList.length - 1){
                eNow += 1;
            }
        }
    }

}