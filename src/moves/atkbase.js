export default class atkbase{
    _no;
    get no() {
        return this._no;
    }
    set no(value) {
        this._no = value;
    }
    _name;
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    _type;
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    _pp;
    get pp() {
        return this._pp;
    }
    set pp(value) {
        this._pp = value;
    }
    _additional;
    get additional() {
        return this._additional;
    }
    set additional(value) {
        this._additional = value;
    }
    _addProb;
    get addProb() {
        return this._addProb;
    }
    set addProb(value) {
        this._addProb = value;
    }
    _priority;
    get priority() {
        return this._priority;
    }
    set priority(value) {
        this._priority = value;
    }
    _accuracy;
    get accuracy() {
        return this._accuracy;
    }
    set accuracy(value) {
        this._accuracy = value;
    }
    _power;
    get power() {
        return this._power;
    }
    set power(value) {
        this._power = value;
    }
    _moveType;
    get moveType() {
        return this._moveType;
    }
    set moveType(value) {
        this._moveType = value;
    }
    _contact;
    get contact() {
        return this._contact;
    }
    set contact(value) {
        this._contact = value;
    }
    _critical;
    get critical() {
        return this._critical;
    }
    set critical(value) {
        this._critical = value;
    }
    constructor(no, name, type, pp, power, moveType, accuracy = 100, contact = true, additional = 0, addProb = 0, priority = 0, critical = 0){
        this._no = no;
        this._name = name;
        this._type = type;
        this._pp = pp;
        this._additional = additional;
        this._addProb = addProb;
        this._priority = priority;
        this._accuracy = accuracy;
        this._power = power;
        this._moveType = moveType;
        this._contact = contact;
        this._critical = critical;
    }

    moving(player, target){
        console.log("movingstart")
        let msg = [];
        msg.push(player._name + "　の　" + this._name + "！");
        if(target._nowHp === 0){
            msg.push("しかし　うまくきまらなかった")
        }else{
            if(Math.floor(Math.random() * 101) <= this.accurate(player._accuracy, target._evasion)){
                const [effect, typeMsg] = this.typeEf(player._type, target._type);
                msg = msg.concat(typeMsg);
                if(effect){
                    msg = msg.concat(this.opponentMove(player, target, effect));
                }
            }else{
                msg.push(target._name + "　には　あたらなかった！");
            }
        }
        return msg;
    }

    opponentMove(player, target, effect){
        console.log("opponentmovestart")
        let msg = [];
        let a = player._a * this.rank(player._aRank);
        let b = target._b * this.rank(target._bRank);

        if(this._moveType === "Special"){
            a = player._c * this.rank(player._cRank);
            b = target._d * this.rank(target._dRank);
        }

        let cri = this.calcCritical(player);
        if(cri === 1.5){
            msg.push("きゅうしょに　あたった！");
        }
        let damage = Math.floor(Math.floor(Math.floor(Math.floor(player._level * 2 / 5 + 2) * this._power * a / b) / 50 + 2) * this.randomD() * cri * effect);
        if(player._ailment[0] === 'やけど' && this._moveType === "Physics"){
            damage = Math.floor(damage * 0.5);
        }
        if(damage < 1){
            damage = 1;
        }
        if(damage >= target._nowHp){
            damage = target._nowHp;
        }else{
            if((this._additional > 0 && this.additional < 9) || (this._additional > 10 && this.additional <16) || this._additional == 22){
                msg = msg.concat(this.addCheck(player, target))
            }
        }
        if(this._additional === 10){
            msg.push(this.selfDamage(player, damage))
        }
        if((this._additional > 15 && this.additional < 22) || this._additional == 9){
            msg = msg.concat(this.addCheck(player, target))
        }
        if(this._additional == 9){
            msg = msg.concat(this.addCheck(player, target))
        }
        target._nowHp -= damage;
        return msg;
    }

    calcCritical(player){
        console.log("calccristart")
        let cri = 1;
        if(this._critical + player.criticalRate >= 3){
            if(Math.floor(Math.random() * 101) <= (1/ 1) * 100){
                cri = 1.5;
            }
        }else if(this._critical + player.criticalRate === 2){
            if(Math.floor(Math.random() * 101) <= (1/ 2) * 100){
                cri = 1.5;
            }
        }else if(this._critical + player.criticalRate === 1){
            if(Math.floor(Math.random() * 101) <= (1/ 8) * 100){
                cri = 1.5;
            }
        }else{
            if(Math.floor(Math.random() * 101) <= (1/ 24) * 100){
                cri = 1.5;
            }
        }
        return cri;
    }

    rank(value = 0){
        if(value >= 0){
            return (value + 2) / 2;
        }else{
            return 2 / (-value + 2);
        }
    }

    randomD(){
        return Math.random() * (1 - 0.85) + 0.85;
    }

    accurate(acu = 0, eva = 0){
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

    addCheck(player, target){
        let msg = []
        if(Math.floor(Math.random() * 101) <= this._addProb){
            switch(this._additional){
                case 1://やけど
                    if(target._ailment[0] == 'こおり'){
                        target._ailment[0] == '';
                        msg.push(target._name + "の　こおりが　とけた！")
                    }
                    if(!(target._type.includes("fire"))){
                        if(target._ailment[0] == ''){
                            target._ailment[0] = 'やけど';
                            msg.push(target._name + "は　やけどを　おった！");
                        }
                    }
                    break;
                case 2://こおり
                    if(!(target._type.includes("ice"))){
                        if(target._ailment[0] == ''){
                            target._ailment[0] = 'こおり';
                            msg.push(target._name + "は　こおりついた！");
                        }
                    }
                    break;
                case 3://まひ
                    if(!(target._type.includes("electric"))){
                        if(target._ailment[0] == ''){
                            target._ailment[0] = 'まひ';
                            msg.push(target._name + "は　まひして　わざが　でにくくなった！");
                        }
                    }
                    break;
                case 4://どく
                    if(!(target._type.includes("poison"))){
                        if(target._ailment[0] == ''){
                            target._ailment[0] = 'どく';
                            msg.push(target._name + "は　どくを　あびた！");
                        }
                    }
                    break;
                case 5://もうどく
                    if(!(target._type.includes("poison"))){
                        if(target._ailment[0] == ''){
                            target._ailment[0] = 'もうどく';
                            msg.push(target._name + "は　もうどくを　あびた！");
                        }
                    }
                    break;
                case 6://ねむり
                    if(target._ailment[0] == ''){
                        target._ailment[0] = 'ねむり'
                        target._ailment[4][0] = Math.floor(Math.random() * 3) + 2;
                        msg.push(target._name + "は　ねむってしまった！");
                    }
                    break;
                case 7://こんらん
                    if(target._ailment[1] == false){
                        target._ailment[1] = true
                        target._ailment[4][1] = Math.floor(Math.random() * 4) + 1;
                        msg.push(target._name + "は　こんらんした！");
                    }
                    break;
                case 8://ひるみ
                    target._ailment[2] = true
                    break;
                case 9://はんどう（行動不能）
                    player._ailment[5] = true
                    break;
                case 10://はんどう（ダメージ、別メソッド）
                    break;
                case 11://ランクダウン
                    target._aRank -= 1;
                    msg.push(target._name + 'の　こうげきが　さがった！');
                    break;
                case 12:
                    target._bRank -= 1;
                    msg.push(target._name + 'の　ぼうぎょが　さがった！');
                    break;
                case 13:
                    target._cRank -= 1;
                    msg.push(target._name + 'の　とくこうが　さがった！');
                    break;
                case 14:
                    target._dRank -= 1;
                    msg.push(target._name + 'の　とくぼうが　さがった！');
                    break;
                case 15:
                    target._sRank -= 1;
                    msg.push(target._name + 'の　すばやさが　さがった！');
                    break;
                case 16://ランクアップ
                    player._aRank += 1;
                    msg.push(player._name + 'の　こうげきが　あがった！');
                    break;
                case 17:
                    player._bRank += 1;
                    msg.push(player._name + 'の　ぼうぎょが　あがった！');
                    break;
                case 18:
                    player._cRank += 1;
                    msg.push(player._name + 'の　とくこうが　あがった！');
                    break;
                case 19:
                    player._dRank += 1;
                    msg.push(player._name + 'の　とくぼうが　あがった！');
                    break;
                case 20:
                    player._sRank += 1;
                    msg.push(player._name + 'の　すばやさが　あがった！');
                    break;
                case 21:
                    player._cRank -= 2;
                    msg.push(player._name + 'の　とくこうが　ガクッとさがった！');
                    break;
                case 22:
                    target._accuracy -= 1;
                    msg.push(target._name + 'の　めいちゅうが　さがった！');
            }
        }
        return msg;
    }

    selfDamage(player, d){
        let damage = Math.floor(d * this._addProb / 100)
        if(damage < 1){
            damage = 1;
        }
        if(damage >= player._nowHp){
            damage = player._nowHp;
        }
        player._nowHp -= damage;
        return player._name + 'は　はんどうによる　ダメージをうけた';
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

    /*
    additional memo
    additionalは配列、該当する効果の数値を入れる
    addProbは基本的には発動確率、一部例外あり
    1,やけど
    2,こおり
    3,まひ
    4,どく
    5,もうどく
    6,ねむり
    7,こんらん
    8,ひるみ
    9,のろい
    */


}