export default class PokemonBase{
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
    _moves;
    get moves() {
        return this._moves;
    }
    set moves(value) {
        this._moves = value;
    }
    _level;
    get level() {
        return this._level;
    }
    set level(value) {
        this._level = value;
    }
    _nowHp;
    get nowHp() {
        return this._nowHp;
    }
    set nowHp(value) {
        this._nowHp = value;
    }
    _hp;
    get hp() {
        return this._hp;
    }
    set hp(value) {
        this._hp = value;
    }
    _a;
    get a() {
        return this._a;
    }
    set a(value) {
        this._a = value;
    }
    _b;
    get b() {
        return this._b;
    }
    set b(value) {
        this._b = value;
    }
    _c;
    get c() {
        return this._c;
    }
    set c(value) {
        this._c = value;
    }
    _d;
    get d() {
        return this._d;
    }
    set d(value) {
        this._d = value;
    }
    _s;
    get s() {
        return this._s;
    }
    set s(value) {
        this._s = value;
    }
    _baseHp;
    get baseHp() {
        return this._baseHp;
    }
    set baseHp(value) {
        this._baseHp = value;
    }
    _baseA;
    get baseA() {
        return this._baseA;
    }
    set baseA(value) {
        this._baseA = value;
    }
    _baseB;
    get baseB() {
        return this._baseB;
    }
    set baseB(value) {
        this._baseB = value;
    }
    _baseC;
    get baseC() {
        return this._baseC;
    }
    set baseC(value) {
        this._baseC = value;
    }
    _baseD;
    get baseD() {
        return this._baseD;
    }
    set baseD(value) {
        this._baseD = value;
    }
    _baseS;
    get baseS() {
        return this._baseS;
    }
    set baseS(value) {
        this._baseS = value;
    }
    _evHp;
    get evHp() {
        return this._evHp;
    }
    set evHp(value) {
        this._evHp = value;
    }
    _evA;
    get evA() {
        return this._evA;
    }
    set evA(value) {
        this._evA = value;
    }
    _evB;
    get evB() {
        return this._evB;
    }
    set evB(value) {
        this._evB = value;
    }
    _evC;
    get evC() {
        return this._evC;
    }
    set evC(value) {
        this._evC = value;
    }
    _evD;
    get evD() {
        return this._evD;
    }
    set evD(value) {
        this._evD = value;
    }
    _evS;
    get evS() {
        return this._evS;
    }
    set evS(value) {
        this._evS = value;
    }
    _aRank;
    get aRank() {
        return this._aRank;
    }
    set aRank(value) {
        this._aRank = value;
    }
    _bRank;
    get bRank() {
        return this._bRank;
    }
    set bRank(value) {
        this._bRank = value;
    }
    _cRank;
    get cRank() {
        return this._cRank;
    }
    set cRank(value) {
        this._cRank = value;
    }
    _dRank;
    get dRank() {
        return this._dRank;
    }
    set dRank(value) {
        this._dRank = value;
    }
    _sRank;
    get sRank() {
        return this._sRank;
    }
    set sRank(value) {
        this._sRank = value;
    }
    _accuracy;
    get accuracy() {
        return this._accuracy;
    }
    set accuracy(value) {
        this._accuracy = value;
    }
    _evasion;
    get evasion() {
        return this._evasion;
    }
    set evasion(value) {
        this._evasion = value;
    }
    _criticalRate;
    get criticalRate() {
        return this._criticalRate;
    }
    set criticalRate(value) {
        this._criticalRate = value;
    }
    _ailment;
    get ailment() {
        return this._ailment;
    }
    set ailment(value) {
        this._ailment = value;
    }
    constructor(no, name, level, nature, type ,bases, efbases, moves, IVs){
        this._no = Number(no);
        this._name = name;
        this._level = Number(level);
        this._type = type;
        this._moves = moves;
        this.setValue(nature, bases, efbases, IVs);
        this._nowHp = this._hp;
        this._ailment = ['', false, false, [''], [0,0,0], false];//状態 引数:0.状態異常 1.こんらん 2.ひるみ 3.バインド(複数) 4.経過ターン(0.状態異常 1.こんらん 2以降バインド) 5.反動行動不能
        this._aRank=this._bRank=this._cRank=this._dRank=this._sRank=this._accuracy=this._evasion=this._criticalRate=0;
    }

    doMove(select, target){
        return this.move[select].move(this, target);
    }

    setValue(nature, bases, efbases, IVs){
        const correction = this.switchCor(nature);
        this._hp = Math.floor((Number(bases[0]) + this.makeRandom(Number(IVs[0])) / 2 + Number(efbases[0]) / 8) + 60);
        this._a = Math.floor(((Number(bases[1]) + this.makeRandom(Number(IVs[1])) / 2 + Number(efbases[1]) / 8) + 5) * correction[0]);
        this._b = Math.floor(((Number(bases[2]) + this.makeRandom(Number(IVs[2])) / 2 + Number(efbases[2]) / 8) + 5) * correction[1]);
        this._c = Math.floor(((Number(bases[3]) + this.makeRandom(Number(IVs[3])) / 2 + Number(efbases[3]) / 8) + 5) * correction[2]);
        this._d = Math.floor(((Number(bases[4]) + this.makeRandom(Number(IVs[4])) / 2 + Number(efbases[4]) / 8) + 5) * correction[3]);
        this._s = Math.floor(((Number(bases[5]) + this.makeRandom(Number(IVs[5])) / 2 + Number(efbases[5]) / 8) + 5) * correction[4]);
    }
    makeRandom(num){
        if(num){
            return num;
        }else{
        return Math.floor(Math.random() * 32);
        }
    }
    switchCor(nature){
        switch (nature){
            case "adamant":
                return [1.1,1,0.9,1,1];
            case "bashful":
                return [1,1,1,1,1];
            case "bold":
                return [0.9,1.1,1,1,1];
            case "brave":
                return [1.1,1,1,1,0.9];
            case "calm":
                return [0.9,1,1,1.1,1];
            case "careful":
                return [1,1,0.9,1.1,1];
            case "docile":
                return [1,1,1,1,1];
            case "gentle":
                return [1,0.9,1,1.1,1];
            case "hardly":
                return [1,1,1,1,1];
            case "hasty":
                return [1,0.9,1,1,1.1];
            case "impish":
                return [1,1.1,0.9,1,1];
            case "jolly":
                return [1,1,0.9,1,1.1];
            case "lax":
                return [1,1.1,1,0.9,1];
            case "lonely":
                return [1.1,0.9,1,1,1];
            case "mild":
                return [1,0.9,1.1,1,1];
            case "modest":
                return [0.9,1,1.1,1,1];
            case "naive":
                return [1,1,1,0.9,1.1];
            case "naughty":
                return [1.1,1,1,0.9,1];
            case "quiet":
                return [1,1,1.1,1,0.9];
            case "quirky":
                return [1,1,1,1,1];
            case "rash":
                return [1,1,1.1,0.9,1];
            case "relaxed":
                return [1,1.1,1,1,0.9];
            case "sassy":
                return [1,1,1,1.1,0.9];
            case "serious":
                return [1,1,1,1,1];
            case "timid":
                return [0.9,1,1,1,1.1];
            default:
                return [1,1,1,1,1];
        }
    }
}