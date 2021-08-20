//import pb from './pokemon/pokemonBase'
//import atkmove from './moves/attackMove'
console.log("battleControl.js: loaded");
export default class BattleControl{
    constructor(){
        console.log("battleControl initialized");
    }

    makeBattle(playerList, enemyList){
        let msg = [];
        let ppList = playerList;
        let epList = enemyList;
        let pNow = 0;
        let eNow = 0;
        let pAlive = [];
        let eAlive = [];
        let pSelect = 0;
        let eSelect = 6;
        let pNext = 1;//次の行動フラグ 戦闘不能時の交代とか
        let eNext = 1;//0-何でも 1-交代のみ 2-わざのみ 4-バトル終了
        let pEtc = null;//その他情報 交代先とか
        let eEtc = 0;
        let pABC = [];//状態 引数:0.状態異常 1.こんらん 2.ひるみ 3.バインド(複数) 4.経過ターン(0.状態異常 1.こんらん 2以降バインド)
        let eABC = [];
        for(let i = 0; i < playerList.length; i++){
            pAlive.push(true);
            pABC.push(['', false, false, [''], [0,0,0]])
        }
        for(let i = 0; i < enemyList.length; i++){
            eAlive.push(true);
            eABC.push(['', false, false, [''], [0,0,0]])
        }
        msg.push("あいてが　しょうぶを　しかけてきた！");
        msg.push("さいしょにだすポケモンを　えらんでください")

        return {msg:msg, pList:ppList, epList:epList, pNow:pNow, eNow:eNow, pAlive:pAlive, eAlive:eAlive, pSelect:pSelect, eSelect:eSelect, pNext:pNext, eNext:eNext, pEtc:pEtc, eEtc:eEtc, pABC:pABC, eABC:eABC};
    }

    mainBC(bco){
        console.log("mainbcstart")
        let p = bco.pSelect
        let e = bco.eSelect
        console.log(p + ":" + e)
        if(p > e && p > 4){
            bco = this.switchBC([bco, p])
            bco = this.switchBC([bco, e])
        }else if(e > p && e > 4){
            bco = this.switchBC([bco, e])
            bco = this.switchBC([bco, p])
        }else{
            bco = this.switchBC([bco, p, e])
        }
        bco = this.addDamage(bco);

        //hp0処理交代先選べるように
        if(bco.epList[bco.eNow]._nowHp === 0){
            bco.msg.push("あいての　" + bco.epList[bco.eNow]._name + "は　たおれた")
            bco.eAlive[bco.eNow] = false;
            bco.eAlive.includes(true) ? bco.eNext = 1 : bco.eNext = 4
        }
        if(bco.pList[bco.pNow]._nowHp === 0){
            bco.msg.push(bco.pList[bco.pNow]._name + "は　たおれた")
            bco.pAlive[bco.pNow] = false;
            bco.pAlive.includes(true) ? bco.pNext = 1 : bco.pNext = 4
        }
        if(bco.eNext == 4 && bco.pNext === 4){
            bco.msg.push("あいてとの　しょうぶは　ひきわけだ！")
        }else if(bco.eNext === 4){
            bco.msg.push("あいてとの　しょうぶに　かった！")
        }else if(bco.pNext === 4){
            bco.msg.push("プレイヤーの　てもとには　たたかえるポケモンが　もういない！\nプレイヤーは　めのまえが　まっくらに　なった！")
        }

        return bco
    }

    switchBC(ary){
        console.log("switchbcstart")
        console.log(ary)
        //交代6道具5dumわざ4わざ0~3
        if(ary.length===3 && ary[0].pSelect < 4){
            this.doBattle(ary[0])
        }else{
            for(let i = 1; i < ary.length; i++){
                switch(ary[i]){
                    case 6:
                        ary[0] = this.change(ary[0])
                        break;
                    case 5:
                        ary[0] = this.useTool(ary[0])
                        break;
                    case 4:
                    case 3:
                    case 2:
                    case 1:
                    case 0:
                        ary[0] = this.doBattle(ary[0])
                }
            }
        }
        return ary[0]
    }

    doBattle(bco){
        console.log("dobattlestart")
        //let mv = new atkmove();
        let preP = true;
        bco.pNext = 0;
        bco.eNext = 0;
        let pdo = (bco.pSelect < 4);
        let edo = (bco.eSelect < 4);
        let msg = [];
        let cando = true;
        console.log(pdo + ":" + edo)
        if(pdo && edo){
            if(bco.epList[bco.eNow]._moves[bco.eSelect]._priority > bco.pList[bco.pNow]._moves[bco.pSelect]._priority){
                preP = false;
            }else if(bco.epList[bco.eNow]._moves[bco.eSelect]._priority === bco.pList[bco.pNow]._moves[bco.pSelect]._priority){
                if(bco.epList[bco.eNow]._s * this.rank(bco.epList[bco.eNow]._sRank) * this.sef(bco.epList[bco.eNow]) > bco.pList[bco.pNow]._s * this.rank(bco.pList[bco.pNow]._sRank) * this.sef(bco.pList[bco.pNow])){
                    preP = false;
                }else if(bco.epList[bco.eNow]._s * this.rank(bco.epList[bco.eNow]._sRank) * this.sef(bco.epList[bco.eNow]) === bco.pList[bco.pNow]._s * this.rank(bco.pList[bco.pNow]._sRank) * this.sef(bco.pList[bco.pNow])){
                    if(Math.random() > 0.5){
                        preP = false;
                    }
                }
            }
        }
        if(preP){
            if(pdo){
                [cando, msg] = this.canMove(bco.pList[bco.pNow], false)
                bco.msg = bco.msg.concat(msg);
                if(cando){
                    bco.msg = bco.msg.concat(bco.pList[bco.pNow]._moves[bco.pSelect].moving(bco.pList[bco.pNow], bco.epList[bco.eNow]));
                    bco.pList[bco.pNow]._moves[bco.pSelect]._pp -= 1
                }
            }

            if(edo){
                [cando, msg] = this.canMove(bco.epList[bco.eNow], true);
                bco.msg = bco.msg.concat(msg);
                if(cando){
                    bco.msg = bco.msg.concat(bco.epList[bco.eNow]._moves[bco.eSelect].moving(bco.epList[bco.eNow], bco.pList[bco.pNow]));
                    bco.epList[bco.eNow]._moves[bco.eSelect]._pp -= 1
                }
            }
        }else{
            if(edo){
                [cando, msg] = this.canMove(bco.epList[bco.eNow], false);
                bco.msg = bco.msg.concat(msg);
                if(cando){
                    bco.msg = bco.msg.concat(bco.epList[bco.eNow]._moves[bco.eSelect].moving(bco.epList[bco.eNow], bco.pList[bco.pNow]));
                    bco.epList[bco.eNow]._moves[bco.eSelect]._pp -= 1
                }
            }
            if(pdo){
                [cando, msg] = this.canMove(bco.pList[bco.pNow], true);
                bco.msg = bco.msg.concat(msg);
                if(cando){
                    bco.msg = bco.msg.concat(bco.pList[bco.pNow]._moves[bco.pSelect].moving(bco.pList[bco.pNow], bco.epList[bco.eNow]));
                    bco.pList[bco.pNow]._moves[bco.pSelect]._pp -= 1
                }
            }
        }
        return bco
    }

    change(bco){
        console.log("changestart")
        console.log(bco)
        if(bco.pSelect === 6){
            this.resetRank(bco.pList[bco.pNow])
            bco.pNow = bco.pEtc
            bco.msg.push("ゆけっ！　" + bco.pList[bco.pNow]._name + "！")
            bco.pNext = 0
            bco.pEtc = null
            bco.pSelect = 4
        }
        if(bco.eSelect === 6){
            this.resetRank(bco.epList[bco.eNow])
            bco.eNow = bco.eEtc
            bco.msg.push("あいては　" + bco.epList[bco.eNow]._name + "　をくりだした！")
            bco.eNext = 0
            bco.eEtc = null
            bco.eSelect = 4
        }
        return bco
    }

    useTool(bco){
        console.log("usetool")
        return bco
    }

    sef(p){
        let r = 1;
        if(p._ailment[0] === 'まひ'){
            r = 1/2;
        }
        return r;
    }

    rank(value = 0){
        if(value >= 0){
            return (value + 2) / 2;
        }else{
            return 2 / (-value + 2);
        }
    }

    resetRank(value){
        value._ailment[1]=false;
        value._ailment[2]=false;
        value._ailment[4][1]=0;
        if(value._ailment[0] === 'もうどく'){
            value._ailment[4][0]=0;
        }
        value._aRank=value._bRank=value._cRank=value._dRank=value._sRank=value._accuracy=value._evasion=value._criticalRate=0;
    }

    canMove(p, secondly){
        let msg = [];
        let result = true;
        if(p._nowHp === 0){
            result = false;
        }else{
            switch(p._ailment[0]){
                case 'こおり':
                    if(Math.random() < 1/5){
                        p._ailment[0] = '';
                        msg.push(p._name + "の　こおりが　とけた！")
                    }else{
                        result = false;
                        msg.push(p._name + "は　こおってしまって　うごけない")
                    }
                    break;
                case 'ねむり':
                    p._ailment[4][0] -= 1;
                    if(p._ailment[4][0] > 0){
                        result = false;
                        msg.push(p._name + "は　ぐうぐう　ねむっている")
                    }else{
                        p._ailment[0] = '';
                        msg.push(p._name + "は　めをさました！")
                    }
                    break;
            }
            if(p._ailment[2]){
                p._ailment[2] = false;
                if(secondly && result){
                    result = false;
                    msg.push(p._name + "は　ひるんで　わざが　だせない")
                }
            }
            if(p._ailment[5]){
                if(result){
                    result = false;
                    msg.push(p._name + "は　こうげきのはんどうで　うごけない！")
                }
                p._ailment[5] = false;
            }
            if(p._ailment[1] && result){
                p._ailment[4][1] -= 1;
                if(p._ailment[4][1] > 0){
                    if(Math.random() < 1/3){
                        result = false;
                        let a = p._a * this.rank(p._aRank);
                        let b = p._b * this.rank(p._bRank);
                        let damage = Math.floor(Math.floor(Math.floor(p._level * 2 / 5 + 2) * 40 * a / b) / 50 + 2);
                        if(damage < 1){
                            damage = 1;
                        }
                        if(damage >= p._nowHp){
                            damage = p._nowHp;
                        }
                        p._nowHp -= damage;
                        msg.push(p._name + "は　わけもわからず　じぶんをこうげきした！")
                    }
                }else{
                    p._ailment[1] = false;
                    msg.push(p._name + "の　こんらんが　とけた！")
                }
            }
            if(p._ailment[0] == 'まひ' && result){
                if(Math.random() < 1/4){
                    result = false;
                    msg.push(p._name + "は　からだが　しびれて　うごけない")
                }
            }
        }
        p._ailment[2] = false;
        p._ailment[5] = false;
        return [result,msg];
    }

    addDamage(bco){
        let ps = [bco.pList[bco.pNow], bco.epList[bco.eNow]]
        let msg = []
        ps.forEach(p =>{
            if(p._ailment[0] == 'やけど'){
                let damage = Math.floor(p._hp / 16);
                if(damage < 1){
                    damage = 1;
                }
                if(damage >= p._nowHp){
                    damage = p._nowHp;
                }
                p._nowHp -= damage;
                msg.push(p._name + "は　やけどの　ダメージを　うけている！");
            }
            if(p._ailment[0] == 'どく'){
                let damage = Math.floor(p._hp / 8);
                if(damage < 1){
                    damage = 1;
                }
                if(damage >= p._nowHp){
                    damage = p._nowHp;
                }
                p._nowHp -= damage;
                msg.push(p._name + "は　どくの　ダメージを　うけている！");
            }
            if(p._ailment[0] == 'もうどく'){
                if(p._ailment[4][0] < 15){
                    p._ailment[4][0] += 1;
                }
                let damage = Math.floor(p._hp / 16 * p._ailment[4][0]);
                if(damage < 1){
                    damage = 1;
                }
                if(damage >= p._nowHp){
                    damage = p._nowHp;
                }
                p._nowHp -= damage;
                msg.push(p._name + "は　どくの　ダメージを　うけている！");
            }
        })
        bco.msg = bco.msg.concat(msg);
        return bco;
    }

}