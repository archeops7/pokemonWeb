import oppoMove from "./oppoMove";

export default class attackMove extends oppoMove{
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
        super(no, name, type, pp, accuracy, additional, addProb, priority);
        this._power = power;
        this._moveType = moveType;
        this._contact = contact;
        this._critical = critical;
        return {
            no:this._no,
            name:this._name,
            type:this._type,
            pp:this._pp,
            power:this._power,
            moveType:this._moveType,
            accuracy:this._accuracy,
            contact:this._contact,
            additional:this._additional,
            addProb:this._addProb,
            priority:this._priority,
            critical:this._critical,
            move:this.move,
            moving:this.moving,
            opponentMove:this.opponentMove,
            calcCritical:this.calcCritical,
            rank:this.rank,
            randomD:this.randomD,
            accurate:this.accurate,
            typeEf:this.typeEf
        }
    }

    moving(player, target){
        console.log("movingstart")
        let msg = [];
        msg.push(player._name + "　の　" + this.name() + "！");
        console.log(Math.floor(Math.random() * 101) <= this.accurate(player._accuracy, target._evasion))
        if(Math.floor(Math.random() * 101) <= this.accurate(player._accuracy, target._evasion)){
            const [effect, typeMsg] = this.typeEf(player._type, target._type);
            msg.concat(typeMsg);
            console.log("ef:" + effect + "typemsg:" + typeMsg)
            if(effect){
                msg = msg.concat(this.opponentMove(player, target, effect));
            }
        }else{
            msg.push(target._name + "　には　あたらなかった！");
        }
        console.log("msg:" + msg)
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
        console.log(this._power)
        let damage = Math.floor(Math.floor(Math.floor(Math.floor(player._level * 2 / 5 + 2) * this._power * a / b) / 50 + 2) * this.randomD() * cri * effect);
        console.log(damage)
        if(damage < 1){
            damage = 1;
        }
        if(damage > target._nowHp){
            damage = target._nowHp;
        }
        target._nowHp -= damage;

        return msg;
    }

    calcCritical(player){
        console.log("calccristart")
        let cri = 1;
        if(this._critical + player.criticalRate >= 3){
            if(Math.floor(Math.random() * 101) < (1/ 1)){
                cri = 1.5;
            }
        }else if(this._critical + player.criticalRate === 2){
            if(Math.floor(Math.random() * 101) < (1/ 2)){
                cri = 1.5;
            }
        }else if(this._critical + player.criticalRate === 1){
            if(Math.floor(Math.random() * 101) < (1/ 8)){
                cri = 1.5;
            }
        }else{
            if(Math.floor(Math.random() * 101) < (1/ 24)){
                cri = 1.5;
            }
        }
        return cri;
    }

    rank(value){
        if(value >= 0){
            return (value + 2) / 2;
        }else{
            return 2 / (value + 2);
        }
    }

    randomD(){
        return Math.random() * (1 - 0.85) + 0.85;
    }
}