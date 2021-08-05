import { oppoMove } from "./oppoMove";

export class attackMove extends oppoMove{
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
    constructor(no, name, type, pp, accuracy = 100, power, moveType, contact = true,  additional = 0, addProb = 0, priority = 0, critical = 0){
        super(no, name, type, pp, accuracy, additional, addProb, priority);
        this._power = power;
        this._moveType = moveType;
        this._contact = contact;
        this._critical = critical;
    }

    opponentMove(self, target, effect){
        let msg = [];
        let a = self._a * this.rank(self._aRank);
        let b = target._b * this.rank(target._bRank);

        if(this._moveType === "Special"){
            a = self._c * this.rank(self._cRank);
            b = target._d * this.rank(target._dRank);
        }

        let cri = critical();
        if(cri === 1.5){
            msg.push("きゅうしょに　あたった！");
        }

        let damage = Math.floor(Math.floor(Math.floor(Math.floor(self._level * 2 / 5 + 2) * this._power * a / b) / 50 + 2) * randomD() * cri * effect);

        if(damage < 1){
            damage = 1;
        }
        if(damage > target._nowHp){
            damage = target._nowHp;
        }
        target._nowHp -= damage;

        return msg;
    }

    critical(self){
        let cri = 1;
        if(this._critical + self.criticalRate >= 3){
            if(Math.floor(Math.random() * 101) < (1/ 1)){
                cri = 1.5;
            }
        }else if(this._critical + self.criticalRate === 2){
            if(Math.floor(Math.random() * 101) < (1/ 2)){
                cri = 1.5;
            }
        }else if(this._critical + self.criticalRate === 1){
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