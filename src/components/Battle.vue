<template>
    <v-container>
        <v-row>
            <v-card width=80% class="ma-auto">
                <v-row>
                    <v-col cols="3" md="3"></v-col>
                    <v-col cols="3" md="4"></v-col>
                    <v-col cols="5" md="5" align="left">
                        {{ename}}：Lv.{{elv}} <v-chip x-small elevation="0" rounded :color="ead[1]" class="ml-1">{{ead[0]}}</v-chip>
                        <br>
                        <meter id="ehp" :value="ehp" min="0" low="20" high="50" optimum="100" max="100">{{ehp}}%</meter>
                    </v-col>
                </v-row>
                <v-row></v-row>
                <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="5" align="left">
                        {{pname}}：Lv.{{plv}} <v-chip x-small elevation="0" rounded :color="pad[1]" class="ml-1">{{pad[0]}}</v-chip>
                        <br>
                        <meter id="php" :value="php" min="0" low="20" high="50" optimum="100" max="100">{{php}}%</meter>
                        <br>
                        <div align=center>
                        {{pNowHp}} / {{pMaxHp}}
                        </div>
                   </v-col>
                    <v-col cols="2"></v-col>
                    <v-col cols="4"></v-col>
                </v-row>
            </v-card>
        </v-row>
        <br>
        <br>
        <v-row>
            <v-card  width=80% class="ma-auto">
                <v-slide-group
                v-model="model"
                class="pa-4"
                center-active
                show-arrows
                >
                <v-slide-item
                    v-for="(p, i) in pp"
                    :key="i"
                    v-slot="{ active, toggle }"
                >
                    <v-card
                    :color="cColor[i]"
                    class="ma-4 pa-4"
                    elevation="3"
                    min-height="150"
                    width="200"
                    :disabled="canSelectP[i]"
                    @click="setAltP(i); toggle; active = activate(i)"
                    >
                    <v-row
                        class="fill-height"
                        align="end"
                        justify="start"
                    >
                    <v-scale-transition>
                        <v-card-text>
                    {{p._name}} : {{p._nowHp}} / {{p._hp}}
                    <br>
                    --------------------------------------
                    <br>{{p._moves[0]._name}} : {{p._moves[0]._pp}}
                    <br>{{p._moves[1]._name}} : {{p._moves[1]._pp}}
                    <br>{{p._moves[2]._name}} : {{p._moves[2]._pp}}
                    <br>{{p._moves[3]._name}} : {{p._moves[3]._pp}}
                    </v-card-text>
                    </v-scale-transition>
                    </v-row>
                    </v-card>
                </v-slide-item>
                </v-slide-group>
            </v-card>
        </v-row>

        <br>
        <br>
        <v-row>
            <v-card width=80% class="ma-auto">
                <v-btn
                v-for="(move, i) in moves"
                :key="i"
                class="ma-2"
                :disabled="dismove || canSelectM[i]"
                @click="onSelect(i)"
                >
                    {{move}}
                </v-btn>
                <v-btn
                class="ma-2"
                :disabled="dischange"
                @click="onSelect(6)"
                >
                    選んだポケモンを出す
                </v-btn>
                <v-btn
                class="ma-2"
                :disabled="distool"
                >
                    どうぐ
                </v-btn>
            </v-card>
        </v-row>
        <br>
        <br>
        <v-row>
            <v-card class="ma-auto">
                    <div id="msgwin"></div>
            </v-card>
        </v-row>
        <br>
        <br>
        <v-row>
            <v-btn
            class="ma-auto"
            @click="bcMake()"
            :disabled="disStart"
            >
                バトルを はじめる
            </v-btn>
        </v-row>
        <br>
        <br>
        <v-row>
            <v-btn
            class="ma-auto"
            to="/"
            >
                ホームに戻る
            </v-btn>
        </v-row>
    </v-container>
</template>

<script>
import battleControl from '../battleControl'

export default ({
    name: 'battle',
    data() {
        return{
            pp:[],
            ep:[],
            pname:'',
            ename:'',
            moves:[],
            bco:{},
            msg:[],
            msgBuff:'',
            dismove:true,
            disp:[],//notaliveを選択できない
            dise:[],
            dischange:true,//交代できない
            distool:true,//道具使えない
            disStart:false,
            model:null,
            altP:null,
            height:window.innerHeight * 0.3,
            bc: null,
            php: 0,
            pNowHp: 0,
            pMaxHp: 0,
            ehp: 0,
            plv: null,
            elv: null,
            pad: ['','white'],
            ead: ['','white'],
            cColor:['indigo lighten-5','indigo lighten-5','indigo lighten-5','indigo lighten-5'],
            canSelectP:[false,false,false,false,false,false,],
            canSelectM:[false,false,false,false,],
        }
    },
    methods:{
        bcMake(){
            this.$store.dispatch('setPFromJ');
            this.$store.dispatch('setEFromJ');
            this.pp = this.$store.getters.getPParty.slice()
            this.ep = this.$store.getters.getEParty.slice()
            this.bc = new battleControl()
            console.log(this.bc)
            this.bco = this.bc.makeBattle(this.pp, this.ep)
            console.log(this.bco)
            this.addmsg();
            this.disStart = true;
            this.setDisp();
            this.pp = this.bco.pList;
            this.ep = this.bco.eList;
            this.canSelectP = [false,false,false,false,false,false,];
            this.canSelectM = [false,false,false,false,]
        },
        bcDo(){
            this.bco = this.bc.mainBC(this.bco);
            this.pNowHp = this.bco.pList[this.bco.pNow]._nowHp
            this.pMaxHp = this.bco.pList[this.bco.pNow]._hp
            this.php = this.bco.pList[this.bco.pNow]._nowHp / this.bco.pList[this.bco.pNow]._hp * 100;
            this.ehp = this.bco.epList[this.bco.eNow]._nowHp / this.bco.epList[this.bco.eNow]._hp * 100;
            if(this.bco.pList[this.bco.pNow]._nowHp == 0){
                this.canSelectP[this.bco.pNow] = true
            }
            this.setCSM();
            this.setAdd();
            this.bcswitch();
        },
        bcswitch(){
            this.setDisp();
            this.dischange = true;
            this.altP = null;
            if(this.bco.eNext === 4 || this.bco.pNext === 4){//0-何でも 1-交代のみ 2-わざのみ 4-バトル終了
                this.dismove = true;
                this.disStart = false;
            }else if(this.bco.pNext === 1 && this.bco.eNext === 1){
                this.dismove = true;
                this.bco.msg.push("こうたいするポケモンを　えらんでください")
            }else if(this.bco.eNext === 1){
                this.bco.eSelect = 6
                this.bco.eEtc = this.bco.eNow + 1
                this.bc.change(this.bco);
                this.ename = this.bco.epList[this.bco.eNow]._name;
                this.ehp = this.bco.epList[this.bco.eNow]._nowHp / this.bco.epList[this.bco.eNow]._hp * 100;
                this.setAdd()
                this.bcswitch();
            }else if(this.bco.pNext === 2){
                this.dismove = false;
                for(let i = 0; i < this.disp.length; i++){
                    this.disp[i] = true;
                }
                this.bco.msg.push(this.bco.pList[this.bco.pNow]._name + "は　どうする？")
            }else if(this.bco.pNext === 1){
                this.dismove = true;
                this.bco.msg.push("こうたいするポケモンを　えらんでください")
            }else if(this.bco.pNext === 0){
                this.dismove = false;
                if(this.bco.pList[this.bco.pNow]._ailment[5]){
                    this.bco.pList[this.bco.pNow]._ailment[5] = false;
                    this.bco.msg.push(this.bco.pList[this.bco.pNow]._name + "は　こうげきの　はんどうで　うごけない")
                    this.onSelect(5);
                }else{
                    this.bco.msg.push(this.bco.pList[this.bco.pNow]._name + "は　どうする？")
                }
            }
            this.addmsg();
        },
        onSelect(value){
            this.dischange = true;
            this.bco.pSelect = value;
            if(this.bco.pNext == 1){
                this.bco.pEtc = this.altP;
                this.pname = this.bco.pList[this.altP]._name;
                this.moves = []
                this.bco.pList[this.altP]._moves.forEach((m,i) =>{
                    this.moves.push(m._name)
                    if(m._pp == 0){
                        this.canSelectM[i] = true
                    }
                })
                this.bc.change(this.bco);
                this.bcswitch();
                console.log(this.bco.pList[this.bco.pNow]._nowHp +":" + this.bco.pList[this.bco.pNow]._hp)
                this.pNowHp = this.bco.pList[this.bco.pNow]._nowHp
                this.pMaxHp = this.bco.pList[this.bco.pNow]._hp
                this.php = this.bco.pList[this.bco.pNow]._nowHp / this.bco.pList[this.bco.pNow]._hp * 100;
                this.ehp = this.bco.epList[this.bco.eNow]._nowHp / this.bco.epList[this.bco.eNow]._hp * 100;
                this.plv = this.bco.pList[this.bco.pNow]._level
                this.elv = this.bco.epList[this.bco.eNow]._level
                this.ename = this.bco.epList[this.bco.eNow]._name;
                this.setCSP(this.bco.pNow);
                this.setAdd()
            }else{
                if(value == 6){
                    this.bco.pEtc = this.altP;
                    this.pname = this.bco.pList[this.altP]._name;
                    this.setCSP(this.altP);
                    this.moves = []
                    this.bco.pList[this.altP]._moves.forEach((m,i) =>{
                        this.moves.push(m._name)
                        if(m._pp == 0){
                            this.canSelectM[i] = true
                        }
                    })
                }
                if(this.bco.eNext == 0){
                    this.bco.eSelect = Math.floor( Math.random() * 4)
                }
                this.bcDo()
            }
        },
        setAltP(val){
            this.altP = val;
        },
        addmsg(){
            this.bco.msg.forEach(m =>{
                if(this.msgBuff == ''){
                    this.msgBuff += m + '\n';
                    this.messageChar();
                }else{
                    this.msgBuff += m + '\n';
                }
            })
            this.msg.concat(this.bco.msg)
            this.bco.msg = []
        },
        setDisp(){
            this.disp = []
            this.bco.pAlive.forEach(b =>{
                this.disp.push(!b)
            })
        },
        setCSM(){
            this.bco.pList[this.bco.pNow]._moves.forEach((m,i) =>{
                if(m._pp == 0){
                    this.canSelectM[i] = true
                }
            })
        },
        setCSP(e){
            this.bco.pList.forEach((p,i) =>{
                if(p._nowHp == 0){
                    this.canSelectP[i] = true
                }else{
                    this.canSelectP[i] = false
                }
            })
            this.canSelectP[e] = true
        },
        setAdd(){
            let adds = [this.pad, this.ead];
            let adbase = [this.bco.pList[this.bco.pNow]._ailment[0], this.bco.epList[this.bco.eNow]._ailment[0]];
            adbase.forEach((ab,i) =>{
                switch(ab){
                    case 'やけど':
                        adds[i] = [ab, 'red darken-1'];
                        break;
                    case 'こおり':
                        adds[i] = [ab, 'blue lighten-4'];
                        break;
                    case 'まひ':
                        adds[i] = [ab, 'yellow darken-1'];
                        break;
                    case 'どく':
                        adds[i] = [ab, 'purple accent-2'];
                        break;
                    case 'もうどく':
                        adds[i] = [ab, 'purple darken-1'];
                        break;
                    case 'ねむり':
                        adds[i] = [ab, 'blue-grey lighten-1'];
                        break;
                    default:
                        adds[i] = ['', 'white'];
                }
                this.pad = adds[0]
                this.ead = adds[1]
            })
        },
        scrollToEnd(){
            let cont = this.$el.querySelector("#container");
            cont.scrollTop = cont.scrollHeight;
        },
        messageChar(){
            if (this.msgBuff == '') {
                //メッセージバッファに文字がなければ何もしない
                return;
            }
            //メッセージバッファの先頭1文字を取得
            let c = this.msgBuff.slice(0, 1)
            if (c == "\n") {
                c = '<br>';//改行の場合はタグへ変換
                let obj = document.getElementById('msgwin');
                obj.scrollTop = obj.scrollHeight;
            }
            document.getElementById('msgwin').innerHTML += c;
            //メッセージバッファから先頭1文字を削除
            this.msgBuff = this.msgBuff.slice(1);
            //
            setTimeout(this.messageChar, 100);
        },
        sleep(waitSec, callbackFunc) {
            var spanedSec = 0;
            var id = setInterval(function () {
                spanedSec++;
                if (spanedSec >= waitSec) {
                    clearInterval(id);
                    if (callbackFunc) callbackFunc();
                }
            }, 1000);
        },
        activate(e){
            if(this.cColor[e] === 'indigo lighten-5'){
                this.cColor = ['indigo lighten-5','indigo lighten-5','indigo lighten-5','indigo lighten-5']
                this.cColor[e] = 'cyan lighten-3'
            }else{
                this.cColor[e] = 'indigo lighten-5'
            }
        },
    },
    watch:{
        altP(){
            if(this.altP >= 0 && this.altP <= 5){
                this.dischange = false;
            }else{
                this.dischange = true;
            }
            if(this.altP == null){
                this.cColor = ['indigo lighten-5','indigo lighten-5','indigo lighten-5','indigo lighten-5']
                this.dischange = true;
            }
        }
    }
})
</script>

<style scoped>
.item-list {
  overflow-y: auto;
}
.v-enter-active, .v-leave-active{
    transition: 0.5s;
}
.v-enter, .v-leave-to{
    opacity: 0;
    transform: translateX(50px);
}
#msgwin {
	width:550px;
    margin: 10px;
	padding:1.6em;
	height: 2.4em;
    text-align: left;
	overflow:hidden;
}
meter{
    min-width: 10em;
    min-height: 2em;
}
</style>
