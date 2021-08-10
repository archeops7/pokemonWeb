export class moveBases{
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
    constructor(no, name, type, pp, additional, addProb, priority){
        this._no = no;
        this._name = name;
        this._type = type;
        this._pp = pp;
        this._additional = additional;
        this._addProb = addProb;
        this._priority = priority;
    }

    move(self){
        let msg = [];
        msg.push(self._name + "　の　" + this._name + "！");
        msg.concat(this.originMove(self));
        return msg;
    }

    originMove(){
        let msg = [];
        return msg;
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